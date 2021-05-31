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
