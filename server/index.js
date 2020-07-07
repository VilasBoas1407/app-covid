const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');
//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);
//inicia o servidor
app.listen(port);
console.log('API funcionando!');
// cria conexão com o banco de dados
function execSQLQuery(sqlQry, res){
  const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : 'rootqwer4321',
    database : 'dt_stopcovid'
  });

  connection.query(sqlQry, function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
      connection.end();
      console.log('executou!');
  });
}
// retorna os tb sintomas
router.get('/sintomas', (req, res) =>{
    execSQLQuery('SELECT * FROM tb_sintomas', res);
})
//retornta usuarios
router.get('/usuarios', (req, res) =>{
    execSQLQuery('SELECT id_usuario, ds_nome,ds_cpf,id_emp,ds_email,dt_cadastro  FROM tb_usuario', res);
})
//retornta empresas
router.get('/empresas', (req, res) =>{
    execSQLQuery('SELECT id_emp, ds_nome,ds_cnpj,ds_email,dt_cadastro FROM tb_empresa', res);
})
//retorna acompanhamento 
router.get('/acompanhamento', (req, res) =>{
    execSQLQuery('SELECT * FROM tb_acompanhamento', res);
})
// pesquisa usuario especifico
router.get('/usuario/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE id_usuario=' + parseInt(req.params.id);
    execSQLQuery('SELECT id_usuario, ds_nome,ds_cpf,id_emp,ds_email,dt_cadastro  FROM tb_usuario' + filter, res);
})
// pesquisa empresa especifico
router.get('/empresa/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE id_emp=' + parseInt(req.params.id);
    execSQLQuery('SELECT id_emp, ds_nome,ds_cnpj,ds_email,dt_cadastro, ds_telefone  FROM tb_empresa' + filter, res);
})
// adiciona usuario
router.post('/usuarios', (req, res) =>{
    const nome = req.body.nome.substring(0,100);
    const cpf = req.body.cpf.substring(0,11);
    const idEmp = req.body.idEmp.substring(0,5);
    const email = req.body.email.substring(0,100);
    const senha = req.body.senha.substring(0,100);
    const telefone = req.body.telefone.substring(0,100);
    execSQLQuery(`INSERT INTO tb_usuario(ds_nome, ds_cpf, id_emp, ds_email, ds_senha, ds_telefone) VALUES('${nome}','${cpf}','${idEmp}','${email}','${senha}','${telefone}')`, res);
});
// adiciona empresa
router.post('/empresas', (req, res) =>{
    const nome = req.body.nome.substring(0,100);
    const cnpj = req.body.cnpj.substring(0,14);
    const email = req.body.email.substring(0,100);
    const senha = req.body.senha.substring(0,100);
    const telefone = req.body.telefone.substring(0,100);
    execSQLQuery(`INSERT INTO tb_empresa(ds_nome, ds_cnpj, ds_email, ds_senha, ds_telefone) VALUES('${nome}','${cnpj}','${email}','${senha}','${telefone}')`, res);
});
//adiciona acompanhamento
router.post('/acompanhamento', (req, res) =>{
    const idUsuario = req.body.idUsuario.substring(0,255);
    const sintoma = req.body.sintoma.substring(0,100);
   
    execSQLQuery(`INSERT INTO tb_acompanhamento(id_usuario,id_sintoma ) VALUES('${idUsuario}','${sintoma}')`, res);
});
//atualiza usuario
router.patch('/usuario/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const nome = req.body.nome.substring(0,100);
    const cpf = req.body.cpf.substring(0,11);
    const idEmp = req.body.idEmp.substring(0,5);
    const email = req.body.email.substring(0,100);
    const senha = req.body.senha.substring(0,100);
    execSQLQuery(`UPDATE tb_usuario SET ds_nome='${nome}', ds_senha='${senha}',ds_cpf='${cpf}',id_emp='${idEmp}', ds_email='${email}' WHERE id_usuario=${id}`, res);
})
//atualiza empresa
router.patch('/empresa/:idEmp', (req, res) =>{
    const idEmp = parseInt(req.params.idEmp);
    const nome = req.body.nome.substring(0,5);
    const cnpj = req.body.cnpj.substring(0,11);
    const email = req.body.email.substring(0,100);
    const senha = req.body.senha.substring(0,100);
    execSQLQuery(`UPDATE tb_empresa SET ds_nome='${nome}', ds_senha='${senha}',ds_cnpj='${cnpj}', ds_email ='${email}' WHERE id_emp=${idEmp}`, res);
})
// retorna sintomas dos usuarios de uma empresa
router.get('/acompanhamentoEmp/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE tb_usuario.id_emp=' + parseInt(req.params.id);
    execSQLQuery(`select tb_usuario.ds_nome, tb_usuario.ds_telefone, tb_acompanhamento.id_sintoma from tb_usuario
    inner join tb_acompanhamento on tb_usuario.id_usuario = tb_acompanhamento.id_usuario` + filter, res);
})
// retorna sintomas de um usuario especifico
router.get('/acompanhamento/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE tb_acompanhamento.id_usuario=' + parseInt(req.params.id);
    execSQLQuery(`select tb_usuario.ds_nome, tb_usuario.ds_telefone, tb_acompanhamento.id_sintoma from tb_usuario
    inner join tb_acompanhamento on tb_usuario.id_usuario = tb_acompanhamento.id_usuario` + filter, res);
})
// retorna sintomas de um usuario especifico
router.get('/sintoma/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE id_sintoma=' + parseInt(req.params.id);
    execSQLQuery(`select ds_sintoma from tb_sintomas ` + filter, res);
})