import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Songs } from '../../api/songs';
import { Services } from '../../api/services';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import Delete from 'material-ui/svg-icons/action/delete';
import {blue500, yellow600} from 'material-ui/styles/colors';

export default class ChurchSongLibraryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: []
    };
  }
  componentDidMount() {
    console.log('componentDidMount SongsList');
    this.songsTracker = Tracker.autorun(() => {
      Meteor.subscribe('songs');
      const songs = Songs.find().fetch();
      this.setState({ songs });
    });
  }
  componentWillUnmount() {
    console.log('componentWillUnmount SongsList');
    this.songsTracker.stop();
  }
  renderSongsListItems() {
    return this.state.songs.map((song) => {
      return (
        <div key={song._id}>
          <List>
            {/* <Subheader inset={true}>Files</Subheader> */}
            <ListItem
              onClick={() => {
                  const _id = Session.get('selectedServiceId');
                  const songItem = song._id;
                  Meteor.call('services.update', _id, songItem);
                }}
              leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
              primaryText= { song.songName }
              secondaryText= { song.songArtist }
            />
          </List>
          <Divider inset={true} />
        </div>
      )
    });
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
            {this.renderSongsListItems()}
        </div>
      </MuiThemeProvider>
    );
  }
};
