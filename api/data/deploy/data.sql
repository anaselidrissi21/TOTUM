-- Deploy totum:create_database to pg

BEGIN;

-- create personnal domain
CREATE DOMAIN zip_code AS TEXT CHECK (VALUE ~ '^[0-9]{5}$');
CREATE DOMAIN email AS TEXT
  CHECK ( value ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$' );

CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email email NOT NULL UNIQUE,
    password TEXT NOT NULL,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    picture TEXT,
    about TEXT,
    address TEXT,
    zip_code zip_code NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

CREATE TABLE level (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

CREATE TABLE category (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    picto TEXT,
    id_user INT REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

CREATE TABLE activity (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    max_participants INT NOT NULL,
    date TEXT NOT NULL,
    level INT NOT NULL REFERENCES level(id) ON DELETE CASCADE,
    address TEXT NOT NULL,
    zip_code zip_code NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    landmark TEXT,
    id_user INT NOT NULL REFERENCES users(id),
    id_category INT NOT NULL REFERENCES category(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

CREATE TABLE comment (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    content TEXT NOT NULL,
    picture TEXT,
    id_user INT NOT NULL REFERENCES users(id),
    id_activity INT NOT NULL REFERENCES activity(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

CREATE TABLE meta (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cookie BOOLEAN NOT NULL DEFAULT FALSE,
    landmark BOOLEAN NOT NULL DEFAULT FALSE,
    id_user INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

CREATE TABLE user_activity (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_user INT NOT NULL REFERENCES users(id),
    id_activity INT NOT NULL REFERENCES activity(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

CREATE TABLE token_blacklist (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    token TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

ALTER TABLE users
ADD COLUMN meta_id INT REFERENCES meta(id);

INSERT INTO level (name) VALUES ('Beginner');
INSERT INTO level (name) VALUES ('Intermediate');
INSERT INTO level (name) VALUES ('Advanced');


COMMIT;
