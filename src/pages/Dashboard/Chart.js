import React, {useEffect, useState} from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import api from '../../services/api'
// Generate Sales Data
function createData(day, employes) {
  return { day, employes };
  
}
export default function Chart() {
  const [data, setData] = useState([]);
  let dados = []
  function getNPeople(date,array){
    let number = 0
    if(array != undefined){
      array.forEach(element => {
        let symptom = element.id_sintoma.split(',')
        if(symptom !=''){
          number++
        }
      });
    }
    dados.unshift({day:date.substr(0, 10).split('-').reverse().join('/'),employes:number})
    setData(dados)
  }
  const theme = useTheme();
  async function collectData(dia){
    //date transform
    let date = new Date()
    
    date.setDate(date.getDate() - dia);
    date = date.toLocaleDateString().split('/').reverse().join('-')
    const tokem = await localStorage.getItem("token");
    let usuario = await localStorage.getItem("userData")
    if(usuario){
      usuario = JSON.parse(usuario)
    }
    
    
    
    api.request({
        method: 'GET',
        url: `/followup`,
        params:{
          'dt_data': date
        },
        headers:{
          'x-access-token': tokem,
        },
        
      }).then(function(response){
        
        getNPeople(date,response.data.userData)
      
      }).catch(function(err){
            console.log(err)
          
      });
  }
  useEffect(()=>{
    for(let i=0;i<7;i++){
      collectData(i)
    }
  },[]);
  return (
    <React.Fragment>
      <Title>Semana</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="day" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              size="small"
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Colaborador c/ sintoma.
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="employes" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}