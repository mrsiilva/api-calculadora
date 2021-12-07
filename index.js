const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const secretJwt = "teste123456";

app.use(cors());
//Inicializa o body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); //converte o corpo da requisição pra Json


function romanize(num) {
    var numerosRomanos = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},
    roman = '',
    i;
    for ( i in numerosRomanos ) {
      while ( num >= numerosRomanos[i] ) {
        roman += i;
        num -= numerosRomanos[i];
      }
    }
    return roman;
  }


function auth(req, res, next){
    const authToken = req.headers['authorization'];

    if(authToken != undefined){

        const bearer = authToken.split(' ');
        var token = bearer[1];

        jwt.verify(token, secretJwt, (err, data) => {
            if(err){
                res.json({err: "token invalido!"});
            } else {
                req.token = token;
                req.loggedUser = {id: data.id, email: data.email};
                next();
            }
        })

    } else {
        res.json({err: "token invalido!"});
    }
}

//banco de dados falso para criação de usuarios
var dataBase = {
    users: [
        {
            id: 1,
            nome: "Rúbia Silva",
            email: "mrsiilva2@gmail.com",
            senha: "batatinhafrita123"
        }, 
        {
            id: 2,
            nome: "Nicolas Cage",
            email: "nicolascage@gmail.com",
            senha: "nicolas123"

        }
    ]
}

//endpoint inicial
app.get("/calculadora", (req, res) => {

    const msgInicial = {
        mensagem: 'API de calculadora'
    };

    res.statusCode = 200; //indica que a requisição foi feita com sucesso
    res.json(msgInicial);

    return msgInicial;
});



//rota para criar usuario
app.post("/criausuario",(req, res) => { 
    var {nome, email, senha} = req.body;
    dataBase.users.push({
        id: 3,
        nome,
        email,
        senha
    });
    res.sendStatus(200);
})

//rota que dá acesso a todos os usuarios cadastrados
app.get("/calculadora/admin", (req, res) => {
    res.statusCode = 200;
    res.json({nome: req.nome, user: req.loggedUser, user: dataBase.users});
});


//SOMA
app.post("/calculadora/soma/", auth, (req, res) => {
    var {value1, value2} = req.body;
    
       const resultadoSoma = value1 + value2;
       res.json(
        [   
            {
             resultadoSomaInteiro : `${value1} + ${value2} = ${resultadoSoma}`
            }, 
            {
             resultadoSomaEmRomano : `${romanize(value1)} + ${romanize(value2)} = ${romanize(resultadoSoma)}`,
            }
        ]
        )
        return resultadoSoma;
});

//SUBTRACAO
app.post("/calculadora/subtracao/",auth, (req, res) => {
    var {value1, value2} = req.body;
    
       const resultadoSubtracao = value1 - value2;
       res.json(
        [   
            {
             resultadoSubtracaoInteiro : `${value1} - ${value2} = ${resultadoSubtracao}`
            }, 
            {
             resultadoSubtracaoEmRomano : `${romanize(value1)} - ${romanize(value2)} = ${romanize(resultadoSubtracao)}`,
            }
        ]
        )
        return resultadoSubtracao;

});


//AUTENTICAÇÃO
app.post("/auth", (req, res) => {
    var {email, senha} = req.body;
    if(email != undefined){

        var user = dataBase.users.find(u => u.email === email);

        if(user != undefined){

            if(user.senha === senha){

                jwt.sign({id:user.id , email: user.email }, secretJwt, {expiresIn: '72h'}, (err, token) => {
                    if(err){
                        res.status(400);
                        res.json({err:"Falha interna"});
                    } else {
                        res.status(200);
                        res.json({token: token});
                    }
                }) 
            } else {
                res.status(401);
                res.json({err: "Credenciais inválidas!"});
            }
        } else {
            res.status(404);
            res.json({err: "Email enviado não existe na base de dados!"});
        }
    } else {
        res.status(400);
        res.json({err: "Email invalido!"});
    }
})

app.listen(5000, () => {
    console.log("API rodando com sucesso!");
});
