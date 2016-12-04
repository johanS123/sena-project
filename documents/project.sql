CREATE DATABASE IF NOT EXISTS project;

USE project;

CREATE TABLE users(
  id INT(11) AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(80) NOT NULL,
  last_name VARCHAR(80) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('administrador', 'estudiante', 'profesor', 'coordinador', 'secretariado', 'acudiente'),
  last_login DATETIME NULL,
  PRIMARY KEY(id),
  UNIQUE (email)
);

CREATE TABLE history(
  id INT(11) AUTO_INCREMENT NOT NULL,
  action VARCHAR(50) NOT NULL,
  datetime DATETIME NOT NULL,
  id_user INT(11) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE courses(
  id INT(11) AUTO_INCREMENT NOT NULL,
  name VARCHAR(50) NOT NULL,
  date_due DATETIME NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE attendances(
  id INT(11) AUTO_INCREMENT NOT NULL,
  attended BOOL NULL,
  date_arrived DATETIME NULL,
  id_user INT(11) NOT NULL,
  id_course INT(11) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (id_course) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE observations(
  id INT(11) AUTO_INCREMENT NOT NULL,
  type ENUM('academico', 'convivencial'),
  description TEXT NOT NULL,
  date DATE NOT NULL,
  tracing TEXT NOT NULL,
  id_user INT(11) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE requests(
  id INT(11) AUTO_INCREMENT NOT NULL,
  request TEXT NOT NULL,
  date_request DATETIME NOT NULL,
  date_response DATETIME NULL,
  id_user INT(11) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE documents(
  id INT(11) AUTO_INCREMENT NOT NULL,
  name VARCHAR(50) NOT NULL,
  url VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  id_request INT(11) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_request) REFERENCES requests(id) ON DELETE CASCADE
);

CREATE TABLE reports(
  id INT(11) AUTO_INCREMENT NOT NULL,
  achievements TEXT NOT NULL,
  id_user INT(11) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
);
