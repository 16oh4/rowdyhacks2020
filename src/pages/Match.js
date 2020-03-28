import React from 'react';
import  CategoryView  from "../components/CategoryView";
import cross from '../images/x.png';
import heart from '../images/heart.png';
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
    onLikeClick = () =>{
        var newIndex = this.state.currentIndex + 1
        this.setState({
            currentIndex: newIndex
        })
    }
    onDislikeClick = () => {
        var newIndex = this.state.currentIndex + 1
        this.setState({
            currentIndex: newIndex
        })
    }
    render(){
        return (
            <div>
                <CategoryView categories={this.state.games} currentIndex={this.state.currentIndex} />
                <div style={{justifyContent: "center", display: "flex", flexDirection: "row"}}>
                    <img style={{widht:100,height:100}} onClick={this.onDislikeClick} src={cross} alt='alternate'/>
                    <img style={{widht:100,height:100}} onClick={this.onLikeClick} src={heart} alt='alternate'/>         
                </div>
            </div>
        )
    }
}