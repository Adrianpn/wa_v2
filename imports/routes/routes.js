import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import  Login  from '../ui/Login';
import  Signup  from '../ui/Signup';
import  Dashboard  from '../ui/Dashboard';
import  NotFound  from '../ui/NotFound';
import  WorshipTeamPanel from '../ui/WorshipTeamPanel/WorshipTeamPanel';
import  ServiceRunDown from '../ui/WorshipTeamPanel/ServiceRunDown';
//import  ServiceRunDownList from '../ui/WorshipTeamPanel/ServiceRunDownList';
//import  ServiceRunDownItem from '../ui/WorshipTeamPanel/ServiceRunDownItem';
import  ChurchSongLibrary from '../ui/WorshipTeamPanel/ChurchSongLibrary';

const onEnterNotePage = (nextState) => {
  Session.set('selectedServiceId', nextState.params.id);
};
const onLeaveNotePage = (nextState) => {
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

//window.browserHistory = browserHistory;

// const unauthenticatedPages = ['/','/signup'];
// const authenticatedPages = ['/Dashboard'];
// const onEnterPublicPage = () => {
//   if (Meteor.userId()){
//     browserHistory.replace('/Dashboard');
//   }
// };
// const onEnterPrivatePage = () => {
//   if (!Meteor.userId()){
//     browserHistory.replace('/');
//   }
// };
// export const onAuthChange = (isAuthenticated) => {
//   const pathname = browserHistory.getCurrentLocation().pathname;
//   const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
//   const isAuthenticatedPage = authenticatedPages.includes(pathname);
//
//   if (isUnauthenticatedPage && isAuthenticated) {
//     browserHistory.replace('/Dashboard');
//   } else if (isAuthenticatedPage && !isAuthenticated) {
//     browserHistory.replace('/');
//   }
//
// };
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
      <Route path="/ServiceRunDown/:id" component={ServiceRunDown} privacy="auth" onEnter={onEnterNotePage} onLeave={onLeaveNotePage}/>
      <Route path="/ChurchSongLibrary" component={ChurchSongLibrary} privacy="auth"/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);
