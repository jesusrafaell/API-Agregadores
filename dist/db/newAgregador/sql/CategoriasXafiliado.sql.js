"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CategoriasComercios = `
  CREATE TABLE [dbo].[CategoriasXafiliado](
    [catCodAfi] [varchar](15) NOT NULL,
    [catCodCat] [varchar](4) NOT NULL,
  CONSTRAINT [PK_CategoriasXafiliado] PRIMARY KEY CLUSTERED 
  (
    [catCodAfi] ASC,
    [catCodCat] ASC
  )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
  ) ON [PRIMARY];

  ALTER TABLE [dbo].[CategoriasXafiliado]  WITH NOCHECK ADD  CONSTRAINT [FK_CategoriasXafiliado_Afiliados] FOREIGN KEY([catCodAfi])
  REFERENCES [dbo].[Afiliados] ([afiCod])
  ON UPDATE CASCADE
  ON DELETE CASCADE;

  ALTER TABLE [dbo].[CategoriasXafiliado] CHECK CONSTRAINT [FK_CategoriasXafiliado_Afiliados];

  EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Código del afiliado' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CategoriasXafiliado', @level2type=N'COLUMN',@level2name=N'catCodAfi';

  EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Código de la categoría de actividad comercial' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CategoriasXafiliado', @level2type=N'COLUMN',@level2name=N'catCodCat';
`;
exports.default = CategoriasComercios;
//# sourceMappingURL=CategoriasXafiliado.sql.js.map