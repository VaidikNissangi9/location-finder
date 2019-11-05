import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from 'enzyme'
import LocationFinder from './components/locationFinder';
it('renders without crashing', () => {
  const wrapper=shallow(<App/>);
  expect(wrapper.contains(LocationFinder)).toEqual(true)
});
