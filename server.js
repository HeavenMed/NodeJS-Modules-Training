const path = require('path')
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
// agora vamos fazer o servidor escutar essa porta para abri-lá e rodar nesse port
app.listen( port , ()=> {
    console.log(`Server Rodando na Porta ${port}`) // Há uma callback function (err)=>{}, mas é só para tratamento de erros , ok?
})
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
app.use(express.static(path.join(__dirname, "public")))