import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import SongKeyList from './SongKeyList';

export default class ChangeSongKey extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        open: false
      };
    }

    render() {
        const actions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onClick={() => this.setState({open: false})}
          />,
          <FlatButton
            label="Submit"
            primary={true}
            keyboardFocused={true}
            onClick={this.handleClose}
          />,
        ];

    return (
      <MuiThemeProvider>
        <div>
          <RaisedButton label="Change Key" onClick={() => this.setState({open: true})} />
          <Dialog
            title="Dialog With Actions"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={ () => this.setState({open: false}) }
            autoScrollBodyContent={true}
          >
            Add the Key the musicans will play the song in.<br /><br />
            {/* <SongKeyList/> */}
            <button className="button" onClick={() => {
                const _id = Session.get('selectedServiceId');
                const _serviceSongId = songList[this.props.service]._serviceSongId;
                let key = "A";
                Meteor.call('services.changeSongKey', _id, _serviceSongId, key);
                this.setState({open: false});
              }}>A</button>
            <button className="button" onClick={() => {
                const _id = Session.get('selectedServiceId');
                const _serviceSongId = songList[this.props.service]._serviceSongId;
                let key = "B";
                Meteor.call('services.changeSongKey', _id, _serviceSongId, key);
                this.setState({open: false});
              }}>B</button>
            <button className="button" onClick={() => {
                const _id = Session.get('selectedServiceId');
                const _serviceSongId = songList[this.props.service]._serviceSongId;
                let key = "C";
                Meteor.call('services.changeSongKey', _id, _serviceSongId, key);
                this.setState({open: false});
              }}>C</button>
            <button className="button" onClick={() => {
                const _id = Session.get('selectedServiceId');
                const _serviceSongId = songList[this.props.service]._serviceSongId;
                let key = "D";
                Meteor.call('services.changeSongKey', _id, _serviceSongId, key);
                this.setState({open: false});
              }}>D</button>
              <button className="button" onClick={() => {
                  const _id = Session.get('selectedServiceId');
                  const _serviceSongId = songList[this.props.service]._serviceSongId;
                  let key = "E";
                  Meteor.call('services.changeSongKey', _id, _serviceSongId, key);
                  this.setState({open: false});
                }}>E</button>
              <button className="button" onClick={() => {
                  const _id = Session.get('selectedServiceId');
                  const _serviceSongId = songList[this.props.service]._serviceSongId;
                  let key = "F";
                  Meteor.call('services.changeSongKey', _id, _serviceSongId, key);
                  this.setState({open: false});
                }}>F</button>
                <button className="button" onClick={() => {
                    const _id = Session.get('selectedServiceId');
                    const _serviceSongId = songList[this.props.service]._serviceSongId;
                    let key = "G";
                    Meteor.call('services.changeSongKey', _id, _serviceSongId, key);
                    this.setState({open: false});
                  }}>G</button>
              <button className="button" onClick={() => {
                  const _id = Session.get('selectedServiceId');
                  const _serviceSongId = songList[this.props.service]._serviceSongId;
                  let key = "F#";
                  Meteor.call('services.changeSongKey', _id, _serviceSongId, key);
                  this.setState({open: false});
                }}>F#</button>
                <button className="button" onClick={() => {
                    const _id = Session.get('selectedServiceId');
                    const _serviceSongId = songList[this.props.service]._serviceSongId;
                    let key = "C(#)";
                    Meteor.call('services.changeSongKey', _id, _serviceSongId, key);
                    this.setState({open: false});
                  }}>C#</button>
                <button className="button" onClick={() => {
                    const _id = Session.get('selectedServiceId');
                    const _serviceSongId = songList[this.props.service]._serviceSongId;
                    let key = "G(#)";
                    Meteor.call('services.changeSongKey', _id, _serviceSongId, key);
                    this.setState({open: false});
                  }}>G#</button>
                  <button className="button" onClick={() => {
                      const _id = Session.get('selectedServiceId');
                      const _serviceSongId = songList[this.props.service]._serviceSongId;
                      let key = "E(b)";
                      Meteor.call('services.changeSongKey', _id, _serviceSongId, key);
                      this.setState({open: false});
                    }}>E(flat)</button>
                  <button className="button" onClick={() => {
                      const _id = Session.get('selectedServiceId');
                      const _serviceSongId = songList[this.props.service]._serviceSongId;
                      let key = "B(b)";
                      Meteor.call('services.changeSongKey', _id, _serviceSongId, key);
                      this.setState({open: false});
                    }}>B(flat)</button>
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}
