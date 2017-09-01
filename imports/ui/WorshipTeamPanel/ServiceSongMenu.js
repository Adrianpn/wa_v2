import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';
import ChangeSongKey from './ChangeSongKey';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import AvLibraryMusic from 'material-ui/svg-icons/av/library-music';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import Delete from 'material-ui/svg-icons/action/delete';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {blue500, yellow600} from 'material-ui/styles/colors';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import Dialog from 'material-ui/Dialog';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip=""
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

export default class ServiceSongMenu extends  React.Component {
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
          <IconMenu iconButtonElement={iconButtonElement}>
            {/* <MenuItem>Reply</MenuItem>
            <MenuItem>Forward</MenuItem> */}
            <MenuItem onClick={() => {
                //const _id = Session.get('selectedServiceId');
                //const songItem = props.song._id;
                console.log("changed key 2s");
                this.setState({open: true});
                //Meteor.call('services.changeSongKey', _id, songItem);
              }}>  <Dialog
                    title="Dialog With Actions"
                    //actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={ () => this.setState({open: false}) }
                  >
                  </Dialog>Change Key
              </MenuItem>
              <MenuItem onClick={() => {
                  // const _id = Session.get('selectedServiceId');
                  // const songItem = props.song._id;
                  // console.log("Deleted song "+ songItem);
                  // Meteor.call('services.removeSong', _id, songItem);
                }}>Change Speed</MenuItem>
              <MenuItem onClick={() => {
                  const _id = Session.get('selectedServiceId');
                  const songItem = props.song._id;
                  console.log("Deleted song "+ songItem);
                  Meteor.call('services.removeSong', _id, songItem);
                }}>Delete</MenuItem>
          </IconMenu>
        </div>
      </MuiThemeProvider>

    );
  }
}
