import React from 'react';
import Tag from '../../ui/Tag';
import Blocks from './Blocks';

const Matches = () => {
    return (
        <div className="home_matches_wrapper">
            <div className="container">
                <Tag 
                    bck="#0e1731"
                    size="50px"
                    color="#ffffff"
                    add={{
                        padding: '5px 10px',
                        display: 'inline-block',
                        fontFamily: 'Righteous'
                    }}
                >
                MATCHES
                
                </Tag>
                
                <Blocks />

                <Tag
                    bck="#ffffff"
                    size="25px"
                    color="#0e1731"
                    link={true}
                    linkTo="/team"
                    add={{
                        padding: '5px 10px',
                        display: 'inline-block',
                        fontFamily: 'Righteous'
                    }}
                >
                    More matches
                </Tag>
            </div>
        </div>
    );
};

export default Matches;