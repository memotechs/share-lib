import {
  Column,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class EntityGeneric {
  constructor(id?: number) {
    this.id = id;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  createdBy: number;

  @Column({ select: false })
  updatedBy: number;

  @Column()
  state: number;

  @VersionColumn({ select: false })
  version: number;
}
