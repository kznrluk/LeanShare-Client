import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LeanShareClient from './leanshare.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<LeanShareClient />, document.getElementById('root'));
registerServiceWorker();
