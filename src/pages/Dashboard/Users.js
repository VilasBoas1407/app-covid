import React,{useEffect} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import api from '../../services/api'
function preventDefault(event) {
  event.preventDefault();
}
function getNPeople(array){
  let number = 0
  if(array != undefined){
    array.forEach(element => {
      let symptom = element.id_sintoma.split(',')
      if(symptom !=''){
        number++
      }
    });
  }
  return number
}
const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  let total;
  let day = new Date().toISOString().substr(0, 10).split('-').reverse().join('/')
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
        total = getNPeople(response.data.userData)
        
      }).catch(function(err){
            console.log(err)
          
      });
  }
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Funcionarios com Sintomas</Title>
      <Typography component="p" variant="h4">
       {total}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {day}
      </Typography>

    </React.Fragment>
  );
}