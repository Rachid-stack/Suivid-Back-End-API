const pool = require('../config/db');

const getCorrespondantCourrier = async (req, res) => {
    try{
        let sql = "SELECT * FROM sd_correspondant_courrier WHERE del=false";
        const items = await pool.query(sql);
        res.json(items.rows);
    } catch (err){
        console.log(err.message);
    }  
};

const postCorrespondantCourrier = async (req, res) => {
    try{
        const param = req.body;
        const now = Date.now() / 1000.0;
        const items = await pool.query(
            "INSERT INTO sd_correspondant_courrier(id_type_correspondant, nom, prenoms, adresse, ville, created_on, created_by) VALUES ($1, $2, $3, $4, $5, to_timestamp($6), $7) RETURNING *",
            [param.id_type_correspondant, param.nom, param.prenoms, param.adresse, param.ville, now, 1]
        );
        res.json(items.rows);
    } catch (err){
        console.log(err.message);
    }  
};

const putCorrespondantCourrier = async (req, res) => {
    try {
        const { id } = req.params;
        const param = req.body;
        const now = Date.now() / 1000.0;
        const item = await pool.query(
            "UPDATE sd_correspondant_courrier SET id_type_correspondant=$1, nom=$2, prenoms=$3, adresse=$4, ville=$5, updated_on=to_timestamp($6), updated_by=$7 WHERE id=$8",
            [param.id_type_correspondant, param.nom, param.prenoms, param.adresse, param.ville, now, 1, id]
        );
        res.json("Modification effectuée");
    } catch (err) {
        console.log(err.message);
    }
};

const deleteCorrespondantCourrier = async (req, res) => {
    try {
        const { id } = req.params;
        const param = req.body;
        const now = Date.now() / 1000.0;
        const item = await pool.query(
            "UPDATE sd_correspondant_courrier SET del=true, updated_on=to_timestamp($1), updated_by=$2 WHERE id=$3",
            [now, 1, id]
        );
        res.json("Supression effectuée");
    } catch (err) {
        console.log(err.message);
    }
};  


module.exports = {
    getCorrespondantCourrier,
    postCorrespondantCourrier,
    putCorrespondantCourrier,
    deleteCorrespondantCourrier
}