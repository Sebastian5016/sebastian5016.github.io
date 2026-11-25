-- Crear tablas y cargar datos
CREATE TABLE libros (
  id      INTEGER PRIMARY KEY,
  titulo  TEXT NOT NULL,
  autor   TEXT NOT NULL,
  anio    INTEGER,
  genero  TEXT
);

INSERT INTO libros (titulo, autor, anio, genero) VALUES
  ('Ficciones', 'Jorge Luis Borges', 1944, 'Cuento'),
  ('Rayuela', 'Julio Cortázar', 1963, 'Novela'),
  ('El túnel', 'Ernesto Sabato', 1948, 'Novela'),
  ('Martín Fierro', 'José Hernández', 1872, 'Poesía');
