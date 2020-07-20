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
      });
    }
    const [rows, setRows] = useState([])
    async function createData(array){
      let data = []
      nRows+=5
      //muda nRows de acordo com o tamanho dos dados
      if(array.length<nRows){
        nRows = array.length
      }
      for(let i=0; i<nRows; i++) {
        if(array[i].ds_usa_epi){
          array[i].ds_usa_epi = 'Sim' 
        }else{
          array[i].ds_usa_epi = 'Não' 
        }
          array[i].dt_consulta = array[i].dt_consulta.substr(0, 10).split('-').reverse().join('/')
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
