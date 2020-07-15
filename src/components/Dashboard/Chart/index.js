import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { useTheme } from '@material-ui/core/styles';
export default function TChart(props){
    const { data } = props
    const theme = useTheme();
    return(
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
       
    );
}