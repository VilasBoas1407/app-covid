import React, { useState } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';

export default function PopUp(props){
  if(props.rows === undefined){
    return(
      <h2> Não foram encontrados registros</h2>
      );
    }else{
      const { rows } = props
      rows.map(row =>{
        if(row.ds_usa_epi){
          row.ds_usa_epi = 'Sim' 
        }else{
          row.ds_usa_epi = 'Não' 
        }
        row.dt_consulta = row.dt_consulta.substr(0, 10).split('-').reverse().join('/')
      })
      return(
          <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Sintomas</TableCell>
              <TableCell>Utilizou EPI?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
                <TableRow key={row[0]}>
                <TableCell>{row.dt_consulta}</TableCell>
                <TableCell>{row.id_sintoma}</TableCell>
                <TableCell>{row.ds_usa_epi}
                </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                </Table>
            );

  }
}