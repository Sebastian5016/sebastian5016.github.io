-- Sistema de notas escolares
-- Compatible con SQLite y MySQL (con cambios mínimos).
-- Los datos son ficticios: nunca usar datos reales de estudiantes.

CREATE TABLE cursos (
  id      INTEGER PRIMARY KEY,
  anio    INTEGER NOT NULL,
  division TEXT   NOT NULL
);

CREATE TABLE estudiantes (
  id        INTEGER PRIMARY KEY,
  codigo    TEXT NOT NULL UNIQUE,   -- identificador anónimo, ej. "E-001"
  curso_id  INTEGER NOT NULL REFERENCES cursos(id)
);

CREATE TABLE materias (
  id      INTEGER PRIMARY KEY,
  nombre  TEXT NOT NULL
);

CREATE TABLE notas (
  id             INTEGER PRIMARY KEY,
  estudiante_id  INTEGER NOT NULL REFERENCES estudiantes(id),
  materia_id     INTEGER NOT NULL REFERENCES materias(id),
  trimestre      INTEGER NOT NULL CHECK (trimestre BETWEEN 1 AND 3),
  nota           REAL    NOT NULL CHECK (nota BETWEEN 1 AND 10)
);

INSERT INTO cursos (id, anio, division) VALUES (1, 4, 'A'), (2, 4, 'B');

INSERT INTO estudiantes (id, codigo, curso_id) VALUES
  (1, 'E-001', 1), (2, 'E-002', 1), (3, 'E-003', 1),
  (4, 'E-004', 2), (5, 'E-005', 2);

INSERT INTO materias (id, nombre) VALUES
  (1, 'Informática'), (2, 'Matemática'), (3, 'Programación');

INSERT INTO notas (estudiante_id, materia_id, trimestre, nota) VALUES
  (1, 1, 1, 8), (1, 2, 1, 6), (1, 3, 1, 9),
  (2, 1, 1, 5), (2, 2, 1, 7), (2, 3, 1, 4),
  (3, 1, 1, 10), (3, 2, 1, 9), (3, 3, 1, 8),
  (4, 1, 1, 6), (4, 2, 1, 5), (4, 3, 1, 7),
  (5, 1, 1, 7), (5, 2, 1, 8), (5, 3, 1, 6);
