const db = require('./db')
const Post = db.sequelize.define('postagens' , {
    titulo: {
        type: db.Sequelize.STRING
    },
    conteudo: {
        type: db.Sequelize.TEXT
    }

})// cria uma tabela postagens com duas linhas, titulo e conteudo

Post.sync({force:true })//Depos de usar uma vez, tome cuidado, pois sempre ao executar ele criará uma nova
//tabela com os dados acima, só execute uma vez e apague

//vamos exportar o post
module.exports = Post