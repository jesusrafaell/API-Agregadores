import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('SerialPos', { synchronize: true })
export default class SerialPos {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false, length: 8 })
  terminal!: string;

  @Column({ nullable: false })
  serial!: string;

  @Column({ nullable: false })
  id_modelo!: number;

  @CreateDateColumn()
  date_create: string;

  @UpdateDateColumn()
  date_modify: string;
}

/*

CREATE TABLE [dbo].[SerialPos] (
"id" int NOT NULL IDENTITY(1,1),
"terminal" varchar(8) NOT NULL,
"serial" nvarchar(255) NOT NULL,
"id_modelo" int NOT NULL, 
"date_create" datetime2 NOT NULL CONSTRAINT "DF_d935c25963bb4a6b071f21fc5b7" DEFAULT getdate(), 
"date_modify" datetime2 NOT NULL CONSTRAINT "DF_9155a0c7722bde85204f4a46e81" DEFAULT getdate(), 
CONSTRAINT "PK_bb16c265a7ef4e46a811e51bbce" PRIMARY KEY ("id")
)

ALTER TABLE [dbo].[SerialPos]  WITH CHECK ADD FOREIGN KEY([id_modelo])
REFERENCES [dbo].[ModelPos] ([id])
GO

ALTER TABLE [dbo].[SerialPos]  WITH CHECK ADD FOREIGN KEY([terminal])
REFERENCES [dbo].[Abonos] ([aboTerminal])
GO

*/
