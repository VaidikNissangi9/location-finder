
import mock from './mock'
import React from 'react'
import { shallow, mount } from 'enzyme'
import Home from '../components/home';
import LandingPage from '../components/landing.page'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Navbar from '../components/Navbar';

Enzyme.configure({ adapter: new Adapter() });


const historyMock = { push: jest.fn() }


describe('Landing component renders', () => {

  it('checks for Navbar', () => {
    const wrapper = shallow(<Home />)
    expect(wrapper.find(Navbar)).toHaveLength(1)
  })

  it('validate onSubmit function', () => {
    const wrapper = mount(<Home history={historyMock} />);
    wrapper.find(Navbar).prop('onSubmit')();
    expect(historyMock.push.mock.calls[0][0]).toEqual('/');
  })
  it('validates showList function', () => {
    const wrapper = mount(<Home history={historyMock} />);
    wrapper.find(Navbar).prop('showList')();
    // console.log(historyMock.push.mock.calls)
    expect(historyMock.push.mock.calls[1][0]).toEqual('/locations');
  })

})