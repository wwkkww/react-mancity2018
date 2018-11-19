import React, { Component } from 'react';
import Reveal from 'react-reveal';
import Stripes from '../../../resources/images/stripes.png';
import Tag from '../../ui/Tag';
import Card from './Cards';

class Players extends Component {
    state = {
        show: false
    };

    render() {
        return (
            <Reveal
                fraction={0.7}
                onReveal={()=> {
                    // console.log('reveal')
                    this.setState({
                        show: true
                    })
                }}
            >
                <div className="home_meetplayers"
                    style={{background:`#ffffff url(${Stripes})`}}
                >
                    <div className="container">
                        <div className="home_meetplayers_wrapper">
                            <div className="home_card_wrapper">
                                <Card
                                    show={this.state.show}
                                >

                                </Card>
                            </div>
                            <div className="home_text_wrapper">

                                <div>
                                    <Tag
                                        bck="#0e1731"
                                        size="100px"
                                        color="#ffffff"
                                        add={{
                                            display:'inline-block',
                                            marginBottom:'20px'
                                        }}
                                    >
                                        Meet
                                    </Tag>
                                </div>

                                <div>
                                    <Tag
                                        bck="#0e1731"
                                        size="100px"
                                        color="#ffffff"
                                        add={{
                                            display:'inline-block',
                                            marginBottom:'20px'
                                        }}
                                    >
                                        The
                                    </Tag>
                                </div>

                                <div>
                                    <Tag
                                        bck="#0e1731"
                                        size="100px"
                                        color="#ffffff"
                                        add={{
                                            display:'inline-block',
                                            marginBottom:'20px'
                                        }}
                                    >
                                        Players
                                    </Tag>
                                </div>

                                <div>
                                    <Tag
                                        bck="#ffffff"
                                        size="27px"
                                        color="#0e1731"
                                        link={true}
                                        linkTo="/team"
                                        add={{
                                            display:'inline-block',
                                            marginBottom:'30px',
                                            border:'1px solid #0e1731'
                                        }}
                                    >
                                        Meet your favourite players
                                    </Tag>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </Reveal>
            
        );
    }
}

export default Players;