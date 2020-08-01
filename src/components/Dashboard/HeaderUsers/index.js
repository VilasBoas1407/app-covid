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
import PopUp from './DialogPopUp/index'
import api from '../../../services/api'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

import './styles.css';

export default function THeaderUser(props){


  const[open,setOpen] = useState(false);
  const[openRelatorio,setOpenRelatorio] = useState(false);
  const [userPopUp , setUser] = useState()
  const [userName , setName] = useState('Nome:')
  const [userData,setUserData] = useState({
    nome_empresa : ''
  });


  const { rows } = props

  async function getPopData(id){
    
    const token = await localStorage.getItem("token");
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
  
  function openModal(){
    setOpen(true);
  }
    
  function handleClose(){
    setOpen(false);
  }

  async function handlePDFOpen(user){

    const EmpData = await JSON.parse(localStorage.getItem("userData"));
    console.log(user);
    let userData = {};
    
    userData.nome = user[2];
    userData.telefone = user[3];
    userData.email = user[4];
    userData.nome_empresa = EmpData.ds_nome;
    console.log(userData);
    await setUserData(userData);

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
                  Relatório - {userData.nome_empresa}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                      <label>Nome: {userData.nome}</label><br/><br/>
                      <label>Telefone : {userData.telefone}</label><br/><br/>
                      <label>E-mail: {userData.email}</label>
                      <br/><br/>
                      <PopUp rows = { userPopUp}/>
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
