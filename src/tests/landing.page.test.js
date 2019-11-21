
import mock from './mock'
import React from 'react'
import { shallow, mount } from 'enzyme'
import { LandingPage } from '../components/landing.page'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Navbar from '../components/Navbar';

Enzyme.configure({ adapter: new Adapter() });


const historyMock = { push: jest.fn(), path: "/maps" }


describe('Landing component renders', () => {

    it('Navbar intially renders', () => {
        const wrapper = shallow(<LandingPage match={historyMock.path} />)
        expect(wrapper.find(Navbar)).toHaveLength(1)
    })

    it('validate onSubmit function', () => {
        const wrapper = mount(<LandingPage history={historyMock} match={historyMock.path} />);
        wrapper.find(Navbar).prop('onSubmit')();
        expect(historyMock.push.mock.calls[0][0]).toEqual('/login');
    })
    it('validates showMaps function', () => {
        const wrapper = mount(<LandingPage history={historyMock} match={historyMock.path} />);
        wrapper.find(Navbar).prop('showMaps')();
        
        expect(historyMock.push.mock.calls[1][0]).toEqual('/maps');
    })

})