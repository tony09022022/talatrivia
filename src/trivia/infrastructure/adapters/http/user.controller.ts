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
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from '../../../../trivia/domain/role.enum.ts';
import { UserService } from 'src/trivia/domain/ports/services/user.service';
import { UserInputDTO } from '../dtos/user-input.dto';
  
@Controller('user')
@ApiTags('user')
@UseFilters(HttpErrorException)
@UseGuards(AuthGuard, RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @Roles(Role.ADMINISTRATOR)
    async create(
        @Body() createUserDto: UserInputDTO,
        @Res() res: Response,
    ) {
        const created = await this.userService.create(createUserDto);
        return res.status(HttpStatus.OK).json({
        message: 'User created successfully',
        data: created,
        });
    }

    @Roles(Role.ADMINISTRATOR)
    @Get()
    async getAll(@Res() res: Response) {
        const users = await this.userService.getAll();
        return res.status(HttpStatus.OK).json({
        message: 'Users retrieved successfully',
        data: users,
        });
    }
    
    @Roles(Role.ADMINISTRATOR)
    @Get("/email/:email")
    async getByEmail(
        @Param('email') email: string,
        @Res() res: Response,
    ) {
        const user = await this.userService.getByEmail(email);
        return res.status(HttpStatus.OK).json({
        message: 'User retrieved successfully',
        data: user,
        });
    }

    @Roles(Role.ADMINISTRATOR)
    @Get("/id/:id")
    async getById(
        @Param('id', ParseIntPipe) id: number,
        @Res() res: Response,
    ) {
        const user = await this.userService.getById(id);
        return res.status(HttpStatus.OK).json({
        message: 'User retrieved successfully',
        data: user,
        });
    }
}