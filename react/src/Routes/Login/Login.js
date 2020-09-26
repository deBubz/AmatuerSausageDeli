import React, {useEffect} from 'react';  
import { Link } from 'react-router-dom';
import {
    Typography,
    Container,
    TextField,
    Button,
    Paper,
    Avatar,
    CircularProgress
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './Login.style'

function Login(props) {
    // style
    const classes = useStyles();

    const {
        onSubmit,
        email, emailHandler,
        password, passHandler,
        isError, errMsg,
        isLoading
    } = props;


    // useEffect(() => console.log(isLoading), [errMsg])
    // ----------------------------------------------------------
    return (
        <Container width="300px">
            <div>
                testAcc
                <div>e@e.com</div>
                <div>123456</div>
            </div>
            <div className={classes.paper}>
                <Paper className={classes.innerPaper} elevation={3}>

                {/* avatar thing */}
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                {/* form thing */}
                <Typography component="h1" variant="h4">Login</Typography>
                <form onSubmit={onSubmit}>
                    {/* email */}
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        required fullWidth
                        name="username"
                        autoComplete="email" // see mdn docs 
                        label="Email"
                        className={classes.text}
                        onChange={emailHandler}
                        value={email}
                    />

                    {/* password */}
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        required fullWidth
                        name="password"
                        autoComplete="current-password" // see mdn docs 
                        label="Password"
                        type="password"
                        onChange={passHandler}
                        value={password}
                        />

                    {/* submit */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        >
                            Log In
                    </Button>
                

                    {/* OH YEASSSS */}
                    <div className={classes.error}> 
                        <Typography >{ (isError && !isLoading) ? errMsg : "" } </Typography>
                        { isLoading ? <CircularProgress color="secondary"/> : <></> }
                    </div>


                
                {/* line and register link */}
                <hr className={classes.line}/>

                <Container maxWidth="xs">
                    <Link to="/register">
                        <Typography align="center">
                            Don't have an account? Register here
                        </Typography>
                    </Link>
                </Container>
            </form>




            </Paper>
            </div>
        </Container>
    );
};

export default Login;
