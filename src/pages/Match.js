import React, { 
    useEffect,
    useState
} from 'react';
// import  CategoryView  from "../components/CategoryView";
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

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import swal2 from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';

import {RowCreator, ColumnCreator, BlockCreator} from '../inc/PageCreator';

const reactSwal = withReactContent(swal2);

const useStyles = makeStyles(({styles, palette}) => createStyles({
    ...styles,
    image: {
        backgroundSize: 'cover',
        maxWidth: '100%',
        // maxHeight: '200px'
    },
    likeDislike: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    actionButton: {
        maxWidth: '30%'
    }
}));

export default (props) => {
    const classes = useStyles();

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

    // console.log(docData);
    // console.log(user);

    const [state, setState] = useState({
        games:[],
        movies:[],
        currentIndex: 0,
        maxIndex: null,
        liked: [],
    });

    const [loading, setLoading] = useState(true);

    const getMovies = (cat) => {
        fetch('http://www.omdbapi.com/?apikey=db4ba746&s=' + cat)
        .then(res => {
            return res.json();
        })
        .then(data => {

            const moviesData = data.Search.map(movie => ({
                name: movie.Title,
                image: movie.Poster
            }));

            console.log(`Movies data:\n${moviesData}`);

            setState(prevState => ({
                ...prevState,
                movies: moviesData
            }))
        })        
    }

    const getGames = () => {
        setLoading(true);
        fetch('https://api.rawg.io/api/games?dates=2017-01-01,2019-12-31&ordering=-added')
        .then(res => {
            return res.json();
        })
        .then(data => {

            const games = data.results.map(game => ({
                name: game.name,
                slug: game.slug,
                image: game.background_image,
                genres: game.tags
            }));


            // console.log(`GAMES DATA:\n${JSON.stringify(games)}`);

            setState(prevState => ({
                ...prevState,
                games,
                maxIndex: games.length
            }))

            setLoading(false);
        })
        .catch(error => {
            console.log(error);
            setLoading(false);
            // window.location.reload();
        })
    };

    const onLikeClick = () => {
        let newIndex = state.currentIndex + 1;

        if(newIndex === state.maxIndex) {
            //TODO: fetch more results
            reactSwal.fire({
                html: (
                    <Typography>
                        You've reached the end! 
                    </Typography>
                )
            })
            newIndex = 0;
        }


        let newLike = state.games[state.currentIndex];
        // console.log(`Liked game:\n${JSON.stringify(newLike.name)}`)

        let prevLikes = state.liked.slice(0);
        let newLikes = [];
        let unique = true;
        
        console.log(`PREV LIKES SLICED:\n${JSON.stringify(prevLikes)}`);
        
        if(prevLikes.length === 0) {
            newLikes.push(newLike.name)
        }
        else {
            prevLikes.forEach((prevLike) => {
                console.log(`Prev like ${prevLike}\nNew like ${newLike.name}\n`)
                if(prevLike === newLike.name) {
                    unique = false;
                    // return false;
                }  
            });

            if(unique) {
                newLikes = [...prevLikes, newLike.name];
            }
            else {
                newLikes = prevLikes;
            }
        }

        
        


        console.log(`PREV LIKES:\n${JSON.stringify(prevLikes)}`);
        console.log(`NEW LIKES:\n${JSON.stringify(newLikes)}`);

        setState(prevState => ({
            ...prevState,
            currentIndex: newIndex,
            liked: newLikes
            // liked: [...state.liked, likedGame.name]
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

    console.log(`Liked state:\n${JSON.stringify(state.liked)}`);


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
                        src={state.games[state.currentIndex]?.image}
                        className={classes.image}
                    />
                    <Typography
                        variant="body2"
                        className={classes.typography}
                    >
                        {state.games[state.currentIndex]?.name}
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