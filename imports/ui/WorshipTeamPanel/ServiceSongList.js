import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import { Services } from '../../api/services';
import ServiceSongItem from './ServiceSongItem';

export const ServiceSongList = (props) => {
  return (
    <div className="item-list">
      {/* { props.services.length === 0 ? <ServiceListEmptyItem/> : undefined } */}
      { props.services.map((service) => {
        return <ServiceSongItem key={service._id} service={service}/>;
      }) }
    </div>
  );
};

ServiceSongList.propTypes = {
  services: React.PropTypes.array.isRequired
};

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
    services: Services.find({ _id:selectedServiceId }, { sort: { updatedAt:-1 } } ).fetch().map((service)=> {
        return {
          ...service
        };
      })
  };
}, ServiceSongList);
