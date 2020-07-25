import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import api from '../../services/api'

function preventDefault(event) {
  event.preventDefault();
}
const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Users() {
  async function getNPeople(array){
    let number = 0
    if(array !== undefined){
      array.forEach(element => {
        let symptom = element.id_sintoma.split(',')
        if(symptom !==''){
          number++
        }
      });
    }
    await setTotal(number)
  }
  const[total, setTotal] = useState(0);
  let day = new Date().toLocaleDateString().substr(0, 10).split('-').reverse().join('/')
  let date = new Date()
    
  date.setDate(date.getDate());
  date = date.toLocaleDateString().split('/').reverse().join('-')
  async function getData(){
    const token = await localStorage.getItem("token");
    let usuario = await localStorage.getItem("userData")
    if(usuario){
      usuario = JSON.parse(usuario)
    }
    
    api.request({
      method: 'GET',
      url: `/followup`,
      params:{
        'id_emp': usuario.id_emp,
        'dt_consulta': date
      },
      headers:{
        'x-access-token': token,
      },
      
    }).then(async function(response){
      await getNPeople(response.data.userData)
    }).catch(function(err){});
  }
  const classes = useStyles();
  useEffect(()=>{
    getData()
  },[])
  return (
    <React.Fragment>
      <Title>Funcionários com Sintomas</Title>
      <Typography component="p" variant="h4">
       {total}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {day}
      </Typography>
     <Title>Funcionários que não responderam no dia:</Title>
     <Typography color="textSecondary" className={classes.depositContext}>
        {day}
      </Typography>
      <Typography component="p" variant="h4">
       {total}
      </Typography>

    </React.Fragment>
  );
}