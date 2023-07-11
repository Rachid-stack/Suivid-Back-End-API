const pool = require('../config/db');

const getRegistreCourrier = async (req, res) => {
    try{
        let sql = "SELECT * FROM sd_registre_courrier WHERE del=false";
        const items = await pool.query(sql);
        res.json(items.rows);
    } catch (err){
        console.log(err.message);
    }  
};

const postRegistreCourrier = async (req, res) => {
    try{
        const param = req.body;
        const now = Date.now() / 1000.0;
        const items = await pool.query(
            "INSERT INTO sd_registre_courrier(code, libelle, created_on, created_by) VALUES ($1, $2, to_timestamp($3), $4) RETURNING *",
            [param.code, param.libelle, now, 1]
        );
        res.json(items.rows);
    } catch (err){
        console.log(err.message);
    }  
};

const putRegistreCourrier = async (req, res) => {
    try {
        const { id } = req.params;
        const param = req.body;
        const now = Date.now() / 1000.0;
        const item = await pool.query(
            "UPDATE sd_registre_courrier SET code=$1, libelle=$2, updated_on=to_timestamp($3), updated_by=$4 WHERE id=$5",
            [param.code, param.libelle, now, 1, id]
        );
        res.json("Modification effectuée");
    } catch (err) {
        console.log(err.message);
    }
};

const deleteRegistreCourrier = async (req, res) => {
    try {
        const { id } = req.params;
        const param = req.body;
        const now = Date.now() / 1000.0;
        const item = await pool.query(
            "UPDATE sd_registre_courrier SET del=true, updated_on=to_timestamp($1), updated_by=$2 WHERE id=$3",
            [now, 1, id]
        );
        res.json("Supression effectuée");
    } catch (err) {
        console.log(err.message);
    }
};  


module.exports = {
    getRegistreCourrier,
    postRegistreCourrier,
    putRegistreCourrier,
    deleteRegistreCourrier
}