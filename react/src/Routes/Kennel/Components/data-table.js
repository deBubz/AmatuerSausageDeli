import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './kennel.css';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


class DataTable extends Component {

    render() {

        return (

            <Card class="dog">
                <CardContent>
                    <h3>{this.props.obj.Name}</h3>
                    <p>{this.props.obj.Breed}, {this.props.obj.Suburb}</p>
                    <Link to={this.props.obj._id}>
                    <Button variant="contained" color="primary" > View Profile </Button>
                    </Link>
                </CardContent> 
            </Card>
        );
    }
}


export default DataTable;