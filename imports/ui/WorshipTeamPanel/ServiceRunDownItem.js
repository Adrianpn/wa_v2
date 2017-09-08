import React from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Ministries } from '../../api/ministries';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip=""
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

 export const ServiceRunDownItem = (props) => {
   const className = props.service.selected ? 'item item--selected' : 'item';
   const rightIconMenu = (
     <IconMenu iconButtonElement={iconButtonElement}>
       {/* <MenuItem>Reply</MenuItem>
       <MenuItem>Forward</MenuItem> */}
       <MenuItem onClick={() => {
           Meteor.call('services.remove', props.service._id);
       }}>Delete</MenuItem>
     </IconMenu>
   );

  return (
      <MuiThemeProvider>
          <List>
            <ListItem
              onClick={() => { props.Session.set('selectedServiceId', props.service._id); }}
              leftAvatar={<Avatar src="http://www.material-ui.com/images/ok-128.jpg" />}
              rightIconButton={rightIconMenu}
              primaryText={props.ministries[0].ministryName || 'Untitled Service'}
              secondaryText={
                <div>
                  {props.service.serviceDate}
                </div>
              }
              secondaryTextLines={2}
            />
            <Divider inset={true} />
        </List>
      </MuiThemeProvider>
    );
};

ServiceRunDownItem.propTypes = {
  service: React.PropTypes.object.isRequired,
  Session: React.PropTypes.object.isRequired
};

export default createContainer((props) => {
  return {
    Session,
    ministries: Ministries.find({ _id: props.service.ministryId }, { sort: { updatedAt:-1 } } ).fetch().map((ministry)=> {
      // console.log("this user " + Meteor.userId());
      return {
        ...ministry
      };
    })
   };
}, ServiceRunDownItem);
