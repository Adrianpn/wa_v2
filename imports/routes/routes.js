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

window.browserHistory = browserHistory;

const unauthenticatedPages = ['/','/signup'];
const authenticatedPages = ['/Dashboard'];
const onEnterPublicPage = () => {
  if (Meteor.userId()){
    browserHistory.replace('/Dashboard');
  }
};
const onEnterPrivatePage = () => {
  if (!Meteor.userId()){
    browserHistory.replace('/');
  }
};
export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/Dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }

};
export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/Dashboard" component={Dashboard} onEnter={onEnterPrivatePage}/>
    <Route path="/WorshipTeamPanel" component={WorshipTeamPanel} onEnter={onEnterPrivatePage}/>
    <Route path="/ServiceRunDown" component={ServiceRunDown} onEnter={onEnterPrivatePage}/>
    <Route path="/ChurchSongLibrary" component={ChurchSongLibrary} onEnter={onEnterPrivatePage}/>
    <Route path="*" component={NotFound} onEnter={onEnterPrivatePage}/>
  </Router>
);
