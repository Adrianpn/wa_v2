import React from 'react';
import PrivateHeader from '../PrivateHeader';
import { Link } from 'react-router';
import ServiceRunDownList from './ServiceRunDownList';
import { Tracker } from 'meteor/tracker';
import { Services } from '../../api/services';
import moment from 'moment';


export default class ServiceRunDown extends React.Component {
  onLogout() {
    Accounts.logout();
  }
  onSubmit(e) {

    var today =  new Date().valueOf();
    const serviceDate = moment(today).format('dddd');
    console.log(today);

    e.preventDefault();

    if (serviceDate) {
      Meteor.call('services.insert', serviceDate);
    }
  }

  render() {
    return (
      <div>
        <PrivateHeader title="Dashboard"/>
        <div className="page-content">
          <h1>Service Run Down</h1>
          <ServiceRunDownList/>
          <form onSubmit={this.onSubmit.bind(this)}>
            <button>Create Service Rundown</button>
          </form>
        </div>
      </div>
    );
  }
};
