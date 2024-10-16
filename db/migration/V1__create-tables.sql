CREATE TABLE Sala (
    sala_id VARCHAR(10) NOT NULL,
    status BOOLEAN NOT NULL,
    ident_sala VARCHAR(10) NOT NULL,
    num_cadeiras INT,
    num_mesas INT,
    num_projetores INT,
    num_computadores INT,
    num_lousas INT,
    PRIMARY KEY (sala_id)
);

CREATE TABLE Professor (
    professor_id VARCHAR(10) NOT NULL,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(50) NOT NULL,
    registro VARCHAR(10) NOT NULL,
    adm BOOLEAN NOT NULL,
    PRIMARY KEY (professor_id)
);

CREATE TABLE Aluno (
    aluno_id VARCHAR(10) NOT NULL,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(50) NOT NULL,
    registro VARCHAR(10) NOT NULL,
    ano_entrada INT NOT NULL,
    PRIMARY KEY (aluno_id)
);

CREATE TABLE Disciplina (
    disciplina_id VARCHAR(10) NOT NULL,
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(300),
    PRIMARY KEY (disciplina_id)
);

CREATE TABLE Curso (
    curso_id VARCHAR(10) NOT NULL,
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(300),
    PRIMARY KEY (curso_id)
);

CREATE TABLE Reserva (
    reserva_id VARCHAR(10) NOT NULL,
    professor_id VARCHAR(10) NOT NULL,
    sala_id VARCHAR(10) NOT NULL,
    status BOOLEAN NOT NULL,
    data_hora_inicio DATETIME NOT NULL,
    data_hora_final DATETIME NOT NULL,
    PRIMARY KEY (reserva_id),
    FOREIGN KEY (professor_id) REFERENCES Professor(professor_id),
    FOREIGN KEY (sala_id) REFERENCES Sala(sala_id)
);

CREATE TABLE Validacao (
    valida_id VARCHAR(10) NOT NULL,
    professor_id VARCHAR(10) NOT NULL,
    sala_id VARCHAR(10) NOT NULL,
    reserva_id VARCHAR(10) NOT NULL,
    status BOOLEAN NOT NULL,
    data_hora_inicio DATETIME NOT NULL,
    data_hora_final DATETIME NOT NULL,
    PRIMARY KEY (valida_id),
    FOREIGN KEY (professor_id) REFERENCES Professor(professor_id),
    FOREIGN KEY (sala_id) REFERENCES Sala(sala_id),
    FOREIGN KEY (reserva_id) REFERENCES Reserva(reserva_id)
);

CREATE TABLE Turma (
    turma_id VARCHAR(10) NOT NULL,
    professor_id VARCHAR(10) NOT NULL,
    aluno_id VARCHAR(10) NOT NULL,
    disciplina_id VARCHAR(10) NOT NULL,
    periodo DATETIME NOT NULL,
    PRIMARY KEY (turma_id),
    FOREIGN KEY (professor_id) REFERENCES Professor(professor_id),
    FOREIGN KEY (aluno_id) REFERENCES Aluno(aluno_id),
    FOREIGN KEY (disciplina_id) REFERENCES Disciplina(disciplina_id)
);

CREATE TABLE Interesse (
    interesse_id VARCHAR(10) NOT NULL,
    aluno_id VARCHAR(10) NOT NULL,
    turma_id VARCHAR(10) NOT NULL,
    PRIMARY KEY (interesse_id),
    FOREIGN KEY (aluno_id) REFERENCES Aluno(aluno_id),
    FOREIGN KEY (turma_id) REFERENCES Turma(turma_id)
);
