"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ComerciosXafiliado = `
  CREATE TABLE [dbo].[ComerciosXafiliado](
    [cxaCodAfi] [varchar](15) NOT NULL,
    [cxaCodComer] [int] NOT NULL,
    [cxaId] [int] IDENTITY(1,1) NOT NULL,
  CONSTRAINT [PK_ComerciosXafiliado] PRIMARY KEY CLUSTERED 
  (
    [cxaId] ASC
  )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
  ) ON [PRIMARY];

  ALTER TABLE [dbo].[ComerciosXafiliado]  WITH NOCHECK ADD  CONSTRAINT [FK_ComerciosXAfiliado_Afiliados] FOREIGN KEY([cxaCodAfi])
  REFERENCES [dbo].[Afiliados] ([afiCod])
  ON UPDATE CASCADE
  ON DELETE CASCADE;

  ALTER TABLE [dbo].[ComerciosXafiliado] CHECK CONSTRAINT [FK_ComerciosXAfiliado_Afiliados];

  ALTER TABLE [dbo].[ComerciosXafiliado]  WITH NOCHECK ADD  CONSTRAINT [FK_ComerciosXAfiliado_Comercios] FOREIGN KEY([cxaCodComer])
  REFERENCES [dbo].[Comercios] ([comerCod])
  ON UPDATE CASCADE
  ON DELETE CASCADE;

  ALTER TABLE [dbo].[ComerciosXafiliado] CHECK CONSTRAINT [FK_ComerciosXAfiliado_Comercios];

  EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Id del afiliado' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ComerciosXafiliado', @level2type=N'COLUMN',@level2name=N'cxaCodAfi';

  EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Id del comercio' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ComerciosXafiliado', @level2type=N'COLUMN',@level2name=N'cxaCodComer';
`;
exports.default = ComerciosXafiliado;
//# sourceMappingURL=ComerciosXafiliado.sql.js.map