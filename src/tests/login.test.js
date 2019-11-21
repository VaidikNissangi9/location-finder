
import mock from './mock'
import React from 'react'
import { shallow } from 'enzyme'
import Home from '../components/home';
import LandingPage from '../components/landing.page'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Navbar from '../components/Navbar';
import LoginForm from '../components/loginForm';

Enzyme.configure({ adapter: new Adapter() });

describe('Login component renders', () => {
  it('Login form renders', () => {
    expect(shallow(<LoginForm />))
  })
})