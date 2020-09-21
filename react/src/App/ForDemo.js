import React from 'react';
import { 
  Link
} from 'react-router-dom';
import { Switch, FormControlLabel, Typography } from '@material-ui/core'


      // r0 features

      // account man
      // dog man
      // kennel
      // date

      
const ForDemo = props => {
  let { authState, switchChange } = props;

  return (
    <>
      <Typography variant="h4">Demo Component</Typography>
      <ul>
        <li><Link to='/'>Home page</Link></li>
        <li><Link to='/login'>Log in</Link></li>
        <li><Link to='/register'>Register</Link></li>
        <li><Link to='/myacc'>Account management</Link></li>
        <li><Link to='/myacc/mypack'>Dog man page</Link></li>
        <li><Link to='/kennel'>kennel page</Link></li>
        <li><Link to='/date'>date management</Link></li>
      </ul>

      <Typography>demo authentication states</Typography>
      <FormControlLabel
        name='loggedIn'
        label={`logged in: ${authState.loggedIn}`}
        control={
        <Switch checked={authState.loggedIn} onChange={switchChange} />
      } />

      <FormControlLabel
        name='adminAuth'
        label={`admin: ${authState.adminAuth}`}
        control={
        <Switch checked={authState.adminAuth} onChange={switchChange} disabled={!props.authState.loggedIn}/>
      } />

    </>
  )
}

export default ForDemo;
