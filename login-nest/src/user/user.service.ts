import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) // Inject Repository<User> thay vì UserRepository
    private readonly userRepository: Repository<User>, // Sử dụng Repository<User>
  ) {}

  async getUsers() {
    return await this.userRepository.find(); // Sử dụng phương thức find từ Repository
  }
}
