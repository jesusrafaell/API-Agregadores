delete [dbo].[Comercios];

DBCC CHECKIDENT ('Comercios', RESEED, 0);
GO