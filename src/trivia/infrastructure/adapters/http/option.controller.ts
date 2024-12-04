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
import { OptionInputDTO } from '../dtos/option-input.dto';
import { OptionService } from 'src/trivia/domain/ports/services/option.service';
import { OptionDTO } from '../dtos/option.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/trivia/domain/role.enum.ts';
  
@Controller('option')
@ApiTags('option')
@UseFilters(HttpErrorException)
@UseGuards(AuthGuard, RolesGuard)
export class OptionController {
    constructor(private readonly optionService: OptionService) {}

    @Get()
    @Roles(Role.ADMINISTRATOR)
    async getAllQuestions(@Res() res: Response) {
        const questions = await this.optionService.getAll();
        return res.status(HttpStatus.OK).json({
        message: 'Option retrieved successfully',
        data: questions,
        });
    }
    
    @Get(":id")
    @Roles(Role.ADMINISTRATOR)
    async getQuestionById(
        @Param('id', ParseIntPipe) id: number,
        @Res() res: Response,
    ) {
        const question = await this.optionService.getById(id);
        return res.status(HttpStatus.OK).json({
        message: 'Option retrieved successfully',
        data: question,
        });
    }

    @Post()
    @Roles(Role.ADMINISTRATOR)
    async create(
        @Body() createDTO: OptionInputDTO,
        @Res() res: Response,
    ) {
        const created = await this.optionService.create(createDTO);
        return res.status(HttpStatus.OK).json({
        message: 'Option created successfully',
        data: created,
        });
    }
}