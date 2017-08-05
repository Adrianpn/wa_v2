import React from 'react';
import PrivateHeader from '../PrivateHeader';
import { Link } from 'react-router';
import ServiceSongList from './ServiceSongList';
import { Tracker } from 'meteor/tracker';
import { Services } from '../../api/services';
import moment from 'moment';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

export class ServiceRunDownEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      };
  }

  onLogout() {
    Accounts.logout();
  }
  onSubmit(e) {

    e.preventDefault();
    var serviceSong = this.props.service.serviceSong;
    console.log(this.props.service.serviceSong);

    //() => this.props.setState({isOpen: true});


    // if (serviceSong) {
      //Meteor.call('services.update', this.props.service._id, {serviceSong});
    //   this.props.call('songs.insert', this.props.service._id,  serviceSong );
    // }
  }

  render() {
    return (
      <div>
        <PrivateHeader title="Dashboard"/>
        <div className="page-content">
          <h1>Service Run Down</h1>
          <ServiceSongList/>
          <form onSubmit={this.onSubmit.bind(this)}>
            <button>Add Songs to Rundown</button>
          </form>
        </div>
      </div>
    );
  }
};

export default createContainer(() => {
  const selectedServiceId = Session.get('selectedServiceId');

  return {
    selectedServiceId,
    service: Services.findOne(selectedServiceId),
    call: Meteor.call
  };
}, ServiceRunDownEdit);
