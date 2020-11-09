import React, { useEffect, useState } from "react";
import {getSpotifyToken} from "../../redux/actions/authActions";
import { useHistory } from "react-router-dom";
const queryString = require('query-string');
import { connect, useDispatch } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { SpotifyApiContext, Artist } from 'react-spotify-api';

const mapStateToProps = (state, ownProps) => {
    return {
        loggedIn: state.loggedIn,
        cookies: ownProps.cookies,
        spotifyToken: state.spotifyToken
    };
};

const Home = (props) => {    
    let history = useHistory();
    const dispatch = useDispatch();
    
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        let parsed = queryString.parse(history.location.search);
        console.log(parsed.token);
        if (parsed != null || parsed != undefined){
            console.log('in dispatch')
            dispatch((getSpotifyToken(parsed.token)))
        }
    }, []);


    
    return (
        <div>
            <Grid container justify="center" alignitems="center" spacing={3}>
                <Grid item xs={3}>
                    <TextField id="standard-basic" label="Standard" onChange={(e) => {setSearchValue(e.target.value)}}/>
                    <Button variant="contained" color="primary">
                        Search
                    </Button>
                </Grid>
            </Grid>
        </div>        
    )
}
export default connect(mapStateToProps)(Home);