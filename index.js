//
const express = require("express");
const app = express();
app.use(express.json());

// Permissões
var cors = require('cors');
app.use(cors());

// Porta que eu estou ouvindo
app.listen(process.env.PORT || 3000);

app.get('/', 
    function (req, res){    
        res.send("Hello World");
    }
);

app.get('/hello',
function (req, res){    
    res.send("Hello de Novo");
    }
)
const myBooks = [ 
    {title: "Cristianismo Puro e Simples", author: "Clive Staples Lewis", originalYearOfPublication: 1952},
    {title: "Não Tenho Fé Suficiente Para Ser Ateu", author: "Norman L. Geisler and Frank Turek", originalYearOfPublication: 2004},
    {title: "Ciência e religião: Fundamentos para o diálogo", author: "Alister McGrath", originalYearOfPublication: 1999},
    {title: "A evolução e a queda: Implicações da ciência moderna para a teologia cristã", author:"James K. A. Smith and William T. Cavanaugh", originalYearOfPublication: 2017}
];

app.get('/mensagens',
    function(req, res){
        // res.send(mensagens);
        res.send(mensagens.filter(Boolean));
    }
);

app.get('/mensagens/:id',
    function(req, res){
        const id = req.params.id - 1;
        const myBooks = mensagens[id];

        if (!myBooks){
            res.send("Mensagem não encontrada");
        } else {
            res.send(myBooks);
        }
    }
)

app.post('/mensagens', 
    (req, res) => {
        console.log(req.body.myBooks);
        const myBooks = req.body.myBooks;
        mensagens.push(myBooks);
        res.send("criar uma mensagem.")
    }
);

app.put('/mensagens/:id',
    (req, res) => {
        const id = req.params.id - 1;
        const myBooks = req.body.myBooks;
        mensagens[id] = myBooks;        
        res.send("Mensagem atualizada com sucesso.")
    }
)

app.delete('/mensagens/:id', 
    (req, res) => {
        const id = req.params.id - 1;
        delete mensagens[id];

        res.send("Mensagem removida com sucesso");
    }
);