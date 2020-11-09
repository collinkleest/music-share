import React, { useEffect, useState } from "react";
import {getSpotifyToken} from "../../redux/actions/authActions";
import { useHistory } from "react-router-dom";
const queryString = require('query-string');
import { connect, useDispatch } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';



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

    const sendEmail = async () => {
        console.log("inside");
        axios.get('http://localhost:5000/api/v1/users/email')
        .then( (res) => {
            console.log("api  triggered!!");
        })
        .catch((err) => {
            console.error(err);
        })
        console.log("underrrr")
    }
    
    return (
        <div>
            <Grid container justify="center" alignitems="center" spacing={3}>
                <Grid item xs={3}>
                    <TextField id="standard-basic" label="Standard" onChange={(e) => {setSearchValue(e.target.value)}}/>
                    <Button variant="contained" color="primary" onClick={sendEmail}>
                        Search
                    </Button>
                </Grid>
            </Grid>
        </div>        
    )
}
export default connect(mapStateToProps)(Home);