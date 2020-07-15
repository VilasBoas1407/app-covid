import React, {useEffect, useState} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title';
import api from '../../services/api'
import TBody from '../../components/Dashboard/Table'

// Generate Order Data


const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

let nRows= 0
export default function Orders() {
  function preventDefault(event) {
    event.preventDefault();
    getData()
  }
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
        
      }).then(async function(response){
        
        await createData(response.data.userData)
      }).catch(function(err){
        console.log(err)
        
      });
    }
    const [rows, setRows] = useState([])
    async function createData(array){
      let data = []
      nRows+=5
      for(let i=0; i<nRows; i++) {
        if(array[i])
        
        array[i].dt_data = array[i].dt_data.substr(0, 10).split('-').reverse().join('/')
        data.push(Object.values(array[i]));
      };
      setRows(data)
      
    }
   
    const classes = useStyles();
    useEffect(()=>{
     getData()
    },[]);
    return (
      <React.Fragment>
      <Title>Funcionarios</Title>
      
        <TBody rows = {rows}/>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          Ver mais
        </Link>
      </div>
    </React.Fragment>
  );
}
/*
 async function createData(array) {
      nRows=+5;
      //let array =  await getData()
      array.forEach(element => {
        element.dt_data = element.dt_data.substr(0, 10).split('-').reverse().join('/')
        rows.push(Object.values(element));
      });
      rows = rows.splice(0,1)
      //await setRows(rows)
      return rows;
      //console.log(rows[0])
      /*
      for(let i=0; i<=nRows; i++) {
        array[i].dt_data = array[i].dt_data.substr(0, 10).split('-').reverse().join('/')
        rows.push(Object.values(array[i]));
      }
      
    }
    */