import React, { useEffect } from "react";
import {getSpotifyToken} from "../../redux/actions/authActions";
import { useHistory } from "react-router-dom";
const queryString = require('query-string');
import { connect, useDispatch } from "react-redux";
import TextField from '@material-ui/core/TextField';

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
            <TextField id="standard-basic" label="Standard" />
        </div>        
    )
}
export default connect(mapStateToProps)(Home);