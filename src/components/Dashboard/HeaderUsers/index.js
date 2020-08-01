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

export default function THeaderUser(props){
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
    

    const[open,setOpen] = useState(false);
    const [userPopUp , setUser] = useState()
    const [userName , setName] = useState('Nome:')
    function openModal(){
      setOpen(true);
    }
    function handleClose(){
      setOpen(false);
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
                  <PictureAsPdfIcon/>
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
        </Table>

    );
}
