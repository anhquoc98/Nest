import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Entity/user.entity'; // Đảm bảo đường dẫn đúng

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Đảm bảo rằng User được cung cấp cho Repository
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // Export UserService nếu cần thiết cho các module khác
})
export class UserModule {}
