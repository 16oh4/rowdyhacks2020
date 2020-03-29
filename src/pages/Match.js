import React, { 
    useEffect,
    useState
} from 'react';
// import  CategoryView  from "../components/CategoryView";
import cross from '../images/X.png';
import heart from '../images/heart.png';

import {
    useFirestoreDocData,
    useFirestore,
    useUser
} from 'reactfire';

import {
    createStyles,
    makeStyles
} from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import CardHeader from '@material-ui/core/CardHeader';

import {RowCreator, ColumnCreator, BlockCreator} from '../inc/PageCreator';
import userSchema from '../inc/userSchema';

import swal2 from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const reactSwal = withReactContent(swal2);


const useStyles = makeStyles(({styles, palette}) => createStyles({
    ...styles,
    image: {
        backgroundSize: 'cover',
        maxWidth: '100%',
        maxHeight: '40vh',
        height: '40vh'
        // maxHeight: '200px'
    },
    likeDislike: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    actionButton: {
        maxWidth: '100px'
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

export default (props) => {
    const classes = useStyles();

    const user = useUser(undefined, {
        startWithValue: {
            uid: 'QUARANCHILL'
        }
    });


    const docRef = useFirestore().collection('users').doc(user.uid);

    const docData = useFirestoreDocData(docRef, {
        // startWithValue: {
        //     createdAt: '2020-03-28T23:15:19.234Z',
        //     likes: [],
        //     phoneNumber: '+12100000000',
        // }
        startWithValue: userSchema
    });

    // console.log(docData);
    // console.log(user);
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
    const [state, setState] = useState({
        products:[],
        movies:[],
        currentIndex: 0,
        maxIndex: null,
        liked: [],
        gamesURI: 'https://api.rawg.io/api/games?dates=2017-01-01,2019-12-31&ordering=-added',
        nextGamesURI: '',
        previousGamesURI: '',
    });

    
    const [loading, setLoading] = useState(true);

    const getRandom = () => {
        setLoading(true);
        var categories = ["starwars", 'batman', 'avengers']
        var item = categories[Math.floor(Math.random() * categories.length)];
        var moviesData
        var musicData
        fetch('http://www.omdbapi.com/?apikey=db4ba746&s=' + item)
        .then(res => {
            return res.json();
        })
        .then(data => {

            moviesData = data.Search.map(movie => ({
                name: movie.Title,
                image: movie.Poster
            }));
            console.log(`Movies data:\n${moviesData}`);
            fetch('http://api.deezer.com/editorial/0/charts')
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    musicData = data.tracks.data.map(music => ({
                        name: music.title,
                        image: music.album.cover_big
                    }));
                    console.log(`musics data:\n${musicData}`);
                    fetch(state.gamesURI)
                        .then(res => {
                            return res.json();
                        })
                        .then(data => {

                            console.log(data.count);
                            console.log(data.next);
                            console.log(data.previous);


                            const games = data.results.map(game => ({
                                name: game.name,
                                image: game.background_image,
                            }));
                            var products = shuffle(games.concat(moviesData.concat(musicData)));
                            console.log(products);
                            // console.log(`GAMES DATA:\n${JSON.stringify(games)}`);
                            
                            setState(prevState => ({
                                ...prevState,
                                products,
                                maxIndex: products.length,
                                previousGamesURI: data.previous,
                                gamesURI: data.next,
                            }))

                            setLoading(false);
                        })
                        .catch(error => {
                            console.log(error);
                            setLoading(false);
                            // window.location.reload();
                        })

                })
                .catch(error => {
                    console.log(error);
                    console.log(data.count);
                    console.log(data.next);
                    console.log(data.previous);

                    fetch(state.gamesURI)
                        .then(res => {
                            return res.json();
                        })
                        .then(data => {

                            console.log(data.count);
                            console.log(data.next);
                            console.log(data.previous);


                            const games = data.results.map(game => ({
                                name: game.name,
                                image: game.background_image,
                            }));
                            var products = shuffle(games.concat(moviesData));
                            console.log(products);
                            // console.log(`GAMES DATA:\n${JSON.stringify(games)}`);

                            setState(prevState => ({
                                ...prevState,
                                products,
                                maxIndex: products.length,
                                previousGamesURI: data.previous,
                                gamesURI: data.next,
                            }))

                            setLoading(false);
                        })
                        .catch(error => {
                            console.log(error);
                            setLoading(false);
                            // window.location.reload();
                        })

                })
        })   

    }

    const updateLikes = (newLikes) => {
        setLoading(true);
        
        docRef.update({
            likes: newLikes
        })
        .then(() => {
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
        })
    }

    const onLikeClick = () => {
        let newIndex = state.currentIndex + 1;

        if(newIndex === state.maxIndex) {
            //TODO: fetch more results
            // reactSwal.fire({
            //     html: (
            //         <Typography>
            //             You've reached the end! 
            //         </Typography>
            //     )
            // })
            getRandom();
            newIndex = 0;
        }


        let newLike = state.products[state.currentIndex];
        // console.log(`Liked game:\n${JSON.stringify(newLike.name)}`)

        // let prevLikes = docData.likes.slice(0);
        let newLikes = [];
        let unique = true;
        
        // console.log(`PREV LIKES SLICED:\n${JSON.stringify(prevLikes)}`);
        
        if(docData.likes.length === 0) {
            newLikes.push(newLike.name)
        }
        else {
            docData.likes.forEach((prevLike) => {
                // console.log(`Prev like ${prevLike}\nNew like ${newLike.name}\n`)
                if(prevLike === newLike.name) {
                    unique = false;
                    // return false;
                }  
            });

            if(unique) {
                newLikes = [...docData.likes, newLike.name];
            }
            else {
                newLikes = docData.likes;
            }
        }
        // console.log(`PREV LIKES:\n${JSON.stringify(prevLikes)}`);
        // console.log(`NEW LIKES:\n${JSON.stringify(newLikes)}`);

        setState(prevState => ({
            ...prevState,
            currentIndex: newIndex,
            // liked: newLikes
            // liked: [...state.liked, likedGame.name]
        }));

        updateLikes(newLikes);  
    }

    const onDislikeClick = () => {
        let newIndex = state.currentIndex + 1;
        let currentDislike = state.products[state.currentIndex].name;


        if(newIndex === state.maxIndex) {

            newIndex = 0;

            //TODO: fetch more results
            // reactSwal.fire({
            //     html: (
            //         <Typography>
            //             You've reached the end! 
            //         </Typography>
            //     )
            // })
            // .then(() => {
            //     newIndex = 0;
            //     setState(prevState => ({
            //         ...prevState,
            //         currentIndex: newIndex
            //     }));
            // })

            getRandom();
            
        }

        let newLikes = docData.likes.filter(value => {
            if(value !== currentDislike) {
                return true;
            }
            else if(value === currentDislike) {
                return false;
            }
        });


        setState(prevState => ({
            ...prevState,
            currentIndex: newIndex
        }))

        updateLikes(newLikes);   
    }

    useEffect(()=> {
        // console.log('USE EFFECT')
        getRandom();
        // setState(prevState => ({
        //     ...prevState,
        //     liked: docData.likes
        // }));
    }, [])

    // useEffect(() => {
    //     if(state.games) {
    //         if(docData.likes[state.currentIndex] === state.games[state.currentIndex]) {
    //             let nextIndex = (state.currentIndex === state.maxIndex) ? 0: state.currentIndex + 1;
    //             setState(prevState => ({
    //                 ...prevState,
    //                 currentIndex: nextIndex
    //             }));

    //         }
    //     }
    // }, [state.currentIndex])

    // console.log(`Liked state:\n${JSON.stringify(docData.likes)}`);


    const markup = (
        <RowCreator
        >
            <ColumnCreator
                ratio={12}
            >
                {/* This is the image */}
                <BlockCreator
                    classes={classes}
                >
                    <img
                        src={state.products[state.currentIndex]?.image}
                        className={classes.image}
                    />
                    <Typography
                        variant="body2"
                        className={classes.typography}
                    >
                        {state.products[state.currentIndex]?.name}
                    </Typography>
                </BlockCreator>

                {/* For presenting the actions */}
                <Card
                    
                >
                    <CardContent
                        className={classes.likeDislike}
                    >
                        <img 
                            className={classes.actionButton}
                            onClick={onDislikeClick} 
                            src={cross} 
                            style={{width:"70px"}}
                            alt='alternate'
                        />
                        <img 
                            className={classes.actionButton}
                            onClick={onLikeClick} 
                            src={heart} 
                            alt='alternate'
                        />    
                    </CardContent>
                </Card>
            </ColumnCreator>
        </RowCreator>
    )

    return (
        !loading ? markup : <CircularProgress/>
    )

};

// export default class Match extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             games: [{
//                 "name": "",
//                 "image": "",
//                 "genres": ""
//             }],
//             movies: [{
//                 "name": "",
//                 "image": "",
//             }],
//             currentIndex: 0,
//             liked: [],
//             // gamesArr: []
//         }
//     }
//     getMovies(cat){
//         fetch('http://www.omdbapi.com/?apikey=db4ba746&s=' + cat)
//             .then(res => {
//                 return res.json();
//             })
//             .then(data => {
//                 var movies = data.Search;
//                 var moviesData =[];
//                 for(var i = 0; i < movies.length; i++){
//                     moviesData.push({
//                         "name": movies[i].Title,
//                         "image": movies[i].Poster,
//                     });
//                 }
//                 this.setState({
//                     movies: moviesData
//                 })
//             })        
//     }
//     getGames(){
//         var g = [];
//         fetch('https://api.rawg.io/api/games?dates=2017-01-01,2019-12-31&ordering=-added')
//             .then(res => {
//                 return res.json();
//             })
//             .then(data => {
//                 console.log(`Data:\n${JSON.stringify(data)}`);
//                 var games = data.results;
//                 var gamesData =[];
//                 for(var i = 0; i < games.length; i++){
//                     gamesData.push({
//                         "name": games[i].name,
//                         "slug": games[i].slug,
//                         "image": games[i].background_image,
//                         "genres": games[i].tags
//                     });
//                 }
//                 this.setState({
//                     games: gamesData
//                 })
//             })
//     }
//     componentDidMount(){
//         this.getGames();
//         this.getMovies("batman")
//     }
//     onLikeClick = () =>{
//         var newIndex = this.state.currentIndex + 1
//         var likedGame = this.state.games[this.state.currentIndex];
//         this.setState({
//             currentIndex: newIndex,
//             liked: [...this.state.liked, likedGame]
//         })
//     }
//     onDislikeClick = () => {
//         var newIndex = this.state.currentIndex + 1
//         this.setState({
//             currentIndex: newIndex
//         })
//     }
//     render(){
//         return (
//             <div>
//                 <CategoryView categories={this.state.games} currentIndex={this.state.currentIndex} />
//                 <div style={{justifyContent: "center", display: "flex", flexDirection: "row"}}>
//                     <img style={{width:100,height:100}} onClick={this.onDislikeClick} src={cross} alt='alternate'/>
//                     <img style={{width:100,height:100}} onClick={this.onLikeClick} src={heart} alt='alternate'/>         
//                 </div>
//             </div>
//         )
//     }
// }