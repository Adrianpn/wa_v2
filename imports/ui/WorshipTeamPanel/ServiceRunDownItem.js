import React from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

 export const ServiceRunDownItem = (props) => {
   const className = props.service.selected ? 'item item--selected' : 'item';
  return (
    <div className={className} onClick={() => {
      props.Session.set('selectedServiceId', props.service._id);
    }}>
      <h5 className="item__title">{ props.service.serviceDate || 'Untitled Service' }</h5>
      <p className="item__subtitle">{ moment(props.service.updatedAt).format('M/DD/YY') }</p>
    </div>
  );
};

ServiceRunDownItem.propTypes = {
  service: React.PropTypes.object.isRequired,
  Session: React.PropTypes.object.isRequired
};

export default createContainer(() => {
  return { Session };
}, ServiceRunDownItem);
