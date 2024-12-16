import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class AccessToken {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.accessTokens)
  user: User;

  @Column()
  token: string;

  @Column()
  expiresAt: Date;
}
