declare const Bancos = "\n  CREATE TABLE [dbo].[Bancos](\n    [banCodBan] [varchar](4) NOT NULL,\n    [banDescBan] [varchar](255) NOT NULL,\n    [banSwift] [varchar](12) NULL,\n  CONSTRAINT [PK_Bancos] PRIMARY KEY CLUSTERED \n  (\n    [banCodBan] ASC\n  )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]\n  ) ON [PRIMARY];\n\n  EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'C\u00F3digo de Banco' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Bancos', @level2type=N'COLUMN',@level2name=N'banCodBan';\n\n  EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Descripci\u00F3n del Banco' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Bancos', @level2type=N'COLUMN',@level2name=N'banDescBan';\n";
export default Bancos;
