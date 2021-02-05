import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
import {
    Button, Grid, FormGroup, InputLabel, Select,
    MenuItem, TextField, Box, Typography,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import axios from 'axios';
import token from '../../utils/tokenUtils';

import LocationPicker from './LocationPicker';

// new date not working yet
const DateRequest = props => {
    // const {
    //     receiverID
    // } = props;

    // dialogues open
    const [newDate, setNewDate] = useState(false);
    const [locationSelect, setLocationSelect] = useState(false);

    // date data
    const [senderDog, setSenderDog] = useState("");
    const [dateTime, setDateTime] = useState(null);
    const [locationID, setLocationID] = useState("");
    const [locationAddr, setLocationAddr] = useState("");

    // api data
    const [myDogs, setMyDogs] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    // --------------------------------------------------------------------------------
    // setters
    const changeDateSender = (e) => setSenderDog(e.target.value);
    const changeDateTime = (e) => setDateTime(e);

    // date stuff
    const toggleNewDate = () => setNewDate(() => { console.log(!newDate); return !newDate });


    // submit
    const onRequestSubmit = () => {
        // submit new date
    console.log(isLoading, pickLocation, locationID)
    }

    // togglers
    const toggleLocationSelect = () => setLocationSelect(!locationSelect);
    const closeLocationSelect = () => setLocationSelect(false);

    // pick location
    const pickLocation = (e) => {
        toggleLocationSelect();
        setLocationID(e._id);
        setLocationAddr(e.Address);
    }

    // location filter

    // --------------------------------------------------------------------------------
    // get current user dog list to set date request
    const getMyDogs = () => {
        axios.get(`/api/users/${token.getToken()}/dogs`) // get all dogs from user
            .then(res => setMyDogs([...res.data]))
            .catch((error) => console.log("loading dog list err.", error));
    }

    useEffect(() => {
        getMyDogs();
        setIsLoading(false);
    }, [])

    // --------------------------------------------------------------------------------
    const showDateRequest = () => {
        if (newDate) return (
            <Grid container direction="column" alignItems="left">
                <form>
                    <FormGroup>
                        {/* dog to date selector */}
                        <InputLabel>Which dog?</InputLabel>
                        <Select value={senderDog} onChange={changeDateSender}> {/* AAA */}
                            {myDogs.map((dog, i) => <MenuItem value={dog._id} key={i}>{dog.Name} </MenuItem>)}
                        </Select>
                        {/* date time selector */}
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDateTimePicker
                                //autoOk
                                variant="inline"
                                label="Time and Date"
                                disablePast
                                value={dateTime}
                                required
                                onChange={changeDateTime}
                            />
                        </MuiPickersUtilsProvider>
                        {/* location dialogue */}
                        <TextField
                            label="Choose your own location"
                            value={locationAddr}
                            onChange={e => setLocationAddr(e.target.value)}
                        />
                        <Typography align="center"><strong>OR</strong></Typography>
                        {/* // This will open to a full width xl scrolling body dialog box */}
                        <Button variant="contained" color="primary" onClick={toggleLocationSelect}>
                            Choose an approved location
                        </Button>

                        {/* Dialog box that has body scroll has full width and is extra large */}
                        <LocationPicker closeLocationSelect={closeLocationSelect} locationSelect={locationSelect} />

                        {/* date request button */}
                        <Box display="flex" justifyContent="space-between">
                            <Button style={{ width: '49%' }} onClick={toggleNewDate} variant="contained" color="default"> Cancel </Button>
                            <Button style={{ width: '49%' }} type="submit" onClick={onRequestSubmit} variant="contained" color="primary"> Send </Button>
                        </Box>
                    </FormGroup>
                </form>
            </Grid>
        );
        else return <> </>
    }


    return (
        <div className="button">
            <Button onClick={toggleNewDate} variant="contained" color="primary">
                Request a date
            </Button>
            <br style={{ margin: "5vh " }} />

            {showDateRequest()}
        </div>
    )
}

DateRequest.propTypes = {

}

export default DateRequest;
