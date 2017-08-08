import React from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Services } from '../../api/services';
import { Songs } from '../../api/songs';
import ReactModal from 'react-modal';
import AddSong from './AddSong';

export const ServiceSongItem = (props) => {

  // const className = props.service.selected ? 'item item--selected' : 'item';

  return (
    <div className='item'>
      <h5 className="item__title">{ props.song.songName || 'Add Songs' }</h5>
      <h5 className="item__title">{ props.song.songArtist }</h5>
      <p className="item__subtitle">{ moment(props.song.updatedAt).format('M/DD/YY') }</p>
      <AddSong/>
      <button className="button" onClick={() => {
          const _id = Session.get('selectedServiceId');
          const songItem = props.song._id;
          console.log(props.song._id);
          Meteor.call('services.removeSong', _id, songItem);
        }}>+ Delete Song</button>
    </div>
  );
};

// ServiceSongItem.propTypes = {
//   service: React.PropTypes.object.isRequired,
//   Session: React.PropTypes.object.isRequired
// };

// export default createContainer(() => {
//   return { Session };
// }, ServiceSongItem);

export default createContainer(() => {
  const selectedServiceId = Session.get('selectedServiceId');

  return {
    selectedServiceId,
    //service: Services.findOne(selectedServiceId),
    call: Meteor.call
  };
}, ServiceSongItem);
