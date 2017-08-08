import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import { Services } from '../../api/services';
import { Songs } from '../../api/songs';
import ServiceSongItem from './ServiceSongItem';
import AddSong from './AddSong';

export const ServiceSongList = (props) => {
  return (
    <div className="item-list">
      { props.songs.length === 0 ? <AddSong/> : undefined }
      {/* { props.services.map((service) => {
        return <ServiceSongItem key={service.serviceSong} service={service}/>;
      })} */}
      { props.songs.map((song) => {
        return <ServiceSongItem key={song._id} song={song}/>;
      })}
    </div>
  );
};

ServiceSongList.propTypes = {
  services: React.PropTypes.array.isRequired
};

var songList = [];

export default createContainer( () => {
  const selectedServiceId = Session.get('selectedServiceId');

  Meteor.subscribe('services');
  Meteor.subscribe('songs');

    //var serviceSong = this.props.service.serviceSong;

  // function findSongs (selectedServiceId, serviceSong) {
  //   for (var i=0; i < serviceSong.length; i++) {
  //       if (_id === selectedServiceId) {
  //           return serviceSong[i];
  //       }
  //   }
  // };

  return {
    services: Services.find( { _id:selectedServiceId }, { sort: { updatedAt:-1 } } ).fetch().map((service)=> {
      songList = service.serviceSong;
      //console.log(songList);

        return {
          ...service
        };

      }),
    songs: Songs.find(  { _id: { $in:  songList  } }, { sort: { updatedAt:-1 } } ).fetch().map((song)=> {
      //console.log(this.state.service);
      //console.log(songList);
        return {
          ...song
        };
      })
  };
}, ServiceSongList);
