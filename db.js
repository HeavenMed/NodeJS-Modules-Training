//É de bom costume criar um arquivo.js só para a database

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
//Estude mais sobre o .then e o .catch/

//Agora só exportar!
module.exports = {
    Sequelize : Sequelize,
    sequelize : sequelize
}
//
//Para importar em outro arquivo:
// const db = require('./db')

///////////////---------------------------------------------------------------------------------

// Crise outra pasta para usar as funções do sequelize!!! dica: crie uma pasta de models para isso
