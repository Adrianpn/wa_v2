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
      <AddSong/>
      {/* { props.songs.length === 0 ? <AddSong/> : undefined } */}
      {/* { props.services.map((service) => {
        return <ServiceSongItem key={service.serviceSong} service={service}/>;
      })} */}
      { props.songs.map((song, service) => {
        return <ServiceSongItem key={song._id} song={song} service={service}/>;
      })}
    </div>
  );
};

ServiceSongList.propTypes = {
  services: React.PropTypes.array.isRequired
};

var songList = [];
var finalSongList = [];

export default createContainer( () => {
  const selectedServiceId = Session.get('selectedServiceId');

  Meteor.subscribe('services');
  Meteor.subscribe('songs');

  return {
    services: Services.find( { _id:selectedServiceId }, { sort: { updatedAt:-1 } } ).fetch().map((service)=> {
      songList = service.serviceSong;

      function findSongs (songList) {
        finalSongList = [];

        for (var i=0; i < songList.length; i++) {
           finalSongList[i] = songList[i].songId;
        }
      };

      findSongs(songList);

        return {
          ...service
        };

      }),
    songs: Songs.find(  { _id: { $in:  finalSongList  } }, { sort: { updatedAt:-1 } } ).fetch().map((song)=> {
        return {
          ...song
        };
      })

  };
}, ServiceSongList);
