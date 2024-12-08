import { Controller, Post, Body, Res, HttpStatus, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './user.dto';
import { UserInputDTO } from 'src/trivia/infrastructure/adapters/dtos/user-input.dto';
import { Response } from 'express';
import { HttpErrorException } from 'src/commons/exceptions/http.exception';

@UseFilters(HttpErrorException)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: UserInputDTO) {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    return res.status(HttpStatus.OK).json({
        message:'login valid',
        data : await this.authService.login(user)
    });
  }
}
