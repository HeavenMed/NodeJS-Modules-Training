const path = require('path') // apenas importando um módulo - ignore por enquanto
// npm install -g nodemon -> Instale o nodemon também!
// para usar o nodemon, escreva no terminal -> nodemon nomearquivo.js


// A primeira coisa que deve ser feita é iniciar o projeto Node com o _npm init_ para criar o pacote de módulos
// a Seguir vamos importar o módulo ExpressJS do nodeJS através do npm
// Para isso, use : npm install express
// Excelente , agora vamos importar o módulo express com o require() e atribuir uma constante a ela
const express = require('express')
// Agora você possui todo o framework dentro da função express(), vamos transmitir esse framework
// para uma constante menor para facilitar as chamadas
const app = express()
// vamos definir uma porta ( port ) para rodar nosso servidor
const port = 3002
// agora vamos fazer o servidor escutar essa porta para abri-lá e rodar nesse port -> LEMBRANDO QUE ESSA APP.LISTEN PRECISA FICAR POR ÚLTIMO NA APLICAÇÃO! aqui só estará no início por finalidade de ensinar
//app.listen( port , ()=> {
//    console.log(`Server Rodando na Porta ${port}`) // Há uma callback function (err)=>{}, mas é só para tratamento de erros , ok?
//})
// Experimente dar node _nomedoarquivo.js_ -> Você verá a mensagem do console.log acima
//Para conseguirmos dar Hello world , vamos criar uma ROTA, com app.method(path, handler)
// `app` é uma instância do `express`.
//-   `METHOD` é um [método de solicitação HTTP](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol).
//-Ver mais sobre [[Método de solicitação HTTP]]
//-   `PATH` é um caminho no servidor.
//-   `HANDLER` é a função executada quando a rota é correspondida.
app.get ( '/'  , (req , res )=> {
    res.send("Hello World!") // Perceba que estamos usando o objeto http response (res) para responder um método de solicitação GET HTTP
})
//Podemos adicionar uma pasta inteira para usar com as rotas, exemplo, crie um document HTML com nome main e coloque dentro de uma pasta public, assim como todos os outros arquivos estáticos
// vamos adicionar toda a pasta , para a instância express app usar esse express estático ( html)
app.use(express.static(path.join(__dirname, "public"))) // o path é necessário importar , se não, não funcionará

// para criar caminhos ( rotas ) para sua aplicação, use o método app.method, criaremos 2 rotas
app.get('/sobre' , (req , res) => {
    res.send("Sobre")  // http://localhost:3002/sobre quando você acessar isso, com o server ligado, você entrará numa página em branco escrito "sobre", veja, vc criou uma ROTA o app.get
})

app.get('/blog' , (req , res)=>{
    res.send("Bem vindo ao meu blog")

})


//Como Usars rotas dinâmicas e Parâmetros!
app.get("/ola/:nome", (req,res)=>{   //Quando colocamos :palavra do lado da rota, é criado um parâmetro, no qual o usuário pode colocar algum dado a ser tratado
    res.send(req.params) // Quando você iniciar o servidor, aparecerá com resultado um Objeto {"nome" : "parametro"}
}) // ao colocar no site  http://localhost:3002/ola/seunome o servidor irá colocar essa informação, o seu nome,
// e enviará de volta como parâmetro , quando o usurário coloca o seu nome ao lado do /ola, ele está enviando
// dados ao nosso servidor node, e podemos fazer essa requisição desses dados com o req, mais precisamente dos
//parâmetros com o req.params
//Podemos especificar o parâmetro a ser retornado, por exemplo, apenas uma cor
app.get("/corfav/:cor" , (req, res)=> {
    res.send("Sua cor favorita é" + req.params.cor)
    //Você também pode enviar html inteiros
    //res.send("<h1> SUA COR FAVORITA É" + req.params.cor) + "</h1>" -> SÓ É POSSÍVEL USAR O SEND UMA VEZ POR ROTA!
})



app.listen( port , ()=> {
    console.log(`Server Rodando na Porta ${port}`) // Há uma callback function (err)=>{}, mas é só para tratamento de erros , ok?
})


//Como renderizar arquivos HTML?
//Crise uma rota
app.get('/' , (req ,res )=> {
    res.sendFile(__dirname + "/public/teste1.html") // Irá mandar um arquivo html para a porta / + teste1.html 
    // bem aqui -> http://localhost:3002/teste1.html
})

//Vamos também utilizar outro módulo importante para nos conectar com banco de dados, o Sequelize , com o banco
//MySQL -> para baixar -> npm install --save sequelize
//Mas para usar precisamente com o MySQL, é necessário baixar um módulo específico do Sequelize
// esse módulo extra é o npm install --save mysql2
// Sequelize é um ORM, que abstrai todo o conteúdo de banco de dados para ser usado aqui

//Como se conectar a um banco de dados utilizando o Sequelize??
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

//Vamos criar um model para postagens e para usuários
// o sequelize.define tem parâmetros : nome e um JSON objeto que constitui suas informações
const Postagem = sequelize.define('postagens' , {
    titulo : {
        type: Sequelize.STRING ,  //esse possui um limite de caracteres
    },
    conteudo: {
        type: Sequelize.TEXT   // esse não tem um limite de caracteres
    }
})
// esses dois campos criados são LINHAS (ROWS) da TABELA criada!


Postagem.sync({force: true}) // Para gerar a tabela, e o force serve para ter mais certeza da sua geração
// se você rodar o arquivo , verá isso: 
//Executing (default): CREATE TABLE IF NOT EXISTS `postagens` (`id` INTEGER NOT NULL auto_increment , `titulo` VARCHAR(255), `conteudo` TEXT, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

// vamos criar outra tabela com duas linhas, idade e nome
const Usuario = sequelize.define('usuarios' , {
    nome: {
        type: Sequelize.STRING
    },

    idade: { 
        type : Sequelize.INTEGER
    }, 
})

Usuario.sync({force: true})


//Como inserir DADOS nas tabelas criadas??

Postagem.create({
    titulo : "NOVO TITULO" ,
    conteudo: "QUALQUER COISA"
})