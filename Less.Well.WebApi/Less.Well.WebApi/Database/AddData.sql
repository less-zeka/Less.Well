USE [Less.WellDb];
GO
TRUNCATE TABLE Wells;
GO 

INSERT INTO Wells([Longitude],[Latitude],[Info])
VALUES(7.444545, 46.959316, 'Det bim Schuhuus hetts doch eine. Oder?');

INSERT INTO Wells([Longitude],[Latitude],[Info])
VALUES(7.437925, 46.956739, 'Ömu Wasser!');

INSERT INTO Wells([Longitude],[Latitude],[Info])
VALUES(7.459072, 46.948426, 'Irgendwo da hetts eine.');

INSERT INTO Wells([Longitude],[Latitude],[Info])
VALUES(7.451894, 46.947599, 'Irgendwo da hetts eine.');

INSERT INTO Wells([Longitude],[Latitude],[Info])
VALUES(7.440532, 46.946409, 'Kein Brunnen!');

INSERT INTO Wells([Longitude],[Latitude],[Info])
VALUES(7.433923, 46.957951, 'Kein Brunnen!');

SELECT *
FROM Wells;