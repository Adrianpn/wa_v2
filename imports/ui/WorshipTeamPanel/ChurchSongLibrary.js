import React from 'react';
import PrivateHeader from '../PrivateHeader';
import ChurchSongLibraryList from './ChurchSongLibraryList';
import { Songs } from '../../api/songs';

export default class ChurchSongLibrary extends React.Component {
  onLogout() {
    Accounts.logout();
  }
  onSubmit(e) {
    const songName = this.refs.songName.value.trim();
    const songArtist = this.refs.songArtist.value.trim();
    e.preventDefault();

    if (songName && songArtist) {
      Meteor.call('songs.insert', songName, songArtist);
      this.refs.songName.value = '';
      this.refs.songArtist.value = '';
    }

  }
  render() {
    return (
      <div>
        <PrivateHeader title="Worship Angel"/>
        <div className="page-content">
          <h1>Church Song Library</h1>
          <ChurchSongLibraryList/>
          <form onSubmit={this.onSubmit.bind(this)}>
            <input type="text" ref="songName" placeholder="Song Name"/>
            <input type="text" ref="songArtist" placeholder="Song Artist"/>
            <button>Add Song</button>
          </form>
        </div>
      </div>
    );
  }
};
