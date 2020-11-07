import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faspotify } from '@fortawesome/free-brands-svg-icons';
import styled from "styled-components";

const StyledDiv = styled.div`
  align-items: center;
  text-align: center;
`;

const StyledA = styled.a`
    color: white;
    text-decoration: none;
`;

const MusicLogin = (props) => {
    return (
        <StyledDiv>
            <h1>
                Select a streaming provider to login with
            </h1>
            <StyledA href='/login'>
                <Button variant="contained" color="primary">
                    Login with Spotify
                </Button>
            </StyledA>
        </StyledDiv> 
    )
}

export {MusicLogin}