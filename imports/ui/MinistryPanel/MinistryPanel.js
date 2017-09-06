import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PrivateHeader from '../PrivateHeader';
import { Meteor } from 'meteor/meteor';
import { Ministries } from '../../api/ministries';

export class MinistryPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ministryName: '',
      ministryGenre: ''
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

    Meteor.call('ministries.update', [name], value);
  }

  render() {

    const myMinistry = this.props.ministries[0];

    if (myMinistry) {
      this.state.ministryName = myMinistry.ministryName;
      this.state.ministryGenre = myMinistry.ministryGenre;
    }

    return (
      <div>
        <PrivateHeader title="Dashboard"/>
          <button className="button" onClick={() => {
              Meteor.call('ministries.insert', (err, res) => {
                if (res) {
                  // props.Session.set('selectedNoteId', res);
                }
              });
            }}>Create New Ministry</button>
        <div className="page-content">
          <h1>Ministry Profile</h1>
          <h3>Name</h3>
          <div className="editor">
            <input name="ministryName" className="editor__title" value={this.state.ministryName} placeholder="Name" onChange={this.handleInputChange}/>
          </div>
          <h3>Type of Ministry</h3>
          <div className="editor">
            <input name="ministryGenre" className="editor__title" value={this.state.ministryGenre} placeholder="Type of Ministry" onChange={this.handleInputChange}/>
          </div>
          <br/><br/>
          <h3>List of Members</h3>
          <h3>Church Affiliate</h3>
        </div>
      </div>
    );
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
}, MinistryPanel);
