import React, { 
    useEffect,
    useState
} from 'react';
import  CategoryView  from "../components/CategoryView";
import cross from '../images/x.png';
import heart from '../images/heart.png';

import {
    useFirestoreDocData,
    useFirestoreDoc,
    useFirestore,
    useUser
} from 'reactfire';

import {
    createStyles,
    makeStyles
} from '@material-ui/core/styles';

const useStyles = makeStyles(({styles, palette}) => createStyles({

}));

/*export default (props) => {
    const user = useUser(undefined, {
        startWithValue: {
            uid: 'QUARANCHILL'
        }
    });
    
    const styles = useStyles();

    const docRef = useFirestore().collection('users').doc(user.uid);

    const docData = useFirestoreDocData(docRef, {
        startWithValue: {
            createdAt: '2020-03-28T23:15:19.234Z',
            likes: [],
            phoneNumber: '+12100000000',
            loading: true
        }
    });

    console.log(docData);
    console.log(user);

    const [state, setState] = useState({
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
    });
    


    const getMovies = (cat) => {
        fetch('http://www.omdbapi.com/?apikey=db4ba746&s=' + cat)
        .then(res => {
            return res.json();
        })
        .then(data => {
            // const movies = data.Search;
            // const moviesData = [];
            // for(const i = 0; i < movies.length; i++){
            //     moviesData.push({
            //         "name": movies[i].Title,
            //         "image": movies[i].Poster,
            //     });
            // }

            const moviesData = data.Search.map(movie => ({
                name: movie.Title,
                image: movie.Poster
            }));

            console.log(`Movies data:\n${moviesData}`);


            // this.setState({
            //     movies: moviesData
            // })
            setState(prevState => ({
                ...prevState,
                movies: moviesData
            }))
        })        
    }

    const getGames = () => {
        var g = [];
        fetch('https://api.rawg.io/api/games?dates=2017-01-01,2019-12-31&ordering=-added')
        .then(res => {
            return res.json();
        })
        .then(data => {
            // console.log(`Games Data:\n${JSON.stringify(data)}`);
            // var games = data.results;
            // var gamesData =[];
            // for(var i = 0; i < games.length; i++){
            //     gamesData.push({
            //         "name": games[i].name,
            //         "slug": games[i].slug,
            //         "image": games[i].background_image,
            //         "genres": games[i].tags
            //     });
            // }
            // this.setState({
            //     games: gamesData
            // })

            const gamesData = data.results.map(game => ({
                name: game.name,
                slug: game.slug,
                image: game.background_image,
                genres: game.tags
            }));

            // console.log(`GAMES DATA:\n${JSON.stringify(gamesData)}`);

            setState(prevState => ({
                ...prevState,
                gamesData
            }))
        })
    };

    const onLikeClick = () => {
        let newIndex = state.currentIndex + 1;
        let likedGame = state.games[state.currentIndex].name;

        setState(prevState => ({
            ...prevState,
            currentIndex: newIndex,
            liked: [...state.liked, likedGame]
        }));
    }

    const onDislikeClick = () => {
        let newIndex = state.currentIndex + 1;

        setState(prevState => ({
            ...prevState,
            currentIndex: newIndex
        }));
    }

    useEffect(()=> {
        getGames();
        // getMovies("batman")
    }, [])

    const markup = (
        <div>
            <CategoryView categories={state.games} currentIndex={state.currentIndex} />
            <div style={{justifyContent: "center", display: "flex", flexDirection: "row"}}>
                <img style={{width:100,height:100}} onClick={onDislikeClick} src={cross} alt='alternate'/>
                <img style={{width:100,height:100}} onClick={onLikeClick} src={heart} alt='alternate'/>         
            </div>
        </div>
    )

    return (
        markup
    )

};*/

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
            // gamesArr: []
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
                console.log(`Data:\n${JSON.stringify(data)}`);
                var games = data.results;
                var gamesData =[];
                for(var i = 0; i < games.length; i++){
                    gamesData.push({
                        "name": games[i].name,
                        "slug": games[i].slug,
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