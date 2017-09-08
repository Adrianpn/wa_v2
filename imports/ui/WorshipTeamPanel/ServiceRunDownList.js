import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import { Services } from '../../api/services';
//import { Ministries } from '../../api/ministries';
import ServiceRunDownItem from './ServiceRunDownItem';

export const ServiceRunDownList = (props) => {

  return (
    <div className="item-list">
      {/* { props.services.length === 0 ? <ServiceListEmptyItem/> : undefined } */}
      { props.services.map((service) => {
        return <ServiceRunDownItem key={service._id} service={service}/>;
      }) }
    </div>
  );
};

ServiceRunDownList.propTypes = {
  services: React.PropTypes.array.isRequired
};

export default createContainer(() => {
  const selectedServiceId = Session.get('selectedServiceId');
  Meteor.subscribe('services');
  //Meteor.subscribe('ministries');

  return {
    services: Services.find({}, { sort: { updatedAt:-1 } } ).fetch().map((service)=> {
      //console.log(service);
      return {
        ...service,
        selected: service._id === selectedServiceId
      };
    })
    // ministries: Ministries.find({ "ministryMembers.memberId": Meteor.userId() }, { sort: { updatedAt:-1 } } ).fetch().map((ministry)=> {
    //   console.log("test ");
    //   // console.log("this user " + Meteor.userId());
    //   return {
    //     ...ministry
    //   };
    // })
  };
}, ServiceRunDownList);
