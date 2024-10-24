-- 1. Adicionar a coluna curso_id
ALTER TABLE Disciplina
ADD COLUMN curso_id INT NOT NULL;

-- 2. Adicionar a chave estrangeira
ALTER TABLE Disciplina
ADD CONSTRAINT fk_curso
FOREIGN KEY (curso_id) REFERENCES Curso(curso_id);