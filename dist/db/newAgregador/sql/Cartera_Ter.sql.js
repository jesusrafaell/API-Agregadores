"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cartera_Ter = `
  CREATE TABLE [dbo].[Cartera_Ter](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [Terminal_Id] [varchar](8) NOT NULL,
    [Cod_Cartera] [varchar](15) NOT NULL,
  PRIMARY KEY CLUSTERED 
  (
    [Terminal_Id] ASC
  )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
  ) ON [PRIMARY];

  ALTER TABLE [dbo].[Cartera_Ter]  WITH NOCHECK ADD  CONSTRAINT [fk_Abonos] FOREIGN KEY([Terminal_Id])
  REFERENCES [dbo].[Abonos] ([aboTerminal]);

  ALTER TABLE [dbo].[Cartera_Ter] NOCHECK CONSTRAINT [fk_Abonos];

  ALTER TABLE [dbo].[Cartera_Ter]  WITH CHECK ADD  CONSTRAINT [fk_Cartera] FOREIGN KEY([Cod_Cartera])
  REFERENCES [dbo].[Cartera] ([Cod_Cartera]);

  ALTER TABLE [dbo].[Cartera_Ter] CHECK CONSTRAINT [fk_Cartera];
`;
exports.default = Cartera_Ter;
//# sourceMappingURL=Cartera_Ter.sql.js.map