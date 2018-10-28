import React from 'react';
import {render} from 'react-dom';
import './core/physicsBase';
import App from './App';
import '../sass/app.scss';
import '@babel/polyfill';

render(<App/>, document.getElementById('app'));
