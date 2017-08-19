import React from 'react';
import { Link } from 'react-router';
import PrivateHeader from '../PrivateHeader';

export default class WorshipTeamPanel extends React.Component {
  render(){
    return (
      <div>
        <div className="page-content">
          <h1>Worship Team Panel</h1>
          <h3><Link to="ServiceRunDown">Service Rundown</Link></h3>
          <h3>Song Suggestion</h3>
          <h3>Songs to Learn</h3>
          <h3><Link to="ChurchSongLibrary">Church Song Library</Link></h3>
          <h3>Full Song Library</h3>
          <h3>Rehearsal Schedule</h3>
          <h3><Link to="UserProfile">User Profile</Link></h3>
          <h3><Link to="MinistryPanel">Start Ministry</Link></h3>
        </div>
      </div>
    );
  }
}
