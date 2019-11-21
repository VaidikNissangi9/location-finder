
import mock from './mock'
import React from 'react'
import { shallow, mount } from 'enzyme'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Navbar from '../components/Navbar';
import { Button } from '@material-ui/core';

Enzyme.configure({ adapter: new Adapter() });

let props = {
    showMaps: jest.fn(),
    onSubmit: jest.fn(),
}

describe('Landing component renders', () => {
    it('Navbar intially renders', () => {
        const wrapper = shallow(<Navbar />)
        expect(wrapper.find(Button)).toHaveLength(2)
    })
    it('calls the onClick function when clicked maps button ', () => {
        const wrapper = shallow(<Navbar {...props} />)
        wrapper.find(Button).at(0).props().onClick()
        expect(props.showMaps).toHaveBeenCalled()
    })
    it('calls the onClick function when clicked login button ', () => {
        const wrapper = shallow(<Navbar {...props} />)
        wrapper.find(Button).at(1).props().onClick()
        expect(props.onSubmit).toHaveBeenCalled()
    })
})