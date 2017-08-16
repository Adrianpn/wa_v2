import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import  Login  from '../ui/Login';
import  Signup  from '../ui/Signup';
import  Dashboard  from '../ui/Dashboard';
import  NotFound  from '../ui/NotFound';
import  WorshipTeamPanel from '../ui/WorshipTeamPanel/WorshipTeamPanel';
import  ServiceRunDown from '../ui/WorshipTeamPanel/ServiceRunDown';
import  ServiceRunDownEdit from '../ui/WorshipTeamPanel/ServiceRunDownEdit';
import  ChurchSongLibrary from '../ui/WorshipTeamPanel/ChurchSongLibrary';
import  UserProfilePage from '../ui/UserProfile/UserProfilePage';

const onEnterServicePage = (nextState) => {
  Session.set('selectedServiceId', nextState.params.id);
};
const onLeaveServicePage = (nextState) => {
  Session.set('selectedServiceId', undefined);
};
export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const isUnauthenticatedPage = currentPagePrivacy === 'unauth';
  const isAuthenticatedPage = currentPagePrivacy === 'auth';

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/Dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};

export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState);
};
export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length - 1];
  Session.set('currentPagePrivacy', lastRoute.privacy);
};
export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange}>
      <Route path="/" component={Login} privacy="unauth"/>
      <Route path="/signup" component={Signup} privacy="unauth"/>
      <Route path="/Dashboard" component={Dashboard} privacy="auth"/>
      <Route path="/WorshipTeamPanel" component={WorshipTeamPanel} privacy="auth"/>
      <Route path="/ServiceRunDown" component={ServiceRunDown} privacy="auth"/>
      <Route path="/UserProfile" component={UserProfilePage} privacy="auth"/>
      <Route path="/ServiceRunDown/:id" component={ServiceRunDownEdit} privacy="auth" onEnter={onEnterServicePage} onLeave={onLeaveServicePage}/>
      <Route path="/ChurchSongLibrary" component={ChurchSongLibrary} privacy="auth"/>
      <Route path="/ChurchSongLibrary/:id" component={ChurchSongLibrary} privacy="auth" onEnter={onEnterServicePage} onLeave={onLeaveServicePage}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);
