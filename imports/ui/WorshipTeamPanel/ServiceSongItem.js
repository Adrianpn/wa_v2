import React from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Services } from '../../api/services';
import { Songs } from '../../api/songs';

 export const ServiceSongItem = (props) => {
   const className = props.service.selected ? 'item item--selected' : 'item';
  return (
    <div className={className} onClick={() => {
      props.Session.set('selectedServiceId', props.service._id);
    }}>
      <h5 className="item__title">{ props.service.serviceSong || 'Add Songs' }</h5>
      <p className="item__subtitle">{ moment(props.service.updatedAt).format('M/DD/YY') }</p>
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
    service: Services.findOne(selectedServiceId),
    call: Meteor.call
  };
}, ServiceSongItem);
