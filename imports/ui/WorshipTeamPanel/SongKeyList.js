import React from 'react';
import moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { Services } from '../../api/services';
import ReactModal from 'react-modal';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const styles = {
  radioButton: {
    marginTop: 16,
  },
};

const radios = [];
  radios.push(
    <RadioButton key={1} value={`value${"A"}`} label={`Option ${"A"}`} style={styles.radioButton} />
  );
  radios.push(
    <RadioButton key={2} value={`value${"B"}`} label={`Option ${"B"}`} style={styles.radioButton} />
  );

export default class SongKeyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: []
    };
  }
  componentDidMount() {
    console.log('componentDidMount servicesList');
    this.servicesTracker = Tracker.autorun(() => {
      Meteor.subscribe('services');
      const _id = Session.get('selectedServiceId');
      const services = Services.find().fetch();
      const serviceItem = services._id;
      this.setState({ services });
    });
  }
  componentWillUnmount() {
    console.log('componentWillUnmount servicesList');
    this.servicesTracker.stop();
  }
  renderServicesListItems() {
    return this.state.services.map((service) => {
      return (
        <div key={service._id}>
          <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
            {radios}
          </RadioButtonGroup>
        </div>
        // <div key={service._id}>
        //   <List>
        //     {/* <Subheader inset={true}>Files</Subheader> */}
        //     <ListItem
        //       onClick={() => {
        //           const _id = Session.get('selectedServiceId');
        //           const serviceItem = service._id;
        //           Meteor.call('services.update', _id, serviceItem);
        //         }}
        //       leftAvatar={<Avatar icon={<AvLibraryMusic />} backgroundColor={blue500} />}
        //       primaryText= { service.serviceName }
        //       secondaryText= { service.serviceArtist }
        //     />
        //   </List>
        //   <Divider inset={true} />
        // </div>
      )
    });
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
            {this.renderServicesListItems()}
        </div>
      </MuiThemeProvider>
    );
  }
};
