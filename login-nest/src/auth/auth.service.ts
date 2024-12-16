import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from "../dto/login.dto"; // Import bcrypt

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.usersService.findOne(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const accessToken = await this.createAccessToken(user);
    const refreshToken = await this.createRefreshToken(user);
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  // Tạo Access Token
  private async createAccessToken(user: any) {
    const payload = { sub: user.id, username: user.username };
    return this.jwtService.sign(payload, { expiresIn: '15m' });
  }

  // Tạo Refresh Token
  private async createRefreshToken(user: any) {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }

  // Thu hồi Refresh Token
  async revokeRefreshToken(userId: number) {
    await this.usersService.revokeRefreshTokens(userId);
  }
}
