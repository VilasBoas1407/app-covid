import React, {useEffect, useState} from 'react';

import Title from './Title';
import api from '../../services/api'
import TChart from '../../components/Dashboard/Chart'

// Generate Sales Data
export default function Chart() {
  let dados = []
  const [data, setData] = useState([]);

  async function createData() {
  }

  async function getNPeople(date,array){
    let number = 0
    if(array != undefined){
      array.forEach(element => {
        let symptom = element.id_sintoma.split(',')
        if(symptom !=''){
          number++
        }
      });
    }
    dados.unshift({day:date,employes:number})
    
  }

  async function collectData(){
    for(let dia=0;dia<7;dia++){
      //date transform
      let date = new Date()
      date.setDate(date.getDate() - dia);
      
      date = date.toLocaleDateString().split('/').reverse().join('-')
      const tokem = await localStorage.getItem("token");
      let usuario = await localStorage.getItem("userData")
      
      if(usuario){
        usuario = JSON.parse(usuario)
      }
      
      
      await api.request({
          method: 'GET',
          url: `/followup`,
          params:{
            'dt_consulta': date
          },
          headers:{
            'x-access-token': tokem,
          },
          
        }).then(async function(response){
          
          await getNPeople(date,response.data.userData)
        
        }).catch(function(err){}); 
    }
    setData(dados)
  }
  useEffect(()=>{
    collectData()
  },[]);
  return (
    <React.Fragment>
      <Title>Semana</Title>
      <TChart data={data}/>
    </React.Fragment>
  );
}