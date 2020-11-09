import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { connect } from 'react-redux';
const StyledA = styled.a`
    color: white;
    text-decoration: none;
`

const StyledDiv = styled.div`
    align-items: center;
    text-align: center;
`

const mapStateToProps = (state, ownProps) => {
    return {
        loggedIn: state.loggedIn,
        cookies: ownProps.cookies,
    };
};

const MusicLogin = (props) => {
    const { cookies } = props;
    console.log(cookies.get('loggedIn'));
    return (
        <StyledDiv>
            <h1>
                Select a streaming provider to login with
            </h1>
            <StyledA href='/api/v1/spotify/login'>
                <Button variant="contained" color="primary">
                    Login with Spotify
                </Button>
            </StyledA>
            <StyledA href='#'>
                <Button variant="contained" color="primary">
                    Login with Soundcloud
                </Button>
            </StyledA>
            <StyledA href='#'>
                <Button variant="contained" color="primary">
                    Login with Apple Music
                </Button>
            </StyledA>
        </StyledDiv> 
    )
}

export default connect(mapStateToProps)(MusicLogin);