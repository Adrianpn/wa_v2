import React from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Services } from '../../api/services';
import { Songs } from '../../api/songs';
import ReactModal from 'react-modal';
import AddSong from './AddSong';
import ChangeSongKey from './ChangeSongKey';

export const ServiceSongItem = (props) => {

  // const className = props.service.selected ? 'item item--selected' : 'item';
  //console.log(props.song._id);
  return (
    <div className='item'>
      <h5 className="item__title">{ props.song.songName || 'Add Songs' }</h5>
      <h5 className="item__title">{ props.song.songArtist }</h5>
      <h5 className="item__title">{ songList[props.service].songServiceKey }</h5> 
      {/* <p className="item__subtitle">{ moment(props.song.updatedAt).format('M/DD/YY') }</p> */}
      <ChangeSongKey song={props.song} service={props.service}/>
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
    services: Services.find( { _id:selectedServiceId }, { sort: { updatedAt:-1 } } ).fetch().map((service)=> {
      songList = service.serviceSong;

        return {
          ...service
        };

      }),
    // service: Services.findOne(selectedServiceId),
    // services: Services.find(selectedServiceId).fetch().map((service)=> {
    //     return {
    //       ...service
    //     };
    //   }),
    call: Meteor.call
  };
}, ServiceSongItem);
