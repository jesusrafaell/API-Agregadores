const Comercios = `
  CREATE TABLE [dbo].[Comercios](
    [comerCod] [int] IDENTITY(1,1) NOT NULL,
    [comerDesc] [varchar](200) NOT NULL,
    [comerTipoPer] [int] NOT NULL,
    [comerCodigoBanco] [varchar](4) NULL,
    [comerCuentaBanco] [varchar](20) NULL,
    [comerPagaIva] [char](2) NULL,
    [comerCodUsuario] [varchar](8) NULL,
    [comerCodPadre] [int] NULL,
    [comerRif] [varchar](10) NULL,
    [comerFreg] [smalldatetime] NULL,
    [comerCodTipoCont] [int] NULL,
    [comerInicioContrato] [date] NULL,
    [comerFinContrato] [date] NULL,
    [comerExcluirPago] [bit] NULL,
    [comerCodCategoria] [int] NOT NULL,
    [comerGarantiaFianza] [bit] NULL,
    [comerModalidadGarantia] [int] NULL,
    [comerMontoGarFian] [decimal](24, 2) NULL,
    [comerModalidadPos] [int] NULL,
    [comerTipoPos] [int] NULL,
    [comerRecaudos] [varchar](150) NULL,
    [comerDireccion] [varchar](250) NULL,
    [comerObservaciones] [varchar](250) NULL,
    [comerCodAliado] [int] NULL,
    [comerEstatus] [int] NULL,
    [comerHorario] [varchar](50) NULL,
    [comerImagen] [image] NULL,
    [comerPuntoAdicional] [bit] NULL,
    [comerCodigoBanco2] [varchar](4) NULL,
    [comerCuentaBanco2] [varchar](20) NULL,
    [comerCodigoBanco3] [varchar](4) NULL,
    [comerCuentaBanco3] [varchar](20) NULL,
    [comerDireccionHabitacion] [varchar](250) NULL,
    [comerDireccionPos] [varchar](250) NULL,
    [comerDiasOperacion] [varchar](100) NULL,
    [comerFechaGarFian] [date] NULL,
  CONSTRAINT [PK_Comercios] PRIMARY KEY CLUSTERED 
  (
    [comerCod] ASC
  )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
  CONSTRAINT [IX_Comercios] UNIQUE NONCLUSTERED 
  (
    [comerRif] ASC
  )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
  ) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY];

  ALTER TABLE [dbo].[Comercios] ADD  CONSTRAINT [DF_Comercios_comerPagaIva]  DEFAULT ('SI') FOR [comerPagaIva];

  ALTER TABLE [dbo].[Comercios] ADD  CONSTRAINT [DF_Comercios_comerFreg]  DEFAULT (getdate()) FOR [comerFreg];

  ALTER TABLE [dbo].[Comercios] ADD  CONSTRAINT [DF_Comercios_comerExcluirPago]  DEFAULT ((0)) FOR [comerExcluirPago];

  ALTER TABLE [dbo].[Comercios] ADD  CONSTRAINT [DF_Comercios_comerGarantiaFianza]  DEFAULT ((0)) FOR [comerGarantiaFianza];

  ALTER TABLE [dbo].[Comercios] ADD  DEFAULT ((0)) FOR [comerPuntoAdicional];

  ALTER TABLE [dbo].[Comercios]  WITH NOCHECK ADD  CONSTRAINT [FK_Comercios_Bancos] FOREIGN KEY([comerCodigoBanco])
  REFERENCES [dbo].[Bancos] ([banCodBan]);

  ALTER TABLE [dbo].[Comercios] NOCHECK CONSTRAINT [FK_Comercios_Bancos];

  ALTER TABLE [dbo].[Comercios]  WITH NOCHECK ADD  CONSTRAINT [FK_Comercios_CategoriasComercios] FOREIGN KEY([comerCodCategoria])
  REFERENCES [dbo].[CategoriasComercios] ([ccCodCateg]);

  ALTER TABLE [dbo].[Comercios] NOCHECK CONSTRAINT [FK_Comercios_CategoriasComercios];

  ALTER TABLE [dbo].[Comercios]  WITH NOCHECK ADD  CONSTRAINT [FK_Comercios_Estatus] FOREIGN KEY([comerEstatus])
  REFERENCES [dbo].[Estatus] ([id]);

  ALTER TABLE [dbo].[Comercios] NOCHECK CONSTRAINT [FK_Comercios_Estatus];

  ALTER TABLE [dbo].[Comercios]  WITH NOCHECK ADD  CONSTRAINT [FK_Comercios_ModalidadPos] FOREIGN KEY([comerModalidadPos])
  REFERENCES [dbo].[ModalidadPos] ([id]);

  ALTER TABLE [dbo].[Comercios] NOCHECK CONSTRAINT [FK_Comercios_ModalidadPos];

  ALTER TABLE [dbo].[Comercios]  WITH NOCHECK ADD  CONSTRAINT [FK_Comercios_TipoGarantiaComercio] FOREIGN KEY([comerModalidadGarantia])
  REFERENCES [dbo].[TipoGarantiaComercio] ([codTipoGarantia]);

  ALTER TABLE [dbo].[Comercios] NOCHECK CONSTRAINT [FK_Comercios_TipoGarantiaComercio];

  ALTER TABLE [dbo].[Comercios]  WITH NOCHECK ADD  CONSTRAINT [FK_Comercios_TipoPersona] FOREIGN KEY([comerTipoPer])
  REFERENCES [dbo].[TipoPersona] ([CodTipoPer]);

  ALTER TABLE [dbo].[Comercios] NOCHECK CONSTRAINT [FK_Comercios_TipoPersona];

  ALTER TABLE [dbo].[Comercios]  WITH NOCHECK ADD  CONSTRAINT [FK_Comercios_TipoPos] FOREIGN KEY([comerTipoPos])
  REFERENCES [dbo].[TipoPos] ([id]);

  ALTER TABLE [dbo].[Comercios] NOCHECK CONSTRAINT [FK_Comercios_TipoPos];

  EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Id del comercio afiliado' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Comercios', @level2type=N'COLUMN',@level2name=N'comerCod';

  EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Nombre del comercio o persona natural' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Comercios', @level2type=N'COLUMN',@level2name=N'comerDesc';

  EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Tipo de persona - 1 Natural , 2 Jurídica' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Comercios', @level2type=N'COLUMN',@level2name=N'comerTipoPer';

  EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Paga IVA? SI - NO' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Comercios', @level2type=N'COLUMN',@level2name=N'comerPagaIva';

  EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Código de usuario en terminales multi-usuarios' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Comercios', @level2type=N'COLUMN',@level2name=N'comerCodUsuario';

  EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Código del comercio padre en terminales multi-usuarios' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Comercios', @level2type=N'COLUMN',@level2name=N'comerCodPadre';

  EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Rif o cedula del comercio afiliado' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Comercios', @level2type=N'COLUMN',@level2name=N'comerRif';
`;
export default Comercios;
