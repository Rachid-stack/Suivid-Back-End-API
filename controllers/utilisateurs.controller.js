const pool = require('../config/db');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const getUtilisateur = async (req, res) => {
    try{
        const items = await prisma.utilisateur.findMany({
            where: {
                del: false
            },
            include: {
                profil: true
            }
        });
        res.json(items);
    } catch (err){
        console.log(err.message);
    }  
};

const postUtilisateur = async (req, res) => {
    try{
        const {id_profil, id_service, matricule, nom, prenoms, login, passwd, email, telephone} = req.body;
        if(nom == null || prenoms == null || login == null || passwd == null || id_profil == null){
            res.status(400).json({ message: 'des informations sont manquantes', status: 400});
        }
        const cryptedPasswd = await bcrypt.hash(passwd, 10);
        const item = await prisma.utilisateur.create({
            data: {
                id_profil: id_profil,
                id_service: id_service,
                matricule: matricule,
                nom: nom,
                prenoms: prenoms,
                login: login,
                passwd: cryptedPasswd,
                email: email,
                telephone: telephone,
                created_on: new Date(),
                created_by: 1
            }
        });
        res.status(201).json(item);
    } catch (err){
        let statusCode = err.status || 500;
        return res.status(statusCode).json({ 
            error: "Une erreur est survenue", 
            message: err.message 
        });
    }  
};

const putUtilisateur = async (req, res) => {
    try {
        const {id_profil, id_service, matricule, nom, prenoms, login, passwd, email, telephone} = req.body;
        const { id } = req.params;
        if(nom == null || prenoms == null || login == null || id_profil == null){
            res.status(400).json({ message: 'des informations sont manquantes', status: 400});
        }
        //ON VÉRIFIE SI LA DONNEE EXISTE
        const user = await prisma.utilisateur.findUnique({
            where:{
                id : +id
            }
        });
        if(!user) throw { message: "Aucune donnée trouvée "};
        //Si le profil a changé
        if(user.id_profil !== id_profil){
            const item = await prisma.profil.update({
                where:{
                    id: +id_profil
                },
                data: {
                    utilisateurs:{
                        connect: {
                            id: +user.id
                        }
                    }
                }
            });
        }

        let cryptedPasswd = user.passwd; 

        if(passwd){
            cryptedPasswd =  await bcrypt.hash(passwd, 10);
        }
        
        const item = await prisma.profil.update({
            where: {
                id: +id_profil
            },
            data:{
                utilisateurs: {
                    update: {
                        where: {
                            id: +id
                        },
                        data:{
                            matricule: matricule,
                            nom: nom,
                            prenoms: prenoms,
                            login: login,
                            passwd: cryptedPasswd,
                            email: email,
                            telephone: telephone,
                            updated_on: new Date(),
                            updated_by: 1
                        }
                    }
                }
            }
        });
        res.status(200).json(item);
    } catch (err) {
        let statusCode = err.status || 500;
        return res.status(statusCode).json({ 
            error: "Une erreur est survenue", 
            message: err.message 
        });
    }
};

const deleteUtilisateur = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await prisma.filiere.update({
            where: {
                id: +id
            },
            data:{
                del: true,
                updated_by: 1,
                updated_on: new Date()
            }
        });
        res.json(item);
    } catch (err) {
        let statusCode = err.status || 500;
        return res.status(statusCode).json({ 
            error: "Une erreur est survenue", 
            message: err.message 
        });
    }
};  


module.exports = {
    getUtilisateur,
    postUtilisateur,
    putUtilisateur,
    deleteUtilisateur
}