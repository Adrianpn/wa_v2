import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import PrivateHeader from './PrivateHeader';
import WorshipTeamPanel from './WorshipTeamPanel/WorshipTeamPanel';

injectTapEventPlugin();

export default () => {
  return(
    <MuiThemeProvider>
      <div>
        <PrivateHeader title="Dashboard"/>
        <div className="page-content">
          <WorshipTeamPanel/>
        </div>
      </div>
    </MuiThemeProvider>
  );
};
