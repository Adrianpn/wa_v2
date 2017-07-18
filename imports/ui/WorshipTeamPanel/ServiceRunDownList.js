import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import { Services } from '../../api/services';
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


  return {
    services: Services.find({}, { sort: { updatedAt:-1 } } ).fetch().map((service)=> {
      return {
        ...service,
        selected: service._id === selectedServiceId
      };
    })
  };
}, ServiceRunDownList);
//
//
// // import React from 'react';
// // import { Meteor } from 'meteor/meteor';
// // import { Tracker } from 'meteor/tracker';
// // import { Services } from '../../api/services';
// // import { Link } from 'react-router';
// //
// // export default class ServiceRunDownList extends React.Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       services: []
// //     };
// //   }
// //   componentDidMount() {
// //     console.log('componentDidMount ServicesList');
// //     this.servicesTracker = Tracker.autorun(() => {
// //       Meteor.subscribe('services');
// //       const services = Services.find().fetch();
// //       this.setState({ services });
// //     });
// //   }
// //   componentWillUnmount() {
// //     console.log('componentWillUnmount ServicesList');
// //     this.servicesTracker.stop();
// //   }
// //   renderServicesListItems() {
// //     return this.state.services.map((service) => {
// //       return (
// //         <div onClick={() => {
// //             props.Session.set('selectedServiceId', props.service._id);
// //           }}>
// //           <p>Date:  { props.service.serviceDate } </p>
// //         </div>
// //       );
// //     });
// //   }
// //   render() {
// //     return (
// //       <div>
// //         <h2>Services List</h2>
// //         <div>
// //           {this.renderServicesListItems()}
// //         </div>
// //       </div>
// //     );
// //   }
// // };
