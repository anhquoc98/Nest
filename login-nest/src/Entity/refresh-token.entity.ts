import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.refreshTokens)
  user: User;

  @Column()
  token: string;

  @Column()
  expiresAt: Date;
}
