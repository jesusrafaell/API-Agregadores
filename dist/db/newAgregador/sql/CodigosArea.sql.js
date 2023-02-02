"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CodigoArea = `
  CREATE TABLE [dbo].[CodigosArea](
    [codigo] [varchar](6) NOT NULL,
    [tipoCodigo] [int] NOT NULL,
  CONSTRAINT [PK_CodigosArea] PRIMARY KEY CLUSTERED 
  (
    [codigo] ASC
  )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
  ) ON [PRIMARY];
`;
exports.default = CodigoArea;
//# sourceMappingURL=CodigosArea.sql.js.map