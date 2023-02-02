//Nesse arquivo vamos usar o Handlebars com os outros NodeJS
//~Instale o handlebars na versão express -> npm install express-handlebars
const express = require('express');
const app = express();

const handlebars = require('express-handlebars') // crie uma constante que importe o módulo handlebars

//Precisamos definir agora qual template engine precisamos usar, já que existe inúmeras
app.engine('handlebars' , handlebars.engine({defaultLayout : 'main'}))
//Definindo a Engine do app express, e colocando como default layout o arquivo html main
//É Necessário criar uma pasta chamada VIEWS na raiz do projeto, e depois uma pasta dentro de views
// chamada layout, e depois crie o arquivo main.handlebars
app.set('view engine' , 'handlebars')
//-------------------------

//Vamos usar o bodyparser, para receber dados de qualquer formulário
// npm install body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extend: false}))
app.use(bodyParser.json())
//As configuraçoes para se usar bodyParser


//Banco de Dados------------------------------------------------------------------------------
const Sequelize = require('sequelize')

//em baixo, há a criação de um sequelize com os seguintes parâmetros : a database que será usada
// o nome do usuario da database, a senha, e em seguida um JSON, que terá informações do local onde está
// a database e também qual database usará -> tudo respectivamente
const sequelize = new Sequelize('teste' , 'gui' ,'guigui167' , {
    host: "localhost" ,
    dialect: "mysql"
} )
// Para ver se o servidor está funcionando, utilize esse método
sequelize.authenticate().then(
    ()=>{console.log("Conectado com Sucesso")}
).catch( (err)=>{
    console.log("Deu errado" + err)
})
//Estude mais sobre o .then e o .catch

///////////////---------------------------------------------------------------------------------

app.get('/cad' , (req , res )=> {
    //Vamos montar um Formulário HTML no main.handlebars para enviar informações
    //Para isso, crie outro arquivo handlebars, E NÃO precisa fazer toda a estrutra HTML5
    //Para renderizar o arquivo novo dentro do arquivo main.handlebars principal
    res.render('formulario')
    //Dessa forma, o handlebars irá renderizar o arquivo formulario
    //Perceba, estamos renderizando uma pág HTML5 na rota /cad,
    // http://localhost:8001/cad nesse local, teremos uma pág com o formulario em HTML
    // Criamos uma rota e colocamos o arquivo HTML através do get, mas só vamos obter as informações
    // dadas pelo formulario com OUTRA rota
})

app.post('/add' , (req , res)=>{
    req.body.conteudo  // o body vem do bodyparser, que serve para pegar dados do formulário
    // perceba que 'conteudo' é o 'name' do textarea do formulario.handlebars
    req.body.titulo // e esse é o 'name' do input 'titulo'
    // com isso podemos tratar esses dados diretamente aqui no javascript

    res.send('Formulário Recebido!');
    
}) // Uma das características da rota POST é que não conseguimos acessar essa rota post pela URL, diretamente
// só escrevendo lá, como o get.


//Como mandar dados do formulario para o banco de dados??

//Depois de ter lido os arquivos db e banco de dados, além dos outros arquivos js
// vamos aprender a como obter dados do formulário e colocar dentro do banco de dados
const Post = require('./Post')
app.post('/add' , (req , res) => {
    Post.create({ //Veja que Post , se não entendeu, foi importado do arquivo Post.js, que há uma função de banco de dados, lá é criado 
        // um banco de dados, com suas linhas titulo e conteudo, e aqui, criamos um novo dado com os dados retirados 
        titulo: req.body.titulo , // do formulario, através do body parser, com o req.body
        conteudo : req.body.conteudo
    })
})




app.listen(8001 , ()=>{

})