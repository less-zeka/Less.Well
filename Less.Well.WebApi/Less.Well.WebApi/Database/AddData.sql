TRUNCATE TABLE Wells;
GO 

INSERT INTO Wells([Longitude],[Latitude],[Info])
VALUES(10, 20, 'Brunnen 1');

INSERT INTO Wells([Longitude],[Latitude],[Info])
VALUES(20, 40, 'Brunnen 2');

INSERT INTO Wells([Longitude],[Latitude],[Info])
VALUES(20, 41, 'Brunnen 3');

INSERT INTO Wells([Longitude],[Latitude],[Info])
VALUES(20, 41, 'Brunnen 4');

INSERT INTO Wells([Longitude],[Latitude],[Info])
VALUES(20, 41, 'Brunnen 5');

SELECT *
FROM Wells;