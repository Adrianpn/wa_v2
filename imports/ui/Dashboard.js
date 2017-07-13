import React from 'react';
import PrivateHeader from './PrivateHeader';
import WorshipTeamPanel from './WorshipTeamPanel/WorshipTeamPanel';

export default () => {
  return(
    <div>
      <PrivateHeader title="Dashboard"/>
      <div className="page-content">
        <WorshipTeamPanel/>
      </div>
    </div>
  );
};
