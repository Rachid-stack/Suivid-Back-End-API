CREATE TABLE sd_categorie_courrier (
	id serial NOT NULL,
	code varchar(10) NULL,
	libelle varchar(200) NOT NULL,
	created_by int4 NULL,
	created_on timestamp NULL,
	updated_by int4 NULL,
	updated_on timestamp NULL,
	del bool NULL DEFAULT false,
	CONSTRAINT sd_categorie_courrier_pk PRIMARY KEY (id)
);

CREATE TABLE sd_type_courrier (
	id serial NOT NULL,
	code varchar(10) NULL,
	libelle varchar(200) NOT NULL,
	created_by int4 NULL,
	created_on timestamp NULL,
	updated_by int4 NULL,
	updated_on timestamp NULL,
	del bool NULL DEFAULT false,
	CONSTRAINT sd_type_courrier_pk PRIMARY KEY (id)
);

CREATE TABLE sd_document (
	id serial NOT NULL,
	titre varchar(200) NOT NULL,
	description text,
    fichier varchar(200) NOT NULL,
	created_by int4 NULL,
	created_on timestamp NULL,
	updated_by int4 NULL,
	updated_on timestamp NULL,
	del bool NULL DEFAULT false,
	CONSTRAINT sd_document_pk PRIMARY KEY (id)
);

-- DROP TABLE sd_agent

CREATE TABLE sd_agent (
	id serial NOT NULL,
	matricule varchar(20) NULL,
	nom varchar(150) NOT NULL,
	prenom varchar(200) NULL,
	telephone varchar(20) NULL,
	email varchar(150) NULL,
	photo varchar(200) NULL,
	created_by int4 NULL,
	created_on timestamp without time zone NULL,
	updated_by int4 NULL,
	updated_on timestamp without time zone NULL,
	del boolean NULL DEFAULT false,
    CONSTRAINT sd_agent_pk PRIMARY KEY (id)
);


CREATE TABLE sd_service (
	id serial NOT NULL,
	code varchar(10) NULL,
	libelle varchar(150) NOT NULL,
	telephone varchar(20) NULL,
	email varchar(150) NULL,
	id_parent int4 NULL,
	id_agent_responsable int4 NULL,
	created_by int4 NULL,
	created_on timestamp without time zone NULL,
	updated_by int4 NULL,
	updated_on timestamp without time zone NULL,
	del boolean NULL DEFAULT false,
	CONSTRAINT sd_service_pk PRIMARY KEY (id),
	CONSTRAINT sd_service_parent_fk FOREIGN KEY (id_parent) REFERENCES sd_service(id)
	CONSTRAINT sd_service_resp_fk FOREIGN KEY (id_agent_responsable) REFERENCES sd_agent(id)
);

CREATE TABLE sd_profil (
	id serial NOT NULL,
	code varchar(10) NULL,
	libelle varchar(200) NOT NULL,
	created_by int4 NULL,
	created_on timestamp NULL,
	updated_by int4 NULL,
	updated_on timestamp NULL,
	del bool NULL DEFAULT false,
	CONSTRAINT sd_profil_pk PRIMARY KEY (id)
);

CREATE TABLE sd_utilisateur (
	id serial NOT NULL,
	login varchar(50) NULL,
	passwd varchar(200) NULL,
	is_active boolean NULL DEFAULT false,
	last_connected timestamp without time zone NULL,
    id_profil int4 not NULL,
	id_agent int4 NULL,
	created_by int4 NULL,
	created_on timestamp without time zone NULL,
	updated_by int4 NULL,
	updated_on timestamp without time zone NULL,
	del boolean NULL DEFAULT false,
	CONSTRAINT sd_utilisateur_pk PRIMARY KEY (id),
	CONSTRAINT sd_utilisateur_fk FOREIGN KEY (id_agent) REFERENCES sd_agent(id),
    CONSTRAINT sd_utilisateur_profil_fk FOREIGN KEY (id_profil) REFERENCES sd_profil(id)
);

CREATE TABLE sd_registre_courrier(
    id SERIAL,
    code CHARACTER VARYING (10),
	libelle CHARACTER VARYING (100),
    created_by int4 NULL,
	created_on timestamp NULL,
	updated_by int4 NULL,
	updated_on timestamp NULL,
	del bool NULL DEFAULT FALSE,
	CONSTRAINT sd_registre_courrier_pk PRIMARY KEY (id)
);

CREATE TABLE sd_type_correspondant(
    id SERIAL,
    code CHARACTER VARYING (10),
	libelle CHARACTER VARYING (100),
    created_by int4 NULL,
	created_on timestamp NULL,
	updated_by int4 NULL,
	updated_on timestamp NULL,
	del bool NULL DEFAULT FALSE,
	CONSTRAINT sd_sd_type_correspondant_pk PRIMARY KEY (id)
);

CREATE TABLE sd_correspondant(
    id SERIAL,
    is_pers_morale BOOLEAN DEFAULT FALSE,
    nom CHARACTER VARYING (150), -- Ou raison sociale s'il s'agit d'une entreprise
    prenom CHARACTER VARYING (150),
    adresse TEXT,
    telephone varchar(20) NULL,
	email varchar(150) NULL,
    id_type_correspondant INTEGER,
    created_on TIMESTAMP WITHOUT TIME ZONE,
    created_by INTEGER ,
    updated_on TIMESTAMP WITHOUT TIME ZONE,
    updated_by INTEGER ,
    del BOOLEAN DEFAULT FALSE,
    CONSTRAINT sd_correspondant_pk PRIMARY KEY (id),
	CONSTRAINT sd_type_correspondant_fk FOREIGN KEY (id_type_correspondant) REFERENCES sd_type_correspondant(id)
);

CREATE TABLE sd_courrier (
    id SERIAL PRIMARY KEY,
    id_registre INTEGER,
    id_categorie_courrier INTEGER,
    id_type_courrier INTEGER,
    id_correspondant INTEGER,
    code CHARACTER VARYING (50),
	libelle CHARACTER VARYING (100),
    created_on TIMESTAMP WITHOUT TIME ZONE,
    created_by INTEGER ,
    updated_on TIMESTAMP WITHOUT TIME ZONE,
    updated_by INTEGER,
    del BOOLEAN DEFAULT FALSE,
    CONSTRAINT sd_courrier_resgistre_fk FOREIGN KEY (id_registre) REFERENCES sd_registre_courrier(id),
    CONSTRAINT sd_categorie_courrier_fk FOREIGN KEY (id_categorie_courrier) REFERENCES sd_categorie_courrier(id),
    CONSTRAINT sd_type_courrier_fk FOREIGN KEY (id_type_courrier) REFERENCES sd_type_courrier(id),
    CONSTRAINT sd_corresp_fk FOREIGN KEY (id_correspondant) REFERENCES sd_correspondant(id)
);

CREATE TABLE sd_imputation_courrier(
    id_courrier INTEGER,
    id_service INTEGER,
    date_imputation TIMESTAMP WITHOUT TIME ZONE,
    commentaire TEXT,
    created_on TIMESTAMP WITHOUT TIME ZONE,
    created_by INTEGER,
    updated_on TIMESTAMP WITHOUT TIME ZONE,
    updated_by INTEGER,
    PRIMARY KEY (id_courrier, id_service),
    CONSTRAINT sd_imputation_courrier_fk FOREIGN KEY (id_courrier) REFERENCES sd_courrier(id),
    CONSTRAINT sd_imputation_service_fk FOREIGN KEY (id_service) REFERENCES sd_service(id)
);