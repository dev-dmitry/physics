import React from 'react';
import { render } from 'react-dom';
import '@babel/polyfill';
import App from './App';
import '../sass/app.scss';
import './core/physicsBase';
console.log('test');

render(<App />, document.getElementById('app'));
