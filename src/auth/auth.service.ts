import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import ConflictError from 'src/commons/errors/conflict.error';
import ResourceExistsError from 'src/commons/errors/resource-exists.error';
import ResourceNotFound from 'src/commons/errors/resources-not-found.error';
import UnauthorizedCredentialsError from 'src/commons/errors/unauthorized-credentials.error';
import { UserService } from 'src/trivia/domain/ports/services/user.service';
import { UserInputDTO } from 'src/trivia/infrastructure/adapters/dtos/user-input.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    try{
      const user = await this.userService.getByEmail(email);
      if (user && bcrypt.compareSync(pass, user.password)) {
          const { password, ...result } = user;
          return result;
      }
      return null;
    } catch (error) {
      console.log('paso por aca');
      throw new ConflictError('Credenciales inválidas');
    }
  }

  async login(user: any) {
    try{
      console.log('ingreso');
      const payload = { email: user.email, role: user.role, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload, { secret: process.env.JWTSECRET }),
      };
    } catch (error) {
      console.log('ajajjajja');
      throw new UnauthorizedCredentialsError();
      // console.error('Error al generar el token:', error.message);
      // throw error;
    }
  }

  async register(createUserDto: UserInputDTO) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = await this.userService.create({
        ...createUserDto, password: hashedPassword,
      });
      return user;
    } catch (error) {
      throw new ResourceNotFound(
        'the User',
        'email',
        createUserDto.email,
      );
    }
  }
}
