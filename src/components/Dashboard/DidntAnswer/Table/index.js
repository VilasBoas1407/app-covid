import React, { useState, useEffect } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';

export default function TBody(props){
    const { rows } = props
    if(rows){   
        return(
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>Data Ultima Resposta</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Telefone</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id_usuario}>
                        <TableCell>{row.ds_last_followup.split(' ')[0].split('-').reverse().join('-')}</TableCell>
                        <TableCell>{row.ds_nome}</TableCell>
                        <TableCell>{row.ds_telefone}</TableCell>
                        </TableRow>
                ))}
                </TableBody>
            </Table>
        );
    }else{
        return(
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Todos os Funcionarios Responderam</TableCell>
                    </TableRow>
                </TableHead>
            </Table>
        )
    }
}
