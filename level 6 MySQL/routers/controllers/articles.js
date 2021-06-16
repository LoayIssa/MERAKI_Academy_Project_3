const db = require("../../db/db");

const getAllArticles = (req, res) => {
	const query=`SELECT * FROM articles WHERE is_deleted=0 `;
	db.query(query,(err,result)=>{
		if(err) throw err;
		res.status(200).json(result)
	});

	
};

const getArticlesByAuthor = (req, res) => {
	const author_id = req.query.author_id;
	const query = `SELECT * FROM articles WHERE author_id=? AND is_deleted =0;`;
	const data = [author_id];
	console.log("author_id",author_id);
	db.query(query,data,(err,result)=>{
		if(err) throw err;
		res.status(200).json(result)
		console.log("result",result);
	});

	
};

const getAnArticleById = (req, res) => {
  const id = req.params.id;
  const query = `SELECT  articles.id ,users.firstName FROM articles INNER JOIN users ON articles.author_id= users.id WHERE  articles.id=? AND articles.is_deleted=0`  ;
  const data = [id];
  db.query(query, data, (err, result) => {
    if (err) {
      res.send(err)
    }
    res.status(200).json(result);
  });
	
};

const createNewArticle = (req, res) => {
	const { title, description, author_id } = req.body;
    const query =`INSERT INTO articles (title, description, author_id) VALUES (?,?,?)  `;
	const data =[title, description, author_id];
	db.query(query,data,(err,result)=>{
	if(err) throw err
		res.status(201).json(result)
		
	})
	
};

const updateAnArticleById = (req, res) => {
	const { title, description, author_id } = req.body;
	const query =`UPDATE articles SET title=? , description=? , author_id=?  WHERE id = ?  `
	const data =[title, description, author_id,req.params.id];
	db.query(query,data,(err,result)=>{
		if(err) throw err;
		res.status(200).json(result)


	})
 

	
};

const deleteArticleById = (req, res) => {
	 const id = req.params.id;
	const { title, description, author_id } = req.body;
	const query =`DELETE FROM articles  WHERE id = ?  `
	const data =[ id  ];
	db.query(query,data,(err,result)=>{
		if(err) throw err;
		res.status(200).json(result)


	})
};

const deleteArticlesByAuthor = (req, res) => {
	const author_id = req.body.author_id;
	const query =`DELETE FROM articles  WHERE author_id = ?  `
	const data =[ author_id ];
	db.query(query,data,(err,result)=>{
		if(err) throw err;
		res.status(200).json(result)


	})
};

module.exports = {
	getAllArticles,
	getArticlesByAuthor,
	getAnArticleById,
	createNewArticle,
	updateAnArticleById,
	deleteArticleById,
	deleteArticlesByAuthor,
};
