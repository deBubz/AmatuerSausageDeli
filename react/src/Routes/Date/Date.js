/* 
    main date page
*/
import React from 'react';
import axios from 'axios';
import token from '../../Helpers/token';
import { Button, Container, Grid } from '@material-ui/core'

import RequestedDialog from './Components/RequestedDate/RequestedDialog';
import UpcomingDialog from './Components/UpcomingDate/UpcomingDialog';
import CompletedDialog from './Components/CompletedDate/CompletedDateItems';
import Spinner from '../../Common/Spinner/Spinner';

class Dates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requested: [],
            upcoming: [],
            completed: [],
            requestList: false,
            upcomingList: false,
            completedList: false,
            loading: true,
        };
        this.handleRequested = this.handleRequested.bind(this);
        this.handleCompleted = this.handleCompleted.bind(this);
        this.handleUpcoming = this.handleUpcoming.bind(this);   
    }

    // load the dates on start
    componentDidMount() {
        axios.get(`/api/date/${token().id}/`)
            .then(res => this.setState({
                requestList: true,
                requested: res.data.requested,
                upcoming: res.data.upcoming,
                completed: res.data.completed
            }))
            .then(() => this.setState({ loading: false }))
            .catch(function (error) { console.log(error) });
    }

    // swap which list to display
    resetDisplay() {
        this.setState({
            requestList: false,
            upcomingList: false,
            completedList: false
        })
    }
    handleRequested() {
        this.resetDisplay();
        this.setState({requestList: true})
    }

    handleUpcoming() {
        this.resetDisplay();
        this.setState({upcomingList: true})
    }

    handleCompleted() {
        this.resetDisplay();
        this.setState({completedList: true})
    }    

    // each date category
    requestedDates = (list) =>
        list.map((data, i) => <RequestedDialog obj={data} key={i} />)

    upcomingDates = (list) => 
        list.map((data, i) => <UpcomingDialog obj={data} key={i} />)

    completedDates = (list) => 
        list.map((data, i) => <CompletedDialog obj={data} key={i} />)

    render() {
        return (
            <Container fluid>
                <h2>My Dates</h2>

                <br />
                <Grid container justify="space-between" direction="row" alignItems="center">
                    <Grid item><Button variant="contained" color={this.state.requestList ? "primary" : "default"} onClick={this.handleRequested}>Requested</Button></Grid>
                    <Grid item><Button variant="contained" color={this.state.upcomingList ? "primary" : "default"} onClick={this.handleUpcoming}>Upcoming</Button></Grid>
                    <Grid item><Button variant="contained" color={this.state.completedList ? "primary" : "default"} onClick={this.handleCompleted}>Completed</Button></Grid>
                </Grid>

                {
                    this.state.loading ?
                    <Spinner />
                    :
                    <>  {/* loaded content */}
                        <br/>
                        {/* items */}
                        <Grid>
                            {(this.state.requestList) ? this.requestedDates(this.state.requested) : ''}
                            {(this.state.upcomingList) ? this.upcomingDates(this.state.upcoming) : ''}
                            {(this.state.completedList) ? this.completedDates(this.state.completed) : ''}
                        </Grid>
                </>
                    }
            </Container>
        )
    }
}

export default Dates;