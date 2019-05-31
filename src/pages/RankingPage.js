import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

// selectors
import {rankPlayers, sortAlphabetically} from "../selectors/playerSelectors";

// Components
import RankedPlayersTable from "../components/RankedPlayersTable";
import PlayersTable from "../components/PlayersTable";

// actions
import {loadPlayers} from "../actions/playerActions";

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  tableContainer: {
		maxHeight: 320,
		marginBottom: 20,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 3,
  },
});


class RankingPage extends React.Component {

  state = {
    isShowRankedPlayers: true
  }
  doGoToManageProductPage = (id) => {
    this.props.history.push(`/manage_player/${id}`);
  }

  componentDidMount() {
    this.props.dispatch(loadPlayers())
  }
  
  handleTableChange = (e) => {
    this.setState({isShowRankedPlayers : !this.state.isShowRankedPlayers})
  }
  render() {
    const { classes, players, rankedPlayers} = this.props,
          {isShowRankedPlayers} = this.state;
    return (
      <Fragment>
        <Typography variant="h4" gutterBottom component="h2">
          Players
        </Typography>
        <Typography variant="h6" gutterBottom component="h6" onClick={this.handleTableChange}>
          {isShowRankedPlayers ? "view all players" : "view ranked players"}
        </Typography>
        <div className={classes.tableContainer}>
          {isShowRankedPlayers
            ? <RankedPlayersTable doGoToManageProductPage={this.doGoToManageProductPage} players={rankedPlayers}/>
            : <PlayersTable doGoToManageProductPage={this.doGoToManageProductPage} players={players}/>
          }
        </div>
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
    players: [...sortAlphabetically(state.players)],
    rankedPlayers: [...rankPlayers(state.players)]
  }
}

export default connect(mapStateToProps)(withRouter(withStyles(styles, {withTheme: true})(RankingPage)));