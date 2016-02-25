import React from 'react';
import TopNav from './topnav.js';
import Login from './login.js';


React.render(<TopNav authenticated={false} />, document.getElementById('topnav'));
React.render(<Login />, document.getElementById('app'));
