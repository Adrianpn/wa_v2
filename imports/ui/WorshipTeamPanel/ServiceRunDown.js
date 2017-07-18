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

    //Code to calculate the upcoming Sunday's Date
    var d = 0;
    do {
        d = 86440000 + d;
        var today =  new Date().valueOf();
        var serviceDay = moment(today + d).format('dddd');
        var serviceDate = moment(today + d).format('LLLL');
    }
    while (serviceDay != "Sunday");

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
