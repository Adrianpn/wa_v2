import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PrivateHeader from '../PrivateHeader';
import { Meteor } from 'meteor/meteor';

export class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    if ([name] == "firstName")
      {
        Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.firstName": value }});
      }
      else {
        Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.lastName": value }});
      }
  }

  render() {

    if (this.props.user) {
      this.state.firstName = this.props.user.profile.firstName;
      this.state.lastName = this.props.user.profile.lastName;
    }

    return (
      <div>
        <PrivateHeader title="Dashboard"/>
        <div className="page-content">
          <h1>User Profile</h1>
          <h3>First Name</h3>
          <div className="editor">
            <input name="firstName" className="editor__title" value={this.state.firstName} placeholder="First Name" onChange={this.handleInputChange}/>
          </div>
          <h3>Last Name</h3>
          <div className="editor">
            <input name="lastName" className="editor__title" value={this.state.lastName} placeholder="Last Name" onChange={this.handleInputChange}/>
          </div>
          <br/><br/>
        </div>
      </div>
    );
  }
};

export default createContainer(() => {

  return {
    user: Meteor.user(),
    }

}, UserProfilePage);
