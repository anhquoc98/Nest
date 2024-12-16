import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../Entity/user.entity';
import { LoginDto } from "../dto/login.dto";
import { TokenDto } from "../dto/token.dto"; // Import DTO

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<TokenDto> {
    return this.authService.login(loginDto);
  }
}
