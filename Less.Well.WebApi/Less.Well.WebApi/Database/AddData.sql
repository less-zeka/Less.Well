﻿USE [Less.WellDb];
GO
TRUNCATE TABLE Wells;
GO 

INSERT INTO Wells(DbGeography, [Longitude],[Latitude],[Info])
VALUES(0xE6100000010C745BC75D29C01D40BB383B63A97A4740, 7.4376578, 46.9582943, 'Det bim Schuhuus hetts doch eine. Oder?');

INSERT INTO Wells(DbGeography, [Longitude],[Latitude],[Info])
VALUES(0xE6100000010CA1924615FEBF1D4097E4F504A57A4740, 7.43749268763773, 46.9581609917306, 'Ömu Wasser!');

INSERT INTO Wells(DbGeography, [Longitude],[Latitude],[Info])
VALUES(0xE6100000010CEC2757A10FC01D4009384F70A47A4740, 7.43755962461908, 46.9581432711421, 'Irgendwo da hetts eine.');

INSERT INTO Wells(DbGeography, [Longitude],[Latitude],[Info])
VALUES(0xE6100000010C69A78BB910C01D409940B6D1A57A4740, 7.4375638, 46.9581854, 'Irgendwo da hetts eine.');


	

SELECT *
FROM Wells;