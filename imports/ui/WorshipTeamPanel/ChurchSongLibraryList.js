import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Songs } from '../../api/songs';
//import { Services } from '../../api/services';

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
      return <p onClick={() => {
        const _id = Session.get('selectedServiceId');
        const songItem = song._id;
        Meteor.call('services.update', _id, songItem);
      }} className='item' key={song._id}>Name: {song.songName} Artist: {song.songArtist}</p>
    });
  }
  render() {
    return (
      <div>
        <h2>Songs List</h2>
        <div>
          {this.renderSongsListItems()}
        </div>
      </div>
    );
  }
};
