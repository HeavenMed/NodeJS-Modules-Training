//Vamos criar uma tabela
CREATE DATABASE sistemadecadastro;
USE sistemadecadastro
CREATE TABLE usuarios(
    nome VARCHAR(50),
    email VARCHAR(100),
    id Int(1)
);

SHOW TABLES 
DESCRIBE usuarios

//Para colocar itens / dados dentro de uma tabela, use
INSERT INTO usuarios(nome , email, idade) VALUES (
    "guilherme medeiros" ,
    "guilhermebacaxi@hotmail",
    21
)

//Para listar / selecionar dados específicos
SELECT * FROM usuarios // selecione TODOS os dados da tabela usuario
//Para selecionar um usuário específico, USAR O WHERE
SELECT * FROM usuarios WHERE idade = 8;
//para atualizar algo de um usuario -> UPDATE
UPDATE usuarios SET nome = "novonome" , email = "novoemail"; // mas dessa forma todos os usuarios iriam ser alterados
// para alterar só de um usuário
UPDATE usuarios SET nome = 'novonome' WHERE nome = "nomeespecífico";