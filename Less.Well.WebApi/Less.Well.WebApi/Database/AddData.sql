USE [Less.WellDb];
GO
TRUNCATE TABLE Wells;
GO 

INSERT INTO Wells([Longitude],[Latitude],[Info])
VALUES(46.959316, 7.444545, 'Det bim Schuhuus hetts doch eine. Oder?');

INSERT INTO Wells([Longitude],[Latitude],[Info])
VALUES(46.956739, 7.437925, 'Ömu Wasser!');

INSERT INTO Wells([Longitude],[Latitude],[Info])
VALUES(46.948426, 7.459072, 'Irgendwo da hetts eine.');

INSERT INTO Wells([Longitude],[Latitude],[Info])
VALUES(46.947599, 7.451894, 'Irgendwo da hetts eine.');

INSERT INTO Wells([Longitude],[Latitude],[Info])
VALUES(46.946409, 7.440532, 'Kein Brunnen!');

INSERT INTO Wells([Longitude],[Latitude],[Info])
VALUES(46.957951, 7.433923, 'Kein Brunnen!');

SELECT *
FROM Wells;