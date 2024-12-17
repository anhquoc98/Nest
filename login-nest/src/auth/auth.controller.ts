import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { TokenDto } from '../dto/token.dto'; // Import DTO
import { RegisterDto } from 'src/dto/register.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<TokenDto> {
    console.log(loginDto);
    return this.authService.login(loginDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    console.log(registerDto);
    return this.authService.register(registerDto);
  }

  // Thu hồi Refresh Token
  // Cấp lại Access Token và Refresh Token mới sau khi thu hồi cũ
  @HttpCode(HttpStatus.OK)
  @Post('revoke-refresh')
  async revokeAndRefreshToken(
    @Body() body: { userId: number },
  ): Promise<TokenDto> {
    return this.authService.revokeAndRefreshToken(body.userId); // Gọi service để thu hồi và cấp lại token mới
  }
  @UseGuards(AuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Body('refresh_token') refreshToken: string) {
    console.log(refreshToken);
    await this.authService.logout(refreshToken);
    return { message: 'Logout successful, token has been revoked' };
  }
}
