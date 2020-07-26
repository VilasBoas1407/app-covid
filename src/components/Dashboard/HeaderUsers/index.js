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


import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

export default function THeaderUser(props){
    const { rows } = props

    const[open,setOpen] = useState(false);

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
              <TableCell>{row[1]}</TableCell>
              <TableCell>{row[2]}</TableCell>
              <TableCell>{row[3]}</TableCell>
              <TableCell>
                <Button color="primary" onClick={openModal}>Visualizar</Button>
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
        <DialogTitle id="alert-dialog-title">{"Nome: Fulano Da Silva "}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Senectus et netus et malesuada fames ac turpis egestas. Dolor morbi non arcu risus quis varius quam quisque. Turpis tincidunt id aliquet risus feugiat in ante. Luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus. Tortor at auctor urna nunc id cursus metus aliquam. Arcu vitae elementum curabitur vitae nunc sed velit. Molestie nunc non blandit massa enim nec dui nunc mattis. Quam nulla porttitor massa id neque aliquam vestibulum morbi blandit. A arcu cursus vitae congue mauris rhoncus aenean. Facilisis gravida neque convallis a cras. Rhoncus dolor purus non enim praesent elementum.
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
