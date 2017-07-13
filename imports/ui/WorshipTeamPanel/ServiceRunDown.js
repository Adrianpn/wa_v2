import React from 'react';
import { Link } from 'react-router';
import PrivateHeader from '../PrivateHeader';

export default class ServiceRunDown extends React.Component {
  render(){
    return (
      <div>
        <PrivateHeader title="Dashboard"/>
        <div className="page-content">
          <h1>Service Run Down</h1>
        </div>
      </div>
    );
  }
}
