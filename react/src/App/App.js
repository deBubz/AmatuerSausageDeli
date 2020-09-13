// messy imports
import React from 'react';
import { 
  BrowserRouter,
  Route, 
  Switch as RouterSwitch
} from 'react-router-dom';

// component imports
import ForDemo from './ForDemo'
import NavBar from '../Common/NavBar/NavBar'
import * as Routes from '../Routes/Routes'
import PrivateRoute from './PrivateRoute'

// material ui
import useStyles from './App.style';
import { Button } from '@material-ui/core';


const App = (props) => {
  const classes = useStyles();

  // demo nonsense
  const { state, handleDemoToggle, handleLogToggle } = props.thing;

  return (
    <BrowserRouter>
        <NavBar authState={state.loggedIn} />
        <div className={classes.offset}></div>

        {/* to remove later */}
        { state.showDemo ?
        <>
          <Button variant="contained" color="secondary" onClick={handleDemoToggle}>CLOSE</Button>
          <ForDemo authState={state} switchChange={handleLogToggle}/>
        </>
        :
        <></>
        }

        {/* ------------------------------------- */}

        {/* delet DemoThing later thing later */}
        <div className={state.showDemo ? classes.borderThing : null}>
        {/* <div> */}
        <RouterSwitch>
          {/* setup isLoggedin bool for this to redirect to kennel if logged in */}
          <Route exact path='/' component={() => <Routes.Home loggedIn={state.loggedIn} />} />
          <Route path='/login' component={Routes.Login} />
          <Route path='/register' component={Routes.Register} />
          
          {/* only logged in users can see these */}
          <PrivateRoute path='/myacc' component={Routes.AccountMan} />
          <PrivateRoute path='/myacc/mypack' component={Routes.DogMan} />
          <PrivateRoute path='/kennel' component={Routes.Kennel} /> {/* might be removed/ combine with home */}
          <PrivateRoute path='/date' component={Routes.Dates} />
          <PrivateRoute path='/date/id' component={Routes.RateDate} />
          <PrivateRoute path='/admin' component={Routes.AdminHome} />

          <Route component={Routes.NotFound} />
        </RouterSwitch>
        </div>

        <p>Footer component</p>
    </BrowserRouter>
  )
};


export default App;