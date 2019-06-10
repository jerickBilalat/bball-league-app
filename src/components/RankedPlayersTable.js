import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 300,
  },
  spacer: {
    flex: '1 1 100%',
  },
  title: {
    flex: '0 0 auto',
  },
});

function createData(id,name, winningPercentage, wins, losses, gamesPlayed) {
  return { id, name, winningPercentage, wins, losses, gamesPlayed };
}

class PlayerStatsTable extends React.Component {

  state = {
    isShowAllPlayers: false
  }

  handleShowAllRadioButton = () => {
    this.setState({ isShowAllPlayers: !this.state.isShowAllPlayers });
  };
  render() {
    const { classes, doGoToManagePlayerPage, players, rankedPlayers } = this.props;

    const { isShowAllPlayers } = this.state;

    let rows;
    
    if(isShowAllPlayers) {
      rows = players.map(player => {
        let {_id: id, name, winningPercentage, wins, losses, gamesPlayed} = player;
        return createData(id, name, winningPercentage, wins, losses, gamesPlayed);
      });
    }else {
      rows = rankedPlayers.map(player => {
        let {_id: id, name, winningPercentage, wins, losses, gamesPlayed} = player;
        return createData(id, name, winningPercentage, wins, losses, gamesPlayed);
      });
    }
    


    return (
      <Paper className={classes.root}>
        <Toolbar
          className={classes.root}
        >
          <Checkbox
            checked={this.state.isShowAllPlayers}
            onChange={this.handleShowAllRadioButton}
          />
          <Typography variant="caption"  id="tableOption">
            Show All Players Stats
          </Typography>
        </Toolbar>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {!isShowAllPlayers && <TableCell>Rank</TableCell>}
              <TableCell>Name</TableCell>
                <TableCell align="right">Win%</TableCell>
                <TableCell align="right">W</TableCell>
                <TableCell align="right">L</TableCell>
                <TableCell align="right">Games Played</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow hover key={row.id}>
                {!isShowAllPlayers && 
                  <TableCell component="th" scope="row">
                  {idx+1}
                  </TableCell>
                }
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
}

export default withStyles(styles)(PlayerStatsTable);
