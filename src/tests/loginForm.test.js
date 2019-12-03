
import mock from './mock'
import React from 'react'
import { shallow } from 'enzyme'
import Home from '../components/home';
import LandingPage from '../components/landing.page'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Navbar from '../components/Navbar';

Enzyme.configure({ adapter: new Adapter() });

describe('Landing component renders', () => {
    it('Navbar intially renders', () => {
        const wrapper = shallow(<Home />)
        expect(wrapper.find(Navbar)).toHaveLength(1)
    })
})