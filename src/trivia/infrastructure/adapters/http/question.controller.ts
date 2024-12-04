import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    Res,
    UseFilters,
    UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { HttpErrorException } from 'src/commons/exceptions/http.exception';
import { ApiTags } from '@nestjs/swagger';
import { QuestionService } from 'src/trivia/domain/ports/services/question.service';
import { QuestionInputDTO } from '../dtos/question-input.dto';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/trivia/domain/role.enum.ts';
import { Roles } from 'src/auth/decorator/roles.decorator';
  
@Controller('question')
@ApiTags('question')
@UseFilters(HttpErrorException)
@UseGuards(AuthGuard, RolesGuard)
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {}

    @Post()
    @Roles(Role.ADMINISTRATOR)
    async createQuestion(
        @Body() questionDTO: QuestionInputDTO,
        @Res() res: Response,
    ) {
        const createdQuestion = await this.questionService.create(questionDTO);
        return res.status(HttpStatus.OK).json({
        message: 'Question created successfully',
        data: createdQuestion,
        });
    }

    @Get()
    @Roles(Role.ADMINISTRATOR)
    async getAllQuestions(@Res() res: Response) {
        const questions = await this.questionService.getAll();
        return res.status(HttpStatus.OK).json({
        message: 'Questions retrieved successfully',
        data: questions,
        });
    }
    
    @Get(":id")
    @Roles(Role.ADMINISTRATOR)
    async getQuestionById(
        @Param('id', ParseIntPipe) id: number,
        @Res() res: Response,
    ) {
        const question = await this.questionService.getById(id);
        return res.status(HttpStatus.OK).json({
        message: 'Question retrieved successfully',
        data: question,
        });
    }

    @Get("trivia/:triviaid")
    @Roles(Role.ADMINISTRATOR)
    async getQuestionsByTriviaId(
        @Param('triviaid', ParseIntPipe) triviaid: number,
        @Res() res: Response,
    ) {
        const question = await this.questionService.getQuestionsByTriviaId(triviaid);
        return res.status(HttpStatus.OK).json({
        message: 'Question retrieved successfully',
        data: question,
        });
    }

}