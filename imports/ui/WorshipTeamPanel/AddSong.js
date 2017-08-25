import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';
import ChurchSongLibraryList from './ChurchSongLibraryList';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

export default class AddSong extends  React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    return (
      <MuiThemeProvider>
      <div>
        <RaisedButton
          label="Add Songs"
          onClick={() => this.setState({open: !this.state.open})}
        />
        <Drawer width={300} openSecondary={true} open={this.state.open}>
          <AppBar title="Songs" iconElementLeft={<IconButton><NavigationClose onClick={() => this.setState({open: !this.state.open})}/></IconButton>} />
          <ChurchSongLibraryList/>
        </Drawer>
      </div>
    </MuiThemeProvider>
    );
  }
}
