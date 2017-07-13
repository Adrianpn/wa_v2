import React from 'react';
import PrivateHeader from '../PrivateHeader';
import ChurchSongLibraryList from './ChurchSongLibraryList';
import { Tracker } from 'meteor/tracker';
import { Songs } from '../../api/songs';

export default class ChurchSongLibrary extends React.Component {
  onLogout() {
    Accounts.logout();
  }
  onSubmit(e) {
    const songName = this.refs.songName.value.trim();
    const songArtist = this.refs.songArtist.value.trim();
    e.preventDefault();

    if (songName) {
      Songs.insert({ songName, songArtist });
      this.refs.songName.value = '';
      this.refs.songArtist.value = '';
    }

  }
  render() {
    return (
      <div>
        <PrivateHeader title="Dashboard"/>
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


// export default class ChurchSongLibrary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       songs: []
//     };
//   }
//   componentDidMount() {
//     console.log('componentDidMount ChurchSongLibrary');
//     this.songsTracker = Tracker.autorun(() => {
//       Meteor.subscribe('songs');
//       const songs = Songs.find().fetch();
//       this.setState({ songs });
//     });
//   }
//   componentWillUnmount() {
//     console.log('componentWillUnmount ChurchSongLibrary');
//     this.songsTracker.stop();
//   }
//   renderSongsListItems() {
//     return this.state.songs.map((song) => {
//       return <p key={song._id}>Name: {song.songName} Artist: {song.songArtist}</p>
//     });
//   }
//
//   onSubmit(e) {
//     const handleSubmit = function (e) {
//       const songName = this.ref.songName.value.trim();
//       const songArtist = this.ref.songArtist.value.trim();
//       e.preventDefault();
//       if (songName) {
//         this.ref.songName.value = '';
//         this.ref.songArtist.value = '';
//         Songs.insert({
//           songName: songName,
//           songArtist: songArtist
//         });
//       }
//     };
//   }
//
//   render() {
//     return (
//       <div>
//         <PrivateHeader title="Dashboard"/>
//         <div className="page-content">
//           <h1>Church Song Library</h1>
//           {this.renderSongsListItems()}
//           <form onSubmit={this.onSubmit.bind(this)}>
//             <input type="text" ref="songName" placeholder="Song Name"/>
//             <input type="text" ref="songArtist" placeholder="Song Artist"/>
//             <button>Add Song</button>
//           </form>
//         </div>
//       </div>
//     );
//   }
// };


// const renderSongs = function (songsList) {
//   return songsList.map(function (song) {
//     return <p key={song._id}>Name: {song.songName} Artist: {song.songArtist} </p>;
//   });
// };
//
// const handleSubmit = function (e) {
//   let songName = e.target.songName.value;
//   let songArtist = e.target.songArtist.value;
//   e.preventDefault();
//   if (songName) {
//     e.target.songName.value = '';
//     e.target.songArtist.value = '';
//     Songs.insert({
//       songName: songName,
//       songArtist: songArtist
//     });
//   }
// };
//
// export default class ChurchSongLibrary extends React.Component {
//   render(){
//     return (
//       <div>
//         <PrivateHeader title="Dashboard"/>
//         <div className="page-content">
//           <h1>Church Song Library</h1>
//           {renderSongs(songs)}
//           <form onSubmit={handleSubmit}>
//             <input type="text" name="songName" placeholder="Song Name"/>
//             <input type="text" name="songArtist" placeholder="Song Artist"/>
//             <button>Add Song</button>
//           </form>
//         </div>
//       </div>
//     );
//   }
// }

// Tracker.autorun(function () {
//   Meteor.subscribe('songs');
//   console.log('Songs', Songs.find().fetch());
// });
//
// const songs = [{
//   _id: '1',
//   songName: 'Let Praises Raise',
//   songArtist: 'Myron Butler'
// }, {
//   _id: '2',
//   songName: 'All Around',
//   songArtist: 'Isreal Houghton'
// }];
