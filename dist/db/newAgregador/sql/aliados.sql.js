"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Aliados = `
  CREATE TABLE [dbo].[Aliados](
    [id] [int] IDENTITY(1,1) NOT NULL,
    [aliIdUsuario] [int] NULL,
    [aliTipoIdentificacion] [varchar](3) NOT NULL,
    [aliIdentificacion] [varchar](30) NOT NULL,
    [aliApellidos] [varchar](100) NOT NULL,
    [aliNombres] [varchar](100) NOT NULL,
    [aliSexo] [varchar](1) NULL,
    [aliFechaNacimiento] [date] NULL,
    [aliCodigoTelHabitacion] [varchar](10) NULL,
    [aliTelefonoHabitacion] [varchar](50) NULL,
    [aliCodigoCelular] [varchar](10) NULL,
    [aliCelular] [varchar](50) NULL,
    [aliEmail] [varchar](250) NULL,
    [aliProfesion] [varchar](50) NULL,
    [aliDireccion] [varchar](250) NULL,
    [aliCodZonaAtencion] [int] NULL,
    [aliCodModalidadPago] [int] NULL,
    [aliCuentaAbono] [varchar](20) NULL,
    [aliObservaciones] [varchar](max) NULL,
    [aliCodEstatus] [int] NOT NULL,
    [aliRecaudos] [varchar](150) NULL,
  CONSTRAINT [PK_Aliados] PRIMARY KEY CLUSTERED 
  (
    [id] ASC
  )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
  CONSTRAINT [IX_Aliados] UNIQUE NONCLUSTERED 
  (
    [aliTipoIdentificacion] ASC,
    [aliIdentificacion] ASC
  )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
  ) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY];

  ALTER TABLE [dbo].[Aliados]  WITH NOCHECK ADD  CONSTRAINT [FK_Aliados_Estatus] FOREIGN KEY([aliCodEstatus])
  REFERENCES [dbo].[Estatus] ([id]);

  ALTER TABLE [dbo].[Aliados] CHECK CONSTRAINT [FK_Aliados_Estatus];

  ALTER TABLE [dbo].[Aliados]  WITH NOCHECK ADD  CONSTRAINT [FK_Aliados_TipoPagoAliado] FOREIGN KEY([aliCodModalidadPago])
  REFERENCES [dbo].[TipoPagoAliado] ([codTipoPago]);

  ALTER TABLE [dbo].[Aliados] CHECK CONSTRAINT [FK_Aliados_TipoPagoAliado];

  ALTER TABLE [dbo].[Aliados]  WITH NOCHECK ADD  CONSTRAINT [FK_Aliados_ZonaAtencion] FOREIGN KEY([aliCodZonaAtencion])
  REFERENCES [dbo].[ZonaAtencion] ([id]);

  ALTER TABLE [dbo].[Aliados] CHECK CONSTRAINT [FK_Aliados_ZonaAtencion];
  `;
exports.default = Aliados;
//# sourceMappingURL=Aliados.sql.js.map