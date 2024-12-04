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
import { AnswerService } from 'src/trivia/domain/ports/services/answer.service';
import { AnswerInputDTO } from '../dtos/answer-input.dto';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/trivia/domain/role.enum.ts';
import { AuthGuard } from 'src/auth/auth.guard';
  
@Controller('answer')
@ApiTags('answer')
@UseFilters(HttpErrorException)
@UseGuards(AuthGuard, RolesGuard)
export class AnswerController {
    constructor(private readonly answerService: AnswerService) {}

    @Post()
    @Roles(Role.ADMINISTRATOR, Role.PARTICIPANT)
    async create(
        @Body() answerDTO: AnswerInputDTO,
        @Res() res: Response,
    ) {
        const result = await this.answerService.create(answerDTO);
        return res.status(HttpStatus.OK).json({
        message: 'Answer created successfully',
        data: result,
        });
    }

    @Get()
    @Roles(Role.ADMINISTRATOR)
    async getAll(@Res() res: Response) {
        const result = await this.answerService.getAll();
        return res.status(HttpStatus.OK).json({
        message: 'Answer retrieved successfully',
        data: result,
        });
    }
    
    @Get("user/:userid")
    @Roles(Role.ADMINISTRATOR, Role.PARTICIPANT)
    async getByUserId(
        @Param('userid', ParseIntPipe) userid: number,
        @Res() res: Response,
    ) {
        const result = await this.answerService.getByUserId(userid);
        return res.status(HttpStatus.OK).json({
        message: 'Answer retrieved successfully',
        data: result,
        });
    }
}