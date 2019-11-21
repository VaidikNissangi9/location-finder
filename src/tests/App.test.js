
import mock from './mock'
import React from 'react'
import {shallow} from 'enzyme'
import Home from '../components/home';
import App from '../App'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LocationFinder from '../components/locationFinder';

Enzyme.configure({ adapter: new Adapter() });

describe('App component renders', ()=>{
  it('Location finder renders',()=>{
    const wrapper = shallow(<App/>)
    expect(wrapper.find(LocationFinder).exists()).toBe(true)
  })
})