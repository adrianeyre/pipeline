import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import Pipeline from './components/pipeline/pipeline';

import './index.scss';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Pipeline />, document.getElementById('root'));
serviceWorker.unregister();
