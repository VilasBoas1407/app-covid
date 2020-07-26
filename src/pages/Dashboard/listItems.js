  
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';

import { Link } from 'react-router-dom';

export const mainListItems = (
  
  <div>
      <Link to="/comp/Dashboard" style={{ textDecoration: 'none',  color:'#000'  }}>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>
      <Link to="/user/List" style={{ textDecoration: 'none', color:'#000' }}>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
          <ListItemText primary="Funcionários" />
      </ListItem>
      </Link>
  </div>
);

