import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  authToken: string;

  @Column()
  password: string;

  @Column({ default: false })
  verified: boolean;
}
