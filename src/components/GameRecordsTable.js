import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import {formatDate} from '../utils';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  spacer: {
    flex: '1 1 100%',
  },
  title: {
    flex: '0 0 auto',
  },
});

function createData(id, createdAt, winners, losers) {
  return { id,  createdAt, winners, losers};
}


function GameRecordsTable(props) {
  const { classes,
    doGoToManageGamePage,
    games } = props;
  const rows = games.map(game => {
    let {_id: id,  createdAt, winners, losers} = game;
    createdAt = formatDate(createdAt);
    return createData(id,  createdAt, winners, losers);
  })
  return (
    <Paper className={classes.root}>
      <Toolbar
        className={classes.root}
      >
        <div className={classes.title}>
          <Typography variant="h6" id="tableTitle">
            Game Records
          </Typography>
        </div>
      </Toolbar>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Winners</TableCell>
            <TableCell align="right">Losers</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow hover onClick={(e) => doGoToManageGamePage(row.id, e)} key={row.id}>
              <TableCell component="th" scope="row">{row.createdAt}</TableCell>
              <TableCell align="right">{row.winners.join(", ")}</TableCell>
              <TableCell align="right">{row.losers.join(", ")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

GameRecordsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GameRecordsTable);
