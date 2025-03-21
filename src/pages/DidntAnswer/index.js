import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TextField from '@material-ui/core/TextField';

import { mainListItems } from '../Dashboard/listItems';
import Users from '../../components/Dashboard/TableUsers';
import TBody from '../../components/Dashboard/DidntAnswer/Table'

import { useHistory } from 'react-router-dom';

import logo from '../../assets/abrasel/logo.png';
import api from '../../services/api';

import swal from 'sweetalert';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://abrasel.com.br/">
        Abrasel - Stop Covid-19
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#2FB86E'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  filter : {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 300,
  },
}));

export default function DidntAnswer() {

  const history = useHistory();

  const [filterData,setFilterData] =useState();

  function validateUser(){
    const login = localStorage.getItem('loginUser');

    if(login === true || login === null || login === '')
      history.push('/');
    } 
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  async function FindData(){

    let usuario = await localStorage.getItem("userData")
      
      if(usuario){
        usuario = JSON.parse(usuario)
      }
    const token = await localStorage.getItem("token");
          api.request({
              method: 'GET',
                url: `/whoAnswer`,
                params:{
                  id_emp: usuario.id_emp
                },
                headers:{
                  'x-access-token': token,
                },
              })
              .then(async function(response){
                await setFilterData(response.data.userData);
              })
              .catch(function(err){ 
                console.log(err)       
              });
}

  function handleLogOut(){
    localStorage.clear();
    history.push('/');
  }

  useEffect(()=>{
    FindData();
    validateUser(); 
  },[]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        
        <Toolbar className={classes.toolbar}>
        <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Acompanhamento - Lista de Usuários que não responderam
          </Typography>
          <IconButton color="inherit">
              <ExitToAppIcon onClick={handleLogOut}/>
          </IconButton>
        </Toolbar>
        
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
        <img src={logo} alt="covid-icon" height="64px" width="208px"/>

          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
          
        </div>

        <Divider />
        <List>{mainListItems}</List>

      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>

          <Box pt={4}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <TBody rows={filterData} />
              </Paper>
            </Grid>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

