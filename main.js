const express = require("express");
const  { uuid }  = require('uuidv4');



const app = express();
const port = 5000;
app.use(express.json());



const articles = [
    {
    id: 1,
    title: 'How I learn coding?',
    description:
    'Lorem, Quam, mollitia.',
    author: 'Jouza',
    },
    {
    id: 2,
    title: 'Coding Best Practices',
    description:
    'Lorem, ipsum dolor sit, Quam, mollitia.',
    author: 'Besslan',
    },
    {
    id: 3,
    title: 'Debugging',
    description:
    'Lorem, Quam, mollitia.',
    author: 'Jouza',
    },
    ];

    const getAllArticles=   (req,res)=>{
        res.status(200)
        res.json(articles)
    }

  app.get("/articles",getAllArticles)

  /* _______________________ */

  const getArticlesByAuthor =  (req, res) => {
    // query parameters way: "/articles/search_1?author=Jouza"
    const author = req.query.author

    const arr = articles.filter((element,index)=>{

        return author === element.author
    })
    res.status(200)
    res.json(arr)

      }
app.get("/articles/search_1", getArticlesByAuthor);

  /*________________________ */

  const getAnArticleById = (req,res)=>{
    const id = req.query.id
    const found = articles.find((element,index) => {
        return element.id == id;
      });
    if (found) {
      console.log(found)
      res.status(200)
      res.json(found)
    }else{
      res.status(404)
      res.json("not found")
    }

}

app.get("/articles/search_2", getAnArticleById);

/*_________________________________ */
const createNewArticle =  (req,res)=>{
    const obj = {
        title: req.body.title,
        description:req.body.description,
        author: req.body.author,
        id : uuid(),
    }
    articles.push(obj)

    res.status(201)
    res.json(obj)
}
app.post("/articles",createNewArticle)
/*_________________________________ */
const updateAnArticleById = (req,res)=>{
    id =  req.params.id
    for (let i=0; i < articles.length ; i++){
        if (id == articles[i].id ){
            if (req.body.title&&req.body.description&&req.body.author){
                articles[i].title= req.body.title
                articles[i].description= req.body.description
                articles[i].author= req.body.author
                res.status(200)
                res.json(articles[i])
                return
            }
        }
    }
    res.status(404);
    res.json("not found");
}

app.put("/articles/:id",updateAnArticleById)
/*_________________________________ */
const deleteArticleById = (req,res)=>{
    const id =req.params.id
    for(let i=0 ; i<articles.length;i++){
        if(articles[i].id==id){
            articles[i].id=req.body.id
            articles.splice(i,1)[0]
            res.status(201)
            res.json({ success: true, massage: `Success Delete article with id => ${id}` });
            return
          }
    }
    res.status(404);
    res.json("not found");

}
app.delete("/articles/:id",deleteArticleById)
/*_________________________________ */

const deleteArticlesByAuthor = (req, res) => {
  const author = req.body.author;
  for (let i = 0; i < articles.length; i++) {
    if (author === articles[i].author) {
      articles.splice(i, 1);
      i = i - 1;
    }
  }
  const obj = {
    success: true,
    massage: `Success delete all the articles for the author => ${author}`,
  };
  res.json(obj);
};
app.delete("/articles", deleteArticlesByAuthor);






/*_________________________________ */
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
