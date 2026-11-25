-- SELECT, WHERE, ORDER BY, GROUP BY
SELECT titulo, autor FROM libros;

SELECT * FROM libros WHERE anio < 1950 ORDER BY anio;

SELECT genero, COUNT(*) AS cantidad
FROM libros
GROUP BY genero
ORDER BY cantidad DESC;

UPDATE libros SET genero = 'Novela' WHERE titulo = 'Martín Fierro'; -- ¿es correcto? Discutir.
DELETE FROM libros WHERE anio IS NULL;
