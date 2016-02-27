import React from 'react';
import TopNav from './topnav.js';
import Home from './home.js';


React.render(<TopNav session={false} />, document.getElementById('topnav'));
React.render(<Home session={false} />, document.getElementById('app'));
