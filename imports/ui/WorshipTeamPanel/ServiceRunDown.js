import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PrivateHeader from '../PrivateHeader';
import ServiceRunDownList from './ServiceRunDownList';
import { Services } from '../../api/services';
import { Ministries } from '../../api/ministries';
import moment from 'moment';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import DatePicker from 'material-ui/DatePicker';

// injectTapEventPlugin();

export class ServiceRunDown extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        date: null
      }
    this.handleDate = this.handleDate.bind(this);
  };



  handleDate(event, date, props){
    this.setState({date})
    var serviceDay = moment(date).format('LLLL');
    var ministryId = this.props.ministries[0]._id
    Meteor.call('services.insert', serviceDay, ministryId);
  }

  render() {

    return (
      <MuiThemeProvider>
        <div>
          <PrivateHeader title="Dashboard"/>
          <div className="page-content">
            <h1>Service Run Down</h1>
            <ServiceRunDownList ministries={this.props.ministries}/>
            <DatePicker
              hintText="Enter Service Date"
              onChange={this.handleDate}
              locale="en-US"
              firstDayOfWeek={0}
            />
          </div>
        </div>
      </MuiThemeProvider>
      )
    }
};

export default createContainer(() => {
  Meteor.subscribe('ministries');

  return {
    //ministries: Ministries.find({ "ministryMembers" : Meteor.userId() }).fetch(),

    ministries: Ministries.find({ "ministryMembers.memberId" : Meteor.userId() }, { sort: { updatedAt:-1 } } ).fetch().map((ministry)=> {
      return {
        ...ministry
      };
    })
  }
}, ServiceRunDown);
