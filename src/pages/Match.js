import React from 'react';

export default class Match extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            games: []
        }
    }
    getGames(){
        fetch('https://api.rawg.io/api/games?dates=2017-01-01,2019-12-31&ordering=-added')
            .then(res => {
                return res.json();
            })
            .then(data => {
                var games = data.results;
                var gamesData =[];
                for(var i = 0; i < games.length; i++){
                    gamesData.push({
                        "name": games[i].name,
                        "image": games[i].background_image,
                        "genres": games[i].tags
                    });
                }
                return data
            })
    }
    componentDidMount(){
        this.setState({games: this.getGames()})
    }
    render(){
        console.log(this.state);
        return (
            <h1>Match</h1>
        )
    }
}