import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles(function (theme) {
  return {
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    table: {
      minWidth: 650,
    },
    sidebar: {
      width: 240,
      backgroundColor: theme.palette.background.paper,
      height: '100vh',
      boxShadow: theme.shadows[5],
    },
    sidebarItem: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(2),
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    icon: {
      marginRight: theme.spacing(1),
    },
  };
});

const StyledTableCell = withStyles(function (theme) {
  return {
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  };
})(TableCell);

const StyledTableRow = withStyles(function (theme) {
  return {
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  };
})(TableRow);

function createData(name, email, role, status) {
  return { name, email, role, status };
}

const rows = [
  createData('John Doe', 'john@example.com', 'Admin', 'Active'),
  createData('Jane Smith', 'jane@example.com', 'Editor', 'Active'),
  createData('Mike Johnson', 'mike@example.com', 'Viewer', 'Inactive'),
];

function AdminDashboard() {
  const classes = useStyles();

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Navbar, null),
    React.createElement(
      'div',
      { className: classes.root },
      // Sidebar
      React.createElement(
        'div',
        { className: classes.sidebar },
        React.createElement(
          'div',
          { className: classes.sidebarItem },
          React.createElement(DashboardIcon, { className: classes.icon }),
          React.createElement(Typography, { variant: 'body1' }, 'Dashboard')
        ),
        React.createElement(
          'div',
          { className: classes.sidebarItem },
          React.createElement(PeopleIcon, { className: classes.icon }),
          React.createElement(Typography, { variant: 'body1' }, 'Users')
        ),
        React.createElement(
          'div',
          { className: classes.sidebarItem },
          React.createElement(BarChartIcon, { className: classes.icon }),
          React.createElement(Typography, { variant: 'body1' }, 'Analytics')
        ),
        React.createElement(
          'div',
          { className: classes.sidebarItem },
          React.createElement(SettingsIcon, { className: classes.icon }),
          React.createElement(Typography, { variant: 'body1' }, 'Settings')
        )
      ),
      // Main Content
      React.createElement(
        'main',
        { className: classes.content },
        React.createElement('div', { className: classes.toolbar }),
        React.createElement(
          Typography,
          { variant: 'h4', gutterBottom: true },
          'Admin Dashboard'
        ),
        // Metrics Grid
        React.createElement(
          Grid,
          { container: true, spacing: 3 },
          React.createElement(
            Grid,
            { item: true, xs: 12, sm: 6, md: 3 },
            React.createElement(
              Paper,
              { className: classes.paper },
              React.createElement(Typography, { variant: 'h6' }, 'Total Users'),
              React.createElement(Typography, { variant: 'h4' }, '1,234')
            )
          ),
          React.createElement(
            Grid,
            { item: true, xs: 12, sm: 6, md: 3 },
            React.createElement(
              Paper,
              { className: classes.paper },
              React.createElement(Typography, { variant: 'h6' }, 'Active Users'),
              React.createElement(Typography, { variant: 'h4' }, '1,000')
            )
          ),
          React.createElement(
            Grid,
            { item: true, xs: 12, sm: 6, md: 3 },
            React.createElement(
              Paper,
              { className: classes.paper },
              React.createElement(Typography, { variant: 'h6' }, 'Revenue'),
              React.createElement(Typography, { variant: 'h4' }, '$12,345')
            )
          ),
          React.createElement(
            Grid,
            { item: true, xs: 12, sm: 6, md: 3 },
            React.createElement(
              Paper,
              { className: classes.paper },
              React.createElement(Typography, { variant: 'h6' }, 'No of Staff'),
              React.createElement(Typography, { variant: 'h4' }, '100')
            )
          )
        ),
        // User Table
        React.createElement(
          Typography,
          { variant: 'h6', gutterBottom: true, style: { marginTop: '2rem' } },
          'User Management'
        ),
        React.createElement(
          TableContainer,
          { component: Paper },
          React.createElement(
            Table,
            { className: classes.table, 'aria-label': 'customized table' },
            React.createElement(
              TableHead,
              null,
              React.createElement(
                TableRow,
                null,
                React.createElement(StyledTableCell, null, 'Name'),
                React.createElement(StyledTableCell, null, 'Email'),
                React.createElement(StyledTableCell, null, 'Role'),
                React.createElement(StyledTableCell, null, 'Status'),
                React.createElement(StyledTableCell, null, 'Action')
              )
            ),
            React.createElement(
              TableBody,
              null,
              rows.map(function (row) {
                return React.createElement(
                  StyledTableRow,
                  { key: row.name },
                  React.createElement(StyledTableCell, null, row.name),
                  React.createElement(StyledTableCell, null, row.email),
                  React.createElement(StyledTableCell, null, row.role),
                  React.createElement(StyledTableCell, null, row.status),
                  React.createElement(
                    StyledTableCell,
                    null,
                    React.createElement(
                      Button,
                      { variant: 'contained', color: 'primary' },
                      'Edit'
                    )
                  )
                );
              })
            )
          )
        )
      )
    )
  );
}

export default AdminDashboard;