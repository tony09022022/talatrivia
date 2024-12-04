import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Res,
    UseFilters,
    UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { HttpErrorException } from 'src/commons/exceptions/http.exception';
import { ApiTags } from '@nestjs/swagger';
import { TriviaParticipantsService } from 'src/trivia/domain/ports/services/trivia-participants.service';
import { TriviaParticipantsInputDTO } from '../dtos/trivia-participants-input.dto';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/trivia/domain/role.enum.ts';
import { Roles } from 'src/auth/decorator/roles.decorator';
  
@Controller('trivia-participants')
@ApiTags('trivia-participants')
@UseFilters(HttpErrorException)
@UseGuards(AuthGuard, RolesGuard)
export class TriviaParticipantsController {
    constructor(private readonly triviaParticipantsService: TriviaParticipantsService) {}

    @Post()
    @Roles(Role.ADMINISTRATOR)
    async createTriviaParticipants(
        @Body() triviaParticipantsDTO: TriviaParticipantsInputDTO,
        @Res() res: Response,
    ) {
        const createdTrivia = await this.triviaParticipantsService.create(triviaParticipantsDTO);
        return res.status(HttpStatus.OK).json({
        message: 'Trivia Participants created successfully',
        data: createdTrivia,
        });
    }

    @Get()
    @Roles(Role.ADMINISTRATOR)
    async getAllTrivia(@Res() res: Response) {
        const results = await this.triviaParticipantsService.getAll();
        return res.status(HttpStatus.OK).json({
        message: 'Trivia Participants retrieved successfully',
        data: results,
        });
    }
    
    @Get("user/:userid")
    @Roles(Role.ADMINISTRATOR)
    async getParticipantsByUserId(
        @Param('userid', ParseIntPipe) userid: number,
        @Res() res: Response,
    ) {
        const result = await this.triviaParticipantsService.getParticipantsByUserId(userid);
        return res.status(HttpStatus.OK).json({
        message: 'Trivia Participant by User retrieved successfully',
        data: result,
        });
    }
}