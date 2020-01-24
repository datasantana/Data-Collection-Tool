/*  CREATE EXTENSIONS */
CREATE EXTENSION pgcrypto CASCADE;
CREATE EXTENSION postgis CASCADE;

/* CREATE SCHEMA */

CREATE SCHEMA projects
    AUTHORIZATION postgres;
	
/* CREATE TABLES */

--CREATE TABLE users */
CREATE TABLE public.users
(
    id serial NOT NULL,
    email character varying(100),
    password text,
    created timestamp without time zone,
    updated timestamp without time zone,
    PRIMARY KEY (id)
);
	
/* CREATE TABLE datatypes */

CREATE TABLE public.datatypes
(
    id serial NOT NULL,
    name character varying(50),
	label character varying,
    created timestamp without time zone,
    updated timestamp without time zone,
    PRIMARY KEY (id)
);

/* CREATE TABLE forms */

CREATE TABLE public.forms
(
    id serial NOT NULL,
    "tableName" character varying (20),
	name character varying (50),
	description character varying (255),
    created timestamp without time zone,
    updated timestamp without time zone,
	"userId"integer,
    PRIMARY KEY (id)
);

/* CREATE TABLE fields */

CREATE TABLE public.fields
(
    id serial NOT NULL,
	label character varying(20),
    "columnName" character varying (20),
	description character varying (255),
    created timestamp without time zone,
    updated timestamp without time zone,
	"formId" integer,
	"datatypeId" integer,
    PRIMARY KEY (id)
);

/* INSERT DATA */

INSERT INTO public.datatypes (name, label, created, updated)
VALUES
('varchar', 'Texto', current_timestamp, current_timestamp),
('bigint', 'Número', current_timestamp, current_timestamp),
('decimal', 'Decimal', current_timestamp, current_timestamp),
('date', 'Fecha', current_timestamp, current_timestamp),
('money', 'Moneda', current_timestamp, current_timestamp);