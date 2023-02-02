"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bancos = `
  CREATE TABLE [dbo].[Bancos](
    [banCodBan] [varchar](4) NOT NULL,
    [banDescBan] [varchar](255) NOT NULL,
    [banSwift] [varchar](12) NULL,
  CONSTRAINT [PK_Bancos] PRIMARY KEY CLUSTERED 
  (
    [banCodBan] ASC
  )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
  ) ON [PRIMARY];

  EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Código de Banco' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Bancos', @level2type=N'COLUMN',@level2name=N'banCodBan';

  EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Descripción del Banco' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Bancos', @level2type=N'COLUMN',@level2name=N'banDescBan';
`;
exports.default = Bancos;
//# sourceMappingURL=Bancos.sql.js.map