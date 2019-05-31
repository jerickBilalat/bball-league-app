import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import TableToolBar from "./TableToolBar";


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function createData(id,name, winningPercentage, wins, losses, gamesPlayed) {
  return { id, name, winningPercentage, wins, losses, gamesPlayed };
}


function PlayerTable(props) {
  const { classes,
    doGoToManageProductPage,
    players } = props;
  const rows = players.map(player => {
    let {_id: id, name, winningPercentage, wins, losses, gamesPlayed} = player;
    
    return createData(id, name, winningPercentage, wins, losses, gamesPlayed);
  })
  return (
    <Paper className={classes.root}>
      <TableToolBar />
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
              <TableCell align="right">Winning %</TableCell>
              <TableCell align="right">W</TableCell>
              <TableCell align="right">L</TableCell>
              <TableCell align="right"># Games Played</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow hover onClick={(e) => doGoToManageProductPage(row.id, e)} key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.winningPercentage}</TableCell>
              <TableCell align="right">{row.wins}</TableCell>
              <TableCell align="right">{row.losses}</TableCell>
              <TableCell align="right">{row.gamesPlayed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

PlayerTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayerTable);
