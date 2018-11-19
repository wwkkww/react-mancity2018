import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';
import PlayerCard from '../../ui/PlayerCard';
import Otamendi from '../../../resources/images/players/Otamendi.png';

class Cards extends Component {
    state = {
        cards: [
            {
                bottom: 90,
                left: 300
            },{
                bottom: 60,
                left: 200
            },{
                bottom: 30,
                left: 100
            },{
                bottom: 0,
                left: 0
            }
        ]
    };

    showAnimateCards= () => (
        this.state.cards.map((card,i)=> (
            <Animate
                key={i}
                show={this.props.show}
                start={{
                    left:0,
                    bottom:0
                }}
                enter={{
                    left:[card.left],
                    bottom:[card.bottom],
                    timing:{duration: 600, ease:easePolyOut}
                }}
            >
                {(card)=> {
                    return (
                        <div
                            style={{
                                position:'absolute',
                                left: card.left,
                                bottom: card.bottom
                            }}
                        >
                            <PlayerCard 
                                number="99"
                                name="Nicholas"
                                lastname="Otamendi"
                                bck={Otamendi}
                            />
                        </div>
                    )
                }}
            </Animate>
        ))
    );

    render() {
        return (
            <div>
                {this.showAnimateCards()}
            </div>
        );
    }
}

export default Cards;