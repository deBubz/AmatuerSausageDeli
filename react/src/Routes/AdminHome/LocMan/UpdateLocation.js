import React, {Component} from 'react';
import axios from "axios";
import Spinner from '../../../Common/Spinner/Spinner';
import Typography from '@material-ui/core/Typography';
import InputBox from './Components/InputBox';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

const defaultState = {   
    id: '',
    Name: '',
    Address: '',
    openTime: '',
    closeTime: '',
    isLeashRequired: false,
    hasToliet: false,
    hasBubbler: false,
    hasParking: false,
    locationImageUrl: '',
    open: false,
    setOpen: false
};

class UpdateLocation extends Component {
    constructor(props) {
        super(props);
        // sets the state using a spread
        // operator :)
        this.state = {
            ...defaultState,
            id: this.props.match.params.id
        };
    }

    componentDidMount() {
        this.setState({
            ...this.state
        });
        // axois request
        axios.get('/api/locations/' + this.state.id)
            .then(res => {
                // add the dog objects in the dogs state array
                this.setState({ ...res.data });
             })
            .catch((error) => {
                console.log(error);
            })

    }

    onChangeName = e => {this.setState({ Name: e.target.value})};
    onChangeAddress = e => {this.setState({ Address: e.target.value})};
    onChangeOpenTime = e => {this.setState({openTime: e.target.value})};
    onChangeCloseTime = e => {this.setState({ closeTime: e.target.value})};
    onChangeLocationImageUrl = e => {this.setState({ locationImageUrl: e.target.value})};
    onChangeIsLeashRequired = e => {this.setState({ isLeashRequired: e.target.checked})};
    onChangeHasToliet = e => {this.setState({ hasToliet: e.target.checked})};
    onChangeHasBubbler = e => {this.setState({ hasBubbler: e.target.checked})};
    onChangeHasParking = e => {this.setState({ hasParking: e.target.checked})};

    onChangeOpen = () => {this.setState({setOpen: true,open: true})};
    onChangeClose = () => {this.setState({setOpen: false,open: false})};

    onSubmit = e => {}

    render() {
        return (
            <div>
                <Typography component="h1" variant="h4" align="center">
                    Update Location
                </Typography>
                <form onSubmit={this.onSubmit}>
                    <InputBox label="Name" required value={this.state.Name} onChange={this.onChangeName} />
                    <InputBox label="Address" required value={this.state.Address} onChange={this.onChangeAddress} />
                    <InputBox label="Image URL" required value={this.state.locationImageUrl} onChange={this.onChangeLocationImageUrl} />
                    {/* openTime */}
                    {/* closeTime */}
                    <Box style={{ display: "flex", justifyContent: "center", margin: "1vw" }}>
                            <FormControlLabel
                                control={<Checkbox color="primary" checked={this.state.isLeashRequired} onChange={this.onChangeIsLeashRequired} />}
                                label="Leash Required?"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                control={<Checkbox color="primary" checked={this.state.hasToliet} onChange={this.onChangeHasToliet} />}
                                label="Toliet?"
                                labelPlacement="start"
                            />
                    </Box>
                    <Box style={{ display: "flex", justifyContent: "center"}}>
                            <FormControlLabel
                                control={<Checkbox color="primary" checked={this.state.hasBubbler} onChange={this.onChangeHasBubbler} />}
                                label="Bubbler?"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                control={<Checkbox color="primary" checked={this.state.hasParking} onChange={this.onChangeHasParking} />}
                                label="Parking?"
                                labelPlacement="start"
                            />
                    </Box>
                    <Box style={{ display: "flex", justifyContent: "center", margin: "1vw" }}>
                            <Button style={{ width: "300px" }} type="submit" variant="contained" color="primary">Submit</Button>
                    </Box>
                </form>
                <Box style={{ display: "flex", justifyContent: "center", margin: "1vw" }}>
                    <Button style={{ width: "300px" }} type="submit" variant="contained" color="secondary" onClick={this.onChangeOpen}>DELETE DOG</Button>
                </Box>
            </div>
        )
    }
}

export default UpdateLocation;