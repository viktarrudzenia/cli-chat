import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import store from './store';
import App from './components/App';

const BASE_URL = 'http://localhost';

ReactDOM.render(
	<Provider store={store}>
		<App baseUrl={BASE_URL}/>
	</Provider>,
	document.getElementById('root'),
);
