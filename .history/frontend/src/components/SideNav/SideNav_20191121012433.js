import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import './SideNav.css';
import pic from '../../constants/no-dp.png'
class SideNav extends Component {
  render() {
    return (
      <div className="sidenav">
        <Paper>
          <h1>Sulaiman Sanaullah</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </Paper>
      </div>
    );
  }
}
export default SideNav;