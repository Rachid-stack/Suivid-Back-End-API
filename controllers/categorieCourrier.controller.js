const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getCategorieCourrier = async (req, res) => {
    try{
        //on compte le nombre d'éléments
        const nb = await prisma.categorieCourrier.count({
            where:{
                del: false
            }
        });
        //Gestion de la pagination et du filtrage
        first = (req.query.first) ? req.query.first : 0;
        rows = (req.query.rows) ? req.query.rows : nb;
        filters = (req.query.filters) ? req.query.filters : '';

        const items = await prisma.categorieCourrier.findMany({
            skip: +first,
            take: +rows,
            where:{
                del: false,
                OR: [
                        {
                            code:{
                                contains: filters,
                                mode: 'insensitive'
                            }
                        },
                        {
                            libelle:{
                                contains: filters,
                                mode: 'insensitive'
                            }
                        }
                ]
            },
            orderBy:{
                created_on: 'desc'
            }
        });
        //on formate les données
        let resultats = {
            total: nb,
            items: items
        }
        res.status(200).json(resultats);
    } catch (err){
        let statusCode = err.status || 500;
        return res.status(statusCode).json({ 
            error: "Une erreur est survenue", 
            message: err.message 
        });
    }  
};

const postCategorieCourrier = async (req, res) => {
    try{
        const { code, libelle } = req.body;
        const item = await prisma.categorieCourrier.create({
           data:{
               code: code,
               libelle: libelle,
               created_on: new Date(),
               created_by: 1
           }
        });
        res.status(201).json(item);
    } catch (err){
        return res.status(500).json({ 
            error: "Une erreur est survenue", 
            message: err.message 
        });
    }  
};

const putCategorieCourrier = async (req, res) => {
    try {
        const { id } = req.params;
        const { code, libelle } = req.body;
        const item = await prisma.categorieCourrier.update({
            where:{
                id: +id
            },
            data:{
                code: code,
                libelle: libelle,
                updated_by: 1,
                updated_on: new Date()
            }
        });
        res.status(200).json(item);
    } catch (err) {
        return res.status(500).json({ 
            error: "Une erreur est survenue", 
            message: err.message 
        }); 
    }
};

const deleteCategorieCourrier = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await prisma.categorieCourrier.update({
            where:{
                id: +id
            },
            data:{
                updated_by: 1,
                updated_on: new Date(),
                del: true
            }
        });
        res.status(200).json(item);
    } catch (err) {
        return res.status(500).json({ 
            error: "Une erreur est survenue", 
            message: err.message 
        }); 
    }
};

module.exports = {
    getCategorieCourrier,
    postCategorieCourrier,
    putCategorieCourrier,
    deleteCategorieCourrier
}