import React from 'react';
import PrivateHeader from '../PrivateHeader';
import ServiceRunDownList from './ServiceRunDownList';
import { Services } from '../../api/services';
import { Ministries } from '../../api/ministries';
import moment from 'moment';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import DatePicker from 'material-ui/DatePicker';

// injectTapEventPlugin();

export default class ServiceRunDown extends React.Component {

  constructor(props){
    super(props);

    this.state = {
    date: null
    }

    this.handleDate = this.handleDate.bind(this);
  };

  handleDate(event, date){
    this.setState({date})
    var serviceDay = moment(date).format('LLLL');
    Meteor.call('services.insert', serviceDay);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <PrivateHeader title="Dashboard"/>
          <div className="page-content">
            <h1>Service Run Down</h1>
            <ServiceRunDownList/>
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
}
