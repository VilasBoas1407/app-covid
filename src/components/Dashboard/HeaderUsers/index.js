import React, { useState } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PopUp from '../../DialogPopUp/index'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import Divider from '@material-ui/core/Divider';

import './styles.css';

import api from '../../../services/api'

export default function THeaderUser(props){


  const[open,setOpen] = useState(false);
  const[openRelatorio,setOpenRelatorio] = useState(false);
  const [userPopUp , setUser] = useState()
  const [userName , setName] = useState('Nome:')
  const [userData,setUserData] = useState({
    nome_empresa : ''
  });
  const data =  new Date().toLocaleDateString();


  const { rows, filterData } = props

  async function getPopData(id){
    
    const token = await localStorage.getItem("token");
    
    if(filterData != null){


      const data = await filterData.filter((u) => {
        return u.id_usuario = id
      });

      setUser(data);
    }
    else{

      api.request({
        method: 'GET',
          url: `/followup`,
          params:{
            'tb_acompanhamento.id_usuario': id
          },
          headers:{
            'x-access-token': token,
          },
          
        }).then(async function(response){
          setUser(response.data.userData)
  
        }).catch(function(err){        
        });
    }

  
  }
  
  function openModal(){
    setOpen(true);
  }
    
  function handleClose(){
    setOpen(false);
  }

  async function handlePDFOpen(user){
    
    const EmpData = await JSON.parse(localStorage.getItem("userData"));
  
    let userData = {};
    
    userData.nome = user[2];
    userData.cpf = user[3];
    userData.email = user[4];
    userData.data_cadastro = new Date(user[5]).toLocaleString();
    userData.telefone = user[6];
    
    userData.nome_empresa = EmpData.ds_nome;
    userData.telefone_empresa = EmpData.ds_telefone;
    userData.ds_cnpj = EmpData.ds_cnpj;
    userData.email_empresa = EmpData.ds_email;
    userData.data_cadastro_empresa = new Date(EmpData.dt_cadastro).toLocaleString();
    
    setUserData(userData);

    setOpenRelatorio(true);

  }

  function handlePDFPrint(){
      var content = document.getElementById("relatorio");
      window.print(content);
  }

  function handlePDFClose(){
      setOpenRelatorio(false);
  }

    
    return(
        <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Detalhes </TableCell>
            <TableCell>Gerar Relatório</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
              <TableRow key={row[0]}>
              <TableCell>{row[2]}</TableCell>
              <TableCell>{row[6]}</TableCell>
              <TableCell>{row[4]}</TableCell>
              <TableCell>
                <Button color="primary" onClick={() =>{ getPopData(row[0], setName('Nome: '+row[2]), openModal())}}>Visualizar</Button>
              </TableCell>
              <TableCell>
                <IconButton color="primary" aria-label="Exportar dados para PDF">
                  <PictureAsPdfIcon onClick={() =>{ getPopData(row[0], setName('Nome: '+row[2]), handlePDFOpen(row))}}/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{userName}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <PopUp rows = { userPopUp}/>
            </DialogContentText>
          </DialogContent>  
          <DialogActions>
              <Button onClick={handleClose} color="primary" autoFocus>
                Fechar
              </Button>
            </DialogActions>
          </Dialog>
            {/*  ----- Modal PDF ----- */}
          <Dialog
            open={openRelatorio}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
                <DialogTitle id="alert-dialog-title">
                  <div className="div-data">
                    Relatório Detalhado Funcionário -  ABRASEL/MG - Associação Brasileira de Bares e Restaurantes seccional Minas Gerais
                  </div>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <div className="div-data">
                      <strong>Dados do Funcionário</strong><br/><br/>

                        <b>Nome:</b><label> {userData.nome}</label><br/>
                        <b>Telefone:</b><label> {userData.telefone}</label><br/>
                        <b>E-mail:</b> <label> {userData.email}</label><br/>
                        <b>CPF:</b><label> {userData.cpf}</label> <br/>
                        <b>Data de Cadastro:</b><label> {userData.data_cadastro}</label> <br/>
                      <br/>
                      <Divider />
                      <br/>
                      <p><strong>Dados da Empresa</strong></p><br/>

                        <b>Nome:</b><label> {userData.nome_empresa}</label><br/>
                        <b>Telefone:</b><label> {userData.telefone_empresa}</label><br/>
                        <b>E-mail:</b> <label> {userData.email_empresa}</label><br/>
                        <b>CPF:</b><label> {userData.ds_cnpj}</label> <br/>
                        <b>Data de Cadastro:</b><label> {userData.data_cadastro_empresa}</label> <br/>
                      <br/>
                    </div>  
                    <br/>
                    <div className="div-data">
                      <br/>
                      
                        <PopUp rows = { userPopUp}/>
                        <br/>
                        <br/>
                    </div>
                  </DialogContentText>
                </DialogContent>  
              <div className="no-printme" >
              <DialogActions>
                <Button onClick={handlePDFPrint} color="primary" autoFocus>
                  Imprimir
                </Button>
                <Button onClick={handlePDFClose} color="primary" autoFocus style={{ print: 'none'}}>
                  Fechar
                </Button>
              </DialogActions>
              </div>
          </Dialog>
        </Table>

    );
}
