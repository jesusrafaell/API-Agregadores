const ComisionesMilPagos = `
  CREATE TABLE [dbo].[ComisionesMilPagos](
    [cmCodComercio] [int] NOT NULL,
    [cmPorcentaje] [decimal](18, 4) NULL,
  CONSTRAINT [PK_Comisiones1000Pagos] PRIMARY KEY CLUSTERED 
  (
    [cmCodComercio] ASC
  )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
  ) ON [PRIMARY];

  ALTER TABLE [dbo].[ComisionesMilPagos]  WITH NOCHECK ADD  CONSTRAINT [FK_Comisiones1000Pagos_Comercios] FOREIGN KEY([cmCodComercio])
  REFERENCES [dbo].[Comercios] ([comerCod])
  ON UPDATE CASCADE
  ON DELETE CASCADE;

  ALTER TABLE [dbo].[ComisionesMilPagos] NOCHECK CONSTRAINT [FK_Comisiones1000Pagos_Comercios];

  EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Id del comercio afiliado' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ComisionesMilPagos', @level2type=N'COLUMN',@level2name=N'cmCodComercio';

  EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Comisión Mil Pagos' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ComisionesMilPagos', @level2type=N'COLUMN',@level2name=N'cmPorcentaje';
`;
export default ComisionesMilPagos;
