const db = require("../../db/db");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const SECRET = "loay"


const login = (req, res) => {
const { email, password } = req.body;
const query =`SELECT * FROM userS WHERE email=?`
const date =[email];
let hashedPassword;
db.query(query,date,async(err,result)=>{
	if(err){
		res.send(err)
	}
	if(!result.length){
		res.status(404).json("the email is wrong")
		return
	}

	const verify =await  bcrypt.compare(password, result[0].password)
	if(!verify){
		res.status(403).json("password is wrong")
	}
	const payload = {
		userId: result[0].id,
		role: result[0].role_id
	  };
	 const  options =  { expiresIn: '60m' }
	 const token =jwt.sign(payload, SECRET, options)
     res.status(200).json({token})


})

	
};

module.exports = {
	login,
};
