import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/Entity/user.entity";
import { Repository } from "typeorm";
import { RefreshToken } from "../Entity/refresh-token.entity";
import { AccessToken } from "../Entity/access-token.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(AccessToken)
    private accessTokenRepository: Repository<AccessToken>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>
  ) {
  }


  async getUsers() {
    return await this.userRepository.find(); // Sử dụng phương thức find từ Repository
  }


  async findOneByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async revokeRefreshTokens(userId: number) {
    await this.refreshTokenRepository.delete({ user: { id: userId } });
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username }); // Dùng findOneBy với điều kiện
  }
}
