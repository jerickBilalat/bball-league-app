import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

import {rankPlayers, sortAlphabetically} from "../selectors/playerSelectors";

import RankedPlayersTable from "../components/RankedPlayersTable";
import GameRecordsTable from "../components/GameRecordsTable";

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  tabRoot: {
    flexGrow: 1,
  },
  tableContainer: {
		maxHeight: 320,
		marginBottom: 100,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 3,
  },
});


class RankingPage extends React.Component {

  state = {
    isShowRankedPlayers: true,
    value: 0,
  }
  doGoToManageProductPage = (id) => {
    this.props.history.push(`/manage_player/${id}`);
  }

  handleTabChange = ( event, value) => {
    this.setState({value})
  }
  handleTableChange = (e) => {
    this.setState({isShowRankedPlayers : !this.state.isShowRankedPlayers})
  }
  render() {
    const { classes, players, rankedPlayers, games} = this.props,
          {value} = this.state;
    return (
      <Fragment>
        <Paper className={classes.tabRoot}>
          <Tabs
            value={this.state.value}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Rankings" />
            <Tab label="Game Records" />
          </Tabs>
        </Paper>
          {value === 0 && <div className={classes.tableContainer}>
              <RankedPlayersTable doGoToManageProductPage={this.doGoToManageProductPage} players={players} rankedPlayers={rankedPlayers}/>          
            </div>
          }
          {value === 1 && <div className={classes.tableContainer}>
          <GameRecordsTable games={games}/>
        </div>}

        <Fab color="primary" aria-label="Add" component={Link} to={"/manage_game"} className={classes.fab}>
          <AddIcon />
        </Fab>
      </Fragment>
    );
  }
}

RankingPage.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state, ownProps) {
  return {
    games: [...state.games],
    players: [...sortAlphabetically(state.players)],
    rankedPlayers: [...rankPlayers(state.players)]
  }
}

export default connect(mapStateToProps)(withRouter(withStyles(styles, {withTheme: true})(RankingPage)));