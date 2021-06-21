const express = require("express");
const app = express();
app.use(express.json());

//Permissões
var cors = require('cors');
const bodyParser = require("body-parser");
app.use(cors());

//Porta
app.listen(process.env.PORT || 3000);

// Introdução
app.get('/',
    (req,res) => {
        res.send("Atividade 7 - Backend - joão Victor Amâncio")
    }
);
myBooks = [ 
    {title: "Cristianismo Puro e Simples", author: "Clive Staples Lewis", originalYearOfPublication: 1952},
    {title: "Não Tenho Fé Suficiente Para Ser Ateu", author: "Norman L. Geisler and Frank Turek", originalYearOfPublication: 2004},
    {title: "Ciência e religião: Fundamentos para o diálogo", author: "Alister McGrath", originalYearOfPublication: 1999},
    {title: "A evolução e a queda: Implicações da ciência moderna para a teologia cristã", author:"James K. A. Smith and William T. Cavanaugh", originalYearOfPublication: 2017}
];
//Usando Get para obter o Array de Objects myBooks Completo
app.get('/books',
    (req,res) => {
        res.send(myBooks);
    }    
);
//Usando Get para obter as informações contidas no myBooks[id] com título, autor e publicação do livro
app.get('/books/:id',
    (req,res) => {
        const id = req.params.id - 1;
        const book = myBooks[id];
        if(!book){
            res.send("Livro não encontrado.");
        } else {
            res.send(myBooks[id]);
        }
    }
);
//Inserindo um livro com Post
app.post('/books',
    (req, res) => {
        console.log(req.body);
        myLivro = req.body;
        myBooks.push(myLivro);
        res.send("Livro inserido com sucesso.");
    }
);
//Alterando um livro com Put
app.put('/books/:id',
    (req, res) => {
        const id = req.params.id - 1;
        myLivro = req.body;
        myBooks[id] = myLivro;
        res.send("Livro atualizado com sucesso.");
    }
);
//Alterando um título específico com Put
app.put('/books/title/:id',
    (req, res) => {
        const id = req.params.id - 1;
        title = req.body.title;
        myBooks[id].title = title;
        res.send("Título alterado com sucesso.");
    }
);
//Deletando um livro com Delete
app.delete('/books/:id',
    (req,res) => {
        const id = req.params.id - 1;
        delete myBooks[id];
        res.send("Livro deletado com sucesso.");
    }
);
//Deletando um título específico com Delete
app.delete('/books/title/:id',
    (req,res) => {
        const id = req.params.id - 1;
        delete myBooks[id].title;
        res.send("Título deletado com sucesso");
    }
);
/*
jeadC7ibjecNsFKr

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:<password>@cluster0.estq0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/

// Utilizando MongoDB

const mongodb = require('mongodb')
const password = process.env.PASSWORD|| "Senha não enviada";
console.log(password);

const connectionString = `mongodb+srv://admin:${password}@cluster0.kwcyz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

(async()=>{
    const client = await mongodb.MongoClient.connect(connectionString, options);
    const db = client.db('myFirstDatabase');
    const books = db.collection('books');
    console.log(await books.find({}).toArray());


    app.get('/database',
    async function(req, res){
    res.send(await books.find({}).toArray());}
    );

    app.get('/database/:id',
        async function(req, res){
            const id = req.params.id;
            const books = await books.findOne(
                {_id: mongodb.ObjectID(id)}
            );
            console.log(books);
            if(!books){
                res.send("books não encontrado");
            } else {
                res.send(books);
            }
        }
    );

    app.post('/database',
        async (req, res) => {
            console.log(req.body);
            const books = req.body;

            delete books["_id"];

            books.insertOne(books);
            res.send("Livro criado");
        }
    );

    app.put('/database/:id',
        async (req, res) =>{
            const id = req.params.id;
            const books = req.body;

            console.log(books);

            delete books["_id"];

            const num_books = await books.countDocuments({_id : mongodb.ObjectID(id)});
            
            if (num_books !== 1) {
                res.send("Ocorreu um erro por conta do número de livros");
                return;
            }

            await books.updateOne({_id : mongodb.ObjectID(id)},
            {$set : books}
            );

            res.send("Livro atualizado com sucesso.")
        }
    );

    app.delete('/database/:id',
        async (req, res) => {
            const id = req.params.id;

            await books.deleteOne({_id : mongodb.ObjectID(id)});

            res.send("Livro removido com sucesso");
        }
    );
    
})();