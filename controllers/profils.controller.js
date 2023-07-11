const pool = require('../config/db');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getProfil = async (req, res) => {
    try{
        const items = await prisma.profil.findMany({
            where: {
                del: false
            }
        });
        res.json(items);
    } catch (err){
        console.log(err.message);
    }  
};

const postProfil = async (req, res) => {
    try{
        const { code, libelle } = req.body;
        const item = await prisma.profil.create({
            data: {
                code: code,
                libelle: libelle,
                created_on: new Date(),
                created_by: 1
            }
        });
        res.json(item);
    } catch (err){
        console.log(err.message);
    }  
};

const putProfil = async (req, res) => {
    try {
        const { id } = req.params;
        const { code, libelle } = req.body;
        //On recherche l'élément à modifier
        //on vérifie s'il existe
        const elt = await prisma.profil.findUnique({
            where: {
                id: +id
            }
        });
        //S'il n'existe pas dans la BD on génère une exception
        if(!elt) throw { message: "Aucune donnée trouvée !"}
        //On applique le UPDATE
        const item = await prisma.profil.update({
            where: {
                id: +id
            },
            data:{
                code: code,
                libelle: libelle,
                updated_on: new Date(),
                updated_by: 1
            }
        });
        res.json(item);
    } catch (err) {
        return res.status(500).json({ 
            error: "Une erreur s'est produite", 
            message: err.message 
        });
    }
};

const deleteProfil = async (req, res) => {
    try {
        const { id } = req.params;
        const elt = await prisma.profil.findUnique({
            where: {
                id: +id
            }
        });
        if(!elt) throw { message: "Aucune donnée trouvée !"}
        const item = await prisma.profil.update({
            where: {
                id: +id
            },
            data:{
                del: true
            }
        });
        res.json(item);
    } catch (err) {
        return res.status(500).json({ 
            error: "Une erreur s'est produite", 
            message: err.message 
        });
    }
};  

module.exports = {
    getProfil,
    postProfil,
    putProfil,
    deleteProfil
}