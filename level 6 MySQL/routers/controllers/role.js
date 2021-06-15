const db = require("../../db/db");
const createNewRole = (req, res) => {
const { role } = req.body;
const query =`INSERT INTO roles (role) VALUES (?)`;
const data =[role];
db.query(query,data,(err,result)=>{
if(err) throw err;
res.status(201).json(result);
}); 	

	
};

module.exports = {
	createNewRole,
};
