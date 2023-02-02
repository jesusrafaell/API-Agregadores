"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cartera = `
  CREATE TABLE [dbo].[Cartera](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [Cod_Cartera] [varchar](15) NOT NULL,
    [Nombre_Org] [varchar](200) NULL,
  PRIMARY KEY CLUSTERED 
  (
    [Cod_Cartera] ASC
  )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
  ) ON [PRIMARY];
`;
exports.default = Cartera;
//# sourceMappingURL=Cartera.sql%20copy.js.map