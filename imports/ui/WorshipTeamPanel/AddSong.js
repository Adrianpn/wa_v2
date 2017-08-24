import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';
import ChurchSongLibraryList from './ChurchSongLibraryList';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const styles = {
  radioButton: {
    marginTop: 16,
  },
};

export default class AddSong extends  React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      error: '',
      open: false
    };
  }
  onSubmit(e) {
    const { url } = this.state;
    e.preventDefault();

    if (url) {
      Meteor.call('links.insert', url, (err, res) => {
        if(!err){
          this.handleModalClose();
        } else{
          this.setState({ error: err.reason });
        }
      });
    }
  }

  onChange(e) {
    this.setState({
      url: e.target.value
    });
  }

  handleModalClose() {
    this.setState({
      isOpen: false,
      error: ''
    });
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose () {
    this.setState({open: false});
  }

  render() {
    const actions = [
     <FlatButton
       label="Cancel"
       primary={true}
       onClick={() => this.setState({open: false})}
     />
   ];

    return (
      <MuiThemeProvider>
        <div>
          <RaisedButton label="+ Add/Change Song" onClick={() => this.setState({open: true})} />
          <Dialog
            title="Add Songs"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={() => this.setState({open: false})}
            autoScrollBodyContent={true}
          >
            {this.state.error ? <p>{this.state.error}</p> : undefined }
              <form className="boxed-view__form">
                <ChurchSongLibraryList/>
              </form>
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}
