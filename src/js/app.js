import React from 'react';
import { render } from 'react-dom';
import '@babel/polyfill';
import App from './App';
import '../sass/app.scss';
import './core/physicsBase';

render(<App />, document.getElementById('app'));
