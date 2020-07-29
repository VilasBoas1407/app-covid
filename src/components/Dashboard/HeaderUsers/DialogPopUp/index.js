import React, { useState } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';

export default function PopUp(props){
    const { rows } = props

    rows.map(row =>{
    })
    return(
        <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Sintomas</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell>Utilizou EPI?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
              <TableRow key={row[0]}>
              <TableCell>{row[1]}</TableCell>
              <TableCell>{row[2]}</TableCell>
              <TableCell>{row[3]}</TableCell>
              <TableCell>{row[4]}</TableCell>
              <TableCell>{row[5]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
    );
}