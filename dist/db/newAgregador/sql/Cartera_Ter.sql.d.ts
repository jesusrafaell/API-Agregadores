declare const Cartera_Ter = "\n  CREATE TABLE [dbo].[Cartera_Ter](\n    [Id] [int] IDENTITY(1,1) NOT NULL,\n    [Terminal_Id] [varchar](8) NOT NULL,\n    [Cod_Cartera] [varchar](15) NOT NULL,\n  PRIMARY KEY CLUSTERED \n  (\n    [Terminal_Id] ASC\n  )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]\n  ) ON [PRIMARY];\n\n  ALTER TABLE [dbo].[Cartera_Ter]  WITH NOCHECK ADD  CONSTRAINT [fk_Abonos] FOREIGN KEY([Terminal_Id])\n  REFERENCES [dbo].[Abonos] ([aboTerminal]);\n\n  ALTER TABLE [dbo].[Cartera_Ter] NOCHECK CONSTRAINT [fk_Abonos];\n\n  ALTER TABLE [dbo].[Cartera_Ter]  WITH CHECK ADD  CONSTRAINT [fk_Cartera] FOREIGN KEY([Cod_Cartera])\n  REFERENCES [dbo].[Cartera] ([Cod_Cartera]);\n\n  ALTER TABLE [dbo].[Cartera_Ter] CHECK CONSTRAINT [fk_Cartera];\n";
export default Cartera_Ter;
