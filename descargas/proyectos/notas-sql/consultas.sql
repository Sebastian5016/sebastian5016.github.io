-- Consultas del proyecto "Sistema de notas escolares"

-- 1. Todas las notas con el nombre de la materia
SELECT e.codigo, m.nombre AS materia, n.trimestre, n.nota
FROM notas n
JOIN estudiantes e ON e.id = n.estudiante_id
JOIN materias m    ON m.id = n.materia_id
ORDER BY e.codigo, m.nombre;

-- 2. Promedio de cada estudiante
SELECT e.codigo, ROUND(AVG(n.nota), 2) AS promedio
FROM notas n
JOIN estudiantes e ON e.id = n.estudiante_id
GROUP BY e.codigo
ORDER BY promedio DESC;

-- 3. Promedio por materia y por curso
SELECT c.anio || 'º ' || c.division AS curso, m.nombre AS materia,
       ROUND(AVG(n.nota), 2) AS promedio
FROM notas n
JOIN estudiantes e ON e.id = n.estudiante_id
JOIN cursos c      ON c.id = e.curso_id
JOIN materias m    ON m.id = n.materia_id
GROUP BY curso, materia;

-- 4. Estudiantes que necesitan acompañamiento (nota menor a 6)
SELECT e.codigo, m.nombre AS materia, n.nota
FROM notas n
JOIN estudiantes e ON e.id = n.estudiante_id
JOIN materias m    ON m.id = n.materia_id
WHERE n.nota < 6;

-- 5. Cantidad de aprobados por materia
SELECT m.nombre AS materia,
       SUM(CASE WHEN n.nota >= 6 THEN 1 ELSE 0 END) AS aprobados,
       COUNT(*) AS total
FROM notas n
JOIN materias m ON m.id = n.materia_id
GROUP BY m.nombre;
