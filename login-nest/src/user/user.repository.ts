import { Repository } from 'typeorm';
import { User } from 'src/Entity/user.entity';

export class UserRepository extends Repository<User> {}
