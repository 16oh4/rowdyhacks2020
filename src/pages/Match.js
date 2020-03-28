import React from 'react';
import  CategoryView  from "../components/CategoryView";
export default class Match extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            games: [{
                "name": "",
                "image": "",
                "genres": ""
            }],
            currentIndex: 0,
        }
    }
    getGames(){
        var g = [];
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
                this.setState({
                    games: gamesData
                })
            })
    }
    componentDidMount(){
        this.getGames();
    }
    
    render(){
        return (
            <CategoryView categories={this.state.games} currentIndex={this.state.currentIndex} />
        )
    }
}