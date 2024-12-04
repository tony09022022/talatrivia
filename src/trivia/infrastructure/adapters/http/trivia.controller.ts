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
import { TriviaService } from 'src/trivia/domain/ports/services/trivia.service';
import { TriviaInputDTO } from '../dtos/trivia-input.dto';
import { CreateTriviaDto } from '../dtos/create-trivia-input.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from '../../../../trivia/domain/role.enum.ts';
  
@Controller('trivia')
@ApiTags('trivia')
@UseFilters(HttpErrorException)
@UseGuards(AuthGuard, RolesGuard)
export class TriviaController {
    constructor(private readonly triviaService: TriviaService) {}

    @Post('full')
    @Roles(Role.ADMINISTRATOR)
    async createTrivia(
        @Body() createTriviaDto: CreateTriviaDto,
        @Res() res: Response,
    ) {
        const createdTrivia = await this.triviaService.createTrivia(createTriviaDto);
        return res.status(HttpStatus.OK).json({
        message: 'Trivia created successfully',
        data: createdTrivia,
        });
    }

    @Post()
    @Roles(Role.ADMINISTRATOR)
    async create(
        @Body() triviaDTO: TriviaInputDTO,
        @Res() res: Response,
    ) {
        const createdTrivia = await this.triviaService.create(triviaDTO);
        return res.status(HttpStatus.OK).json({
        message: 'Trivia created successfully',
        data: createdTrivia,
        });
    }

    @Get()
    @Roles(Role.ADMINISTRATOR)
    async getAllTrivia(@Res() res: Response) {
        const trivia = await this.triviaService.getAll();
        return res.status(HttpStatus.OK).json({
        message: 'Trivia retrieved successfully',
        data: trivia,
        });
    }
    
    @Get(":id")
    @Roles(Role.ADMINISTRATOR)
    async getTriviaById(
        @Param('id', ParseIntPipe) id: number,
        @Res() res: Response,
    ) {
        const trivia = await this.triviaService.getById(id);
        return res.status(HttpStatus.OK).json({
        message: 'Trivia retrieved successfully',
        data: trivia,
        });
    }

    @Get(":triviaId/ranking")
    @Roles(Role.ADMINISTRATOR, Role.PARTICIPANT)
    async getRankingTriviaById(
        @Param('triviaId', ParseIntPipe) triviaId: number,
        @Res() res: Response,
    ) {
        const trivia = await this.triviaService.getRanking(triviaId);
        return res.status(HttpStatus.OK).json({
        message: 'Trivia ranking retrieved successfully',
        data: trivia,
        });
    }
}