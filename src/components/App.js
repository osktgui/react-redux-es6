import React, { PropTypes } from 'react';
import Header from './common/Header.js';
import { connect } from 'react-redux';

class App extends React.Component {
  render () {
    return (
      <div className="container-fluid">
        <Header />
        {
          this.props.children
        }
      </div>
    );
  }
}

App.PropTypes = {
  children: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(App);
