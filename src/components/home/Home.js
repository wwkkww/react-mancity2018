import React from 'react';
import Featured from './featured/Featured';
import Matches from './matches/Matches';
import Players from './players/Players';
import Promotion from './promotion/Promotion';

const Home = () => {
    return (
        <div className="bck_blue">
            <Featured />
            <Matches />
            <Players />
            <Promotion />
        </div>
    );
};

export default Home;