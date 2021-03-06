import React, { Component } from 'react';
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import token from '../../utils/tokenUtils'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DogCard from './Components/DogCard'
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

// Default state to view all the users current dogs
// We only need an array of dogs and the UserId 
const defaultState = {
    dogs: [],
    UserId: '',
    loading: true,
};

// Component for viewing all of a user's dogs
class DogMan extends Component {
    constructor(props) {
        super(props);
        // sets the state using a spread
        // operator :)
        this.state = { ...defaultState };
    }

    // Special function that onLoad
    componentDidMount() {
        this.setState({
            ...this.state,
            UserId: token.getID()
        });
        // Axios request to grab all the user's dogs
        axios.get('/api/users/' + token.getID() + '/dogs')
            .then(res => {
                // add the dog objects in the dogs state array
                this.setState({
                    dogs: res.data,
                });
            })
            .then(() => this.setState({ loading: false }))
            .catch((error) => console.log(error))
    }

    render() {
        return (
            <div>
                <Paper style={{ margin: "10px", padding: "10px" }}>
                    <Typography component="h1" variant="h4" align="center" style={{margin: "10px"}}>
                        <span role="img" aria-labelledby="dog">🐶</span> My Pack <span role="img" aria-labelledby="dog">🐶</span>
                    </Typography>

                    {
                        this.state.loading ?
                        <Spinner />
                        :
                        <Grid container spacing={2} style={{ marginLeft: 5 }}>
                            {this.state.dogs.map(dog => <DogCard obj={dog} />)}
                        </Grid>
                    }

                    <br />
                    <Box style={{ display: "flex", justifyContent: "center", margin: "1vw" }}>
                        <Link to={'/myacc/mypack/newdog'} >

                            <Button style={{ width: "300px", margin: "10px" }} type="submit" variant="contained" color="primary">
                                Create New Dog
                            </Button>
                        </Link>
                    </Box>
                </Paper>
            </div>
        );
    }

}

export default DogMan;