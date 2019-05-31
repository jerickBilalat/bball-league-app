import React from 'react';
import {withRouter} from 'react-router-dom';

class ScrollTo extends React.Component {
  componentDidMount() {
    const x = this.props.x || 0;
    const y = this.props.y || 0;
      window.scrollTo(x, y);
  }

  render() {
    return null
  }
}

export default withRouter(ScrollTo);