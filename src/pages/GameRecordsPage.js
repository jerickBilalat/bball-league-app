import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

// components
import GameRecordsTable from "../components/GameRecordsTable";

// actions creators
import {loadGames} from "../actions/gameActions";

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
class GameRecordsPage extends React.Component {

  doGoToManageProductPage = (id) => {
    this.props.history.push(`/manage_game/${id}`);
  }

  componentDidMount() {
    this.props.dispatch(loadGames())
  }
  
  render() {
    const { classes, games} = this.props;
    return (
      <Fragment>
        <Typography variant="h4" gutterBottom component="h2">
          Game Records
        </Typography>
        <div className={classes.tableContainer}>
          <GameRecordsTable doGoToManageProductPage={this.doGoToManageProductPage} games={games}/>
        </div>
        <Fab color="primary" aria-label="Add" component={Link} to={"/manage_game"} className={classes.fab}>
          <AddIcon />
        </Fab>
      </Fragment>
    );
  }
}

GameRecordsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    games: state.games
  }
}

export default connect(mapStateToProps)(withRouter(withStyles(styles, {withTheme: true})(GameRecordsPage)));