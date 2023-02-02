"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Comisiones = `
  CREATE TABLE [dbo].[Comisiones](
    [comCodCateg] [int] NOT NULL,
    [comComision] [decimal](18, 2) NULL,
    [comCodProd] [int] NOT NULL
  ) ON [PRIMARY];

  ALTER TABLE [dbo].[Comisiones]  WITH NOCHECK ADD  CONSTRAINT [FK_Comisiones_CategoriasComercios] FOREIGN KEY([comCodCateg])
  REFERENCES [dbo].[CategoriasComercios] ([ccCodCateg]);

  ALTER TABLE [dbo].[Comisiones] CHECK CONSTRAINT [FK_Comisiones_CategoriasComercios];

  ALTER TABLE [dbo].[Comisiones]  WITH NOCHECK ADD  CONSTRAINT [FK_Comisiones_TipoProductos] FOREIGN KEY([comCodProd])
  REFERENCES [dbo].[TipoProductos] ([proCodProd]);

  ALTER TABLE [dbo].[Comisiones] CHECK CONSTRAINT [FK_Comisiones_TipoProductos];

  EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Código categoría de actividad comercial' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Comisiones', @level2type=N'COLUMN',@level2name=N'comCodCateg';

  EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Tasa comisión Banco' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Comisiones', @level2type=N'COLUMN',@level2name=N'comComision';

  EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Código del tipo de producto' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Comisiones', @level2type=N'COLUMN',@level2name=N'comCodProd';
`;
exports.default = Comisiones;
//# sourceMappingURL=Comisiones.sql.js.map