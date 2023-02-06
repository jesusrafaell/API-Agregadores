const CategoriasComercios = `
  CREATE TABLE [dbo].[CategoriasComercios](
    [ccCodCateg] [int] NOT NULL,
    [ccDescCateg] [varchar](200) NULL,
  CONSTRAINT [PK_CategoriasComercios] PRIMARY KEY CLUSTERED 
  (
    [ccCodCateg] ASC
  )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
  ) ON [PRIMARY];
  
  EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Código de la categoría de comercio - tipo de actividad comercial' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CategoriasComercios', @level2type=N'COLUMN',@level2name=N'ccCodCateg';
  
  EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Descripción de la categoría' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CategoriasComercios', @level2type=N'COLUMN',@level2name=N'ccDescCateg';
`;

export default CategoriasComercios;
