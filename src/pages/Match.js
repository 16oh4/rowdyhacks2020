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
            movies: [{
                "name": "",
                "image": "",
            }],
            currentIndex: 0,
            liked: [],
        }
    }
    getMovies(cat){
        fetch('http://www.omdbapi.com/?apikey=db4ba746&s=' + cat)
            .then(res => {
                return res.json();
            })
            .then(data => {
                var movies = data.Search;
                var moviesData =[];
                for(var i = 0; i < movies.length; i++){
                    moviesData.push({
                        "name": movies[i].Title,
                        "image": movies[i].Poster,
                    });
                }
                this.setState({
                    movies: moviesData
                })
            })        
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
        this.getMovies("batman")
    }
    onLikeClick = () =>{
        var newIndex = this.state.currentIndex + 1
        var likedGame = this.state.games[this.state.currentIndex];
        this.setState({
            currentIndex: newIndex,
            liked: [...this.state.liked, likedGame]
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
                    <img style={{width:100,height:100}} onClick={this.onDislikeClick} src={cross} alt='alternate'/>
                    <img style={{width:100,height:100}} onClick={this.onLikeClick} src={heart} alt='alternate'/>         
                </div>
            </div>
        )
    }
}