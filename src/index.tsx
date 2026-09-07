import React from 'react';
import { createRoot } from 'react-dom/client';

import Pipeline from './components/pipeline/pipeline';
import reportWebVitals from './reportWebVitals';

import './index.scss';

const container = document.getElementById('root');
if (!container) throw new Error('No #root element to mount the game into');

createRoot(container).render(
	<React.StrictMode>
		<Pipeline />
	</React.StrictMode>,
);

reportWebVitals();
