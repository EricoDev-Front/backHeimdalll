CREATE DATABASE heimdall;
USE heimdall;
CREATE TABLE Sala (
    sala_id INT AUTO_INCREMENT PRIMARY KEY,
    status BOOLEAN NOT NULL,
    ident_sala VARCHAR(10) NOT NULL,
    num_cadeiras INT,
    num_mesas INT,
    num_projetores INT,
    num_computadores INT,
    num_lousas INT
);

CREATE TABLE Professor (
    professor_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(50) NOT NULL,
    registro VARCHAR(10) NOT NULL,
    adm BOOLEAN NOT NULL
);

CREATE TABLE Aluno (
    aluno_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(50) NOT NULL,
    registro VARCHAR(10) NOT NULL,
    ano_entrada INT NOT NULL
);

CREATE TABLE Disciplina (
    disciplina_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(300)
);

CREATE TABLE Curso (
    curso_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(300),
    disciplina_id INT NOT NULL,
    FOREIGN KEY (disciplina_id) REFERENCES Disciplina(disciplina_id)
);

CREATE TABLE Reserva (
    reserva_id INT AUTO_INCREMENT PRIMARY KEY,
    professor_id INT NOT NULL,
    sala_id INT NOT NULL,
    status BOOLEAN NOT NULL,
    data_hora_inicio DATETIME NOT NULL,
    data_hora_final DATETIME NOT NULL,
    FOREIGN KEY (professor_id) REFERENCES Professor(professor_id),
    FOREIGN KEY (sala_id) REFERENCES Sala(sala_id)
);

CREATE TABLE Validacao (
    valida_id INT AUTO_INCREMENT PRIMARY KEY,
    professor_id INT NOT NULL,
    sala_id INT NOT NULL,
    reserva_id INT NOT NULL,
    status BOOLEAN NOT NULL,
    data_hora_inicio DATETIME NOT NULL,
    data_hora_final DATETIME NOT NULL,
    FOREIGN KEY (professor_id) REFERENCES Professor(professor_id),
    FOREIGN KEY (sala_id) REFERENCES Sala(sala_id),
    FOREIGN KEY (reserva_id) REFERENCES Reserva(reserva_id)
);

CREATE TABLE Turma (
    turma_id INT AUTO_INCREMENT PRIMARY KEY,
    professor_id INT NOT NULL,
    aluno_id INT NOT NULL,
    disciplina_id INT NOT NULL,
    periodo VARCHAR(10) NOT NULL,
    FOREIGN KEY (professor_id) REFERENCES Professor(professor_id),
    FOREIGN KEY (aluno_id) REFERENCES Aluno(aluno_id),
    FOREIGN KEY (disciplina_id) REFERENCES Disciplina(disciplina_id)
);

CREATE TABLE Interesse (
    interesse_id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    turma_id INT NOT NULL,
    FOREIGN KEY (aluno_id) REFERENCES Aluno(aluno_id),
    FOREIGN KEY (turma_id) REFERENCES Turma(turma_id)
);

