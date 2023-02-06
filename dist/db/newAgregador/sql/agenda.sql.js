"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Agenda = `
  CREATE TABLE [dbo].[Agenda](
    [id] [int] IDENTITY(1,1) NOT NULL,
    [fechaInicio] [datetime] NOT NULL,
    [fechaFin] [datetime] NOT NULL,
    [idComercio] [int] NOT NULL,
    [idAliado] [int] NOT NULL,
    [titulo] [varchar](30) NOT NULL,
    [observaciones] [varchar](250) NULL,
  CONSTRAINT [PK_Agenda] PRIMARY KEY CLUSTERED 
  (
    [id] ASC
  )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
  ) ON [PRIMARY];

  ALTER TABLE [dbo].[Agenda]  WITH NOCHECK ADD  CONSTRAINT [FK_Agenda_Aliados] FOREIGN KEY([idAliado])
  REFERENCES [dbo].[Aliados] ([id]);

  ALTER TABLE [dbo].[Agenda] NOCHECK CONSTRAINT [FK_Agenda_Aliados];

  ALTER TABLE [dbo].[Agenda]  WITH NOCHECK ADD  CONSTRAINT [FK_Agenda_Comercios] FOREIGN KEY([idComercio])
  REFERENCES [dbo].[Comercios] ([comerCod]);

  ALTER TABLE [dbo].[Agenda] NOCHECK CONSTRAINT [FK_Agenda_Comercios];
`;
exports.default = Agenda;
//# sourceMappingURL=Agenda.sql.js.map