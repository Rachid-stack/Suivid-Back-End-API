const pool = require('../config/db');

const getImputationCourrier = async (req, res) => {
    try{
        let sql = "SELECT * FROM sd_imputation_courrier WHERE del=false";
        const items = await pool.query(sql);
        res.json(items.rows);
    } catch (err){
        console.log(err.message);
    }  
};

const postImputationCourrier = async (req, res) => {
    try{
        const param = req.body;
        const now = Date.now() / 1000.0;
        const items = await pool.query(
            "INSERT INTO sd_imputation_courrier(date_imputation, commentaire, created_on, created_by) VALUES ($1, $2, to_timestamp($3), $4) RETURNING *",
            [param.date_imputation, param.commentaire, now, 1]
        );
        res.json(items.rows);
    } catch (err){
        console.log(err.message);
    }  
};

const putImputationCourrier = async (req, res) => {
    try {
        const { id } = req.params;
        const param = req.body;
        const now = Date.now() / 1000.0;
        const item = await pool.query(
            "UPDATE sd_imputation_courrier SET date_imputation=$1, commentaire=$2, updated_on=to_timestamp($3), updated_by=$4 WHERE id=$5",
            [param.diffusion_imputation, param.date_diffusion, now, 1, id]
        );
        res.json("Modification effectuée");
    } catch (err) {
        console.log(err.message);
    }
};

const deleteImputationCourrier = async (req, res) => {
    try {
        const { id } = req.params;
        const param = req.body;
        const now = Date.now() / 1000.0;
        const item = await pool.query(
            "UPDATE sd_imputation_courrier SET del=true, updated_on=to_timestamp($1), updated_by=$2 WHERE id=$3",
            [now, 1, id]
        );
        res.json("Supression effectuée");
    } catch (err) {
        console.log(err.message);
    }
};  


module.exports = {
    getImputationCourrier,
    postImputationCourrier,
    putImputationCourrier,
    deleteImputationCourrier
}