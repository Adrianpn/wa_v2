import React from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Services } from '../../api/services';
import { Songs } from '../../api/songs';
import ReactModal from 'react-modal';
import AddSong from './AddSong';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import Delete from 'material-ui/svg-icons/action/delete';
import {blue500, yellow600} from 'material-ui/styles/colors';

export const ServiceSongItem = (props) => {

  // const className = props.service.selected ? 'item item--selected' : 'item';

  return (
    <MuiThemeProvider>
      <div>
        <List>
          {/* <Subheader inset={true}>Files</Subheader> */}
          <ListItem
            leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
            rightIcon={<Delete onClick={() => {
                const _id = Session.get('selectedServiceId');
                const songItem = props.song._id;
                console.log(props.song._id);
                Meteor.call('services.removeSong', _id, songItem);
              }}>+ Delete Song></Delete>
            }
            primaryText= { props.song.songName }
            secondaryText= { props.song.songArtist }
          />
        </List>
        <Divider inset={true} />
      </div>
    </MuiThemeProvider>
    // <div className='item'>
    //   <h3 className="item__title">{ props.song.songName || 'Add Songs' }</h3>
    //   <h5 className="item__title">{ props.song.songArtist }</h5>
    //   {/* <p className="item__subtitle">{ moment(props.song.updatedAt).format('M/DD/YY') }</p> */}
    //   <AddSong/>
    //   <button className="button" onClick={() => {
    //       const _id = Session.get('selectedServiceId');
    //       const songItem = props.song._id;
    //       console.log(props.song._id);
    //       Meteor.call('services.removeSong', _id, songItem);
    //     }}>+ Delete Song</button>
    // </div>
  );
};

// ServiceSongItem.propTypes = {
//   service: React.PropTypes.object.isRequired,
//   Session: React.PropTypes.object.isRequired
// };

// export default createContainer(() => {
//   return { Session };
// }, ServiceSongItem);

export default createContainer(() => {
  const selectedServiceId = Session.get('selectedServiceId');

  return {
    selectedServiceId,
    //service: Services.findOne(selectedServiceId),
    call: Meteor.call
  };
}, ServiceSongItem);
