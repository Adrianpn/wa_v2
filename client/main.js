import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Tracker.autorun(() => {
  const selectedServiceId = Session.get('selectedServiceId');
  //Session.set('isNavOpen', false);

  if (selectedServiceId) {
    browserHistory.replace(`/ServiceRunDown/${selectedServiceId}`);
  }
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
