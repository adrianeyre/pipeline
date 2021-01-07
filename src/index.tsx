import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import Pipeline from './components/pipeline/pipeline';

import './index.scss';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <Pipeline />
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
