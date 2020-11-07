import React from 'react';
import './index.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faspotify } from '@fortawesome/free-brands-svg-icons';

const MusicLogin = (props) => {
    return (
        <div>
            <h1>
                Select a streaming provider to login with
            </h1>
            <a href='/login'>
                <Button variant="contained" color="primary">
                    Login with Spotify
                </Button>
            </a>
        </div> 
    )
}

export {MusicLogin}