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
  ) ON [PRIMARY]
  GO

  ALTER TABLE [dbo].[Agenda]  WITH NOCHECK ADD  CONSTRAINT [FK_Agenda_Aliados] FOREIGN KEY([idAliado])
  REFERENCES [dbo].[Aliados] ([id])
  GO

  ALTER TABLE [dbo].[Agenda] NOCHECK CONSTRAINT [FK_Agenda_Aliados]
  GO

  ALTER TABLE [dbo].[Agenda]  WITH NOCHECK ADD  CONSTRAINT [FK_Agenda_Comercios] FOREIGN KEY([idComercio])
  REFERENCES [dbo].[Comercios] ([comerCod])
  GO

  ALTER TABLE [dbo].[Agenda] NOCHECK CONSTRAINT [FK_Agenda_Comercios]
  GO
`;
exports.default = Agenda;
//# sourceMappingURL=agenda.entity.js.map