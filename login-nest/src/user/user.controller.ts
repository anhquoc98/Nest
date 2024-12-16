import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { log } from 'console';
@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {
    this.userService = userService;
  }
  @Get()
  async getAllUsers() {
    return await this.userService.getUsers();
  }
}
