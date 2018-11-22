import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';
import PlayerCard from '../../ui/PlayerCard';
import Aguero from '../../../resources/images/players/aguero.png';
import Bernado from '../../../resources/images/players/bernado.png';
import Kevin from '../../../resources/images/players/kevin.png';
import Silva from '../../../resources/images/players/silva.png';

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
        ], 
        players: [
            {
                name: 'David',
                lastname: 'Silva',
                number: 21,
                bck: Silva
            }, {
                name: 'Bernado',
                lastname: 'Silva',
                number: 20,
                bck: Bernado
            }, {
                name: 'Kevin',
                lastname: 'De Bruyne',
                number: 17,
                bck: Kevin
            }, {
                name: 'Sergio',
                lastname: 'Aguero',
                number: 10,
                bck: Aguero
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
                    timing:{duration: 600, delay:500, ease:easePolyOut}
                }}
            >
                {(card)=> {
                    console.log('card', card);
                    return (
                        <div
                            style={{
                                position:'absolute',
                                left: card.left,
                                bottom: card.bottom
                            }}
                        >
                            <PlayerCard 
                                number={this.state.players[i].number}
                                name={this.state.players[i].name}
                                lastname={this.state.players[i].lastname}
                                bck={this.state.players[i].bck}
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