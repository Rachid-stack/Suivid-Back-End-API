CREATE TABLE sd_profil(
	id SERIAL PRIMARY KEY,
	code CHARACTER VARYING (10),
	libelle CHARACTER VARYING (100),
    created_on TIMESTAMP WITHOUT TIME ZONE,
    created_by INTEGER ,
    updated_on TIMESTAMP WITHOUT TIME ZONE,
    updated_by INTEGER ,
    del BOOLEAN DEFAULT FALSE
);

CREATE TABLE sd_utilisateur(
    id SERIAL PRIMARY KEY,
    id_profil INTEGER,
    id_service INTEGER,
	matricule CHARACTER VARYING (20),
    nom CHARACTER VARYING (150),
    prenoms CHARACTER VARYING (150),
	login CHARACTER VARYING (150),
	passwd CHARACTER VARYING (150),
	email CHARACTER VARYING (150),
    telephone CHARACTER VARYING (20),
    created_on TIMESTAMP WITHOUT TIME ZONE,
    created_by INTEGER ,
    updated_on TIMESTAMP WITHOUT TIME ZONE,
    updated_by INTEGER ,
    del BOOLEAN DEFAULT FALSE
);

CREATE TABLE sd_service(
    id SERIAL PRIMARY KEY,
    id_service_parent INTEGER,
    code CHARACTER VARYING (10),
	libelle CHARACTER VARYING (100),
    created_on TIMESTAMP WITHOUT TIME ZONE,
    created_by INTEGER ,
    updated_on TIMESTAMP WITHOUT TIME ZONE,
    updated_by INTEGER ,
    del BOOLEAN DEFAULT FALSE
);

CREATE TABLE sd_categorie_courrier(
    id SERIAL PRIMARY KEY,
    code CHARACTER VARYING (10),
	libelle CHARACTER VARYING (100),
    created_on TIMESTAMP WITHOUT TIME ZONE,
    created_by INTEGER ,
    updated_on TIMESTAMP WITHOUT TIME ZONE,
    updated_by INTEGER ,
    del BOOLEAN DEFAULT FALSE
);

CREATE TABLE sd_type_courrier(
    id SERIAL PRIMARY KEY,
    code CHARACTER VARYING (10),
	libelle CHARACTER VARYING (100),
    created_on TIMESTAMP WITHOUT TIME ZONE,
    created_by INTEGER ,
    updated_on TIMESTAMP WITHOUT TIME ZONE,
    updated_by INTEGER ,
    del BOOLEAN DEFAULT FALSE
);

CREATE TABLE sd_registre_courrier(
    id SERIAL PRIMARY KEY,
    code CHARACTER VARYING (10),
	libelle CHARACTER VARYING (100),
    created_on TIMESTAMP WITHOUT TIME ZONE,
    created_by INTEGER ,
    updated_on TIMESTAMP WITHOUT TIME ZONE,
    updated_by INTEGER ,
    del BOOLEAN DEFAULT FALSE
);

CREATE TABLE sd_correspondant_courrier(
    id SERIAL PRIMARY KEY,
    id_type_correspondant INTEGER,
    nom CHARACTER VARYING (150),
    prenoms CHARACTER VARYING (150),
    adresse TEXT,
	ville CHARACTER VARYING (100),
    created_on TIMESTAMP WITHOUT TIME ZONE,
    created_by INTEGER ,
    updated_on TIMESTAMP WITHOUT TIME ZONE,
    updated_by INTEGER ,
    del BOOLEAN DEFAULT FALSE
);

CREATE TABLE sd_type_correspondant(
    id SERIAL PRIMARY KEY,
    code CHARACTER VARYING (10),
	libelle CHARACTER VARYING (100),
    created_on TIMESTAMP WITHOUT TIME ZONE,
    created_by INTEGER ,
    updated_on TIMESTAMP WITHOUT TIME ZONE,
    updated_by INTEGER ,
    del BOOLEAN DEFAULT FALSE
);

CREATE TABLE sd_document(
    id SERIAL PRIMARY KEY,
    id_courrier INTEGER,
    id_dossier INTEGER,
    titre CHARACTER VARYING (100),
    description TEXT,
    fichier CHARACTER VARYING (150),
    created_on TIMESTAMP WITHOUT TIME ZONE,
    created_by INTEGER,
    updated_on TIMESTAMP WITHOUT TIME ZONE,
    updated_by INTEGER,
    del BOOLEAN DEFAULT FALSE
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
    del BOOLEAN DEFAULT FALSE
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
    PRIMARY KEY (id_courrier, id_service)
);

CREATE TABLE sd_diffusion_courrier(
    id_courrier INTEGER,
    id_service INTEGER,
    date_diffusion TIMESTAMP WITHOUT TIME ZONE,
    commentaire TEXT,
    created_on TIMESTAMP WITHOUT TIME ZONE,
    created_by INTEGER,
    updated_on TIMESTAMP WITHOUT TIME ZONE,
    updated_by INTEGER,
    PRIMARY KEY (id_courrier, id_service)
);






