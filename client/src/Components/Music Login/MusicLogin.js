import React from 'react';
import './index.css';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const StyledA = styled.h1`
    color: white;
    text-decoration: none;
`

const StyledDiv = styled.div`
    align-items: center;
    text-align: center;
`

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