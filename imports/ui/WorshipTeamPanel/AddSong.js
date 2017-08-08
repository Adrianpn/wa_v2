import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';
import ChurchSongLibraryList from './ChurchSongLibraryList';

export default class AddSong extends  React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      error: ''
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

  render() {
    return (
      <div>
        <button className="button" onClick={() => this.setState({isOpen: true})}>+ Add/Change Song</button>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.handleModalClose.bind(this)}
          contentLabel="Add Link"
          className="boxed-view__songs"
          overlayClassName="boxed-view boxed-view--modal">
          <h1>Add Songs</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined }
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
            <ChurchSongLibraryList/>
            <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
          </form>
        </Modal>
      </div>
    );
  }
}
