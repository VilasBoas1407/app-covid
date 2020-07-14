import React, {useEffect} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import api from '../../services/api'
// Generate Order Data
let rows = [];
function createData(array) {
  array.forEach(element => {
    element.dt_data = element.dt_data.substr(0, 10).split('-').reverse().join('/')
    rows.push(Object.values(element));
  });
}

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  async function getData(){
    const tokem = await localStorage.getItem("token");
    let usuario = await localStorage.getItem("userData")
    if(usuario){
      usuario = JSON.parse(usuario)
    }
    
    api.request({
        method: 'GET',
        url: `/followup`,
        params:{
          'id_emp': usuario.id_emp
        },
        headers:{
          'x-access-token': tokem,
        },
      
      }).then(function(response){
        createData(response.data.userData)
      
      }).catch(function(err){
            console.log(err)
          
      });
    }
  const classes = useStyles();
  useEffect(()=>{
    getData()
  },[rows]);
  return (
    <React.Fragment>
      <Title>Funcionarios</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Sintomas</TableCell>
            <TableCell>Telefone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row[0]}>
              <TableCell>{row[2]}</TableCell>
              <TableCell>{row[3]}</TableCell>
              <TableCell>{row[1]}</TableCell>
              <TableCell>{row[4]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          Ver mais
        </Link>
      </div>
    </React.Fragment>
  );
}