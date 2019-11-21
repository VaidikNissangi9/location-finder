
import mock from './mock'
import React from 'react'
import { shallow, mount } from 'enzyme'
import Locations from '../components/locations';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Navbar from '../components/Navbar';
import PublicMap from '../components/publicMap';
import { TableSortLabel } from '@material-ui/core';

Enzyme.configure({ adapter: new Adapter() });

// jest.mock('react-router-dom', () => ({
//     withRouter: (component) => component
//     }));

jest.mock('react-redux', () => ({
    connect: function () {
        return (component) => component
    }
}));

let props = {
    reverseLocations: jest.fn(),
    locations: [1],
    match: {
        params: { id: '1' }
    },
    handleSort: jest.fn()
}

const Mock = { push: jest.fn() }

describe('Landing component renders', () => {

    it('validate onSubmit function onClick', () => {
        const wrapper = shallow(<Locations history={Mock} {...props} />)
        wrapper.find(Navbar).prop('onSubmit')();
        expect(Mock.push.mock.calls[0][0]).toEqual('/');
    })

    it('validate showList function onClick', () => {
        const wrapper = shallow(<Locations history={Mock} {...props} />)
        wrapper.find(Navbar).prop('showList')();
        expect(Mock.push.mock.calls[1][0]).toEqual('/locations/new');
    })

    it('checks for public map ', () => {
        const wrapper = shallow(<Locations history={Mock} {...props} />)
        expect(wrapper.find(PublicMap).length).toEqual(1);
    })

})