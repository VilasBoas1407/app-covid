import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Total de Usuários</Title>
      <Typography component="p" variant="h4">
       2.500
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Atualizado 07/07/2020
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Ver Mais
        </Link>
      </div>
    </React.Fragment>
  );
}