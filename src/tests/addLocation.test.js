
import mock from './mock'
import React from 'react'
import { shallow, mount } from 'enzyme'
import AddLocation from '../components/addLocation';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Navbar from '../components/Navbar';
import PublicMap from '../components/publicMap';
import { TableSortLabel, Snackbar } from '@material-ui/core';
import { act } from 'react-dom/test-utils'

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
    center: [-96, 36.5],
    addLocations: jest.fn(),
    locations: [
        { id: 1, lat: 40.712776, lng: -74.005974 },
        { id: 2, lat: 42.360081, lng: -71.058884 },
        { id: 3, lat: 29.760427, lng: -95.369804 }],
    match: {
        params: { id: '1' }
    },
}

const Mock = { push: jest.fn() }

describe('AddLocation component renders', () => {

    it('validates onSubmit function', () => {
        const wrapper = shallow(<AddLocation history={Mock} {...props} />)
        wrapper.find(Navbar).prop('onSubmit')();
        expect(Mock.push.mock.calls[0][0]).toEqual('/');
    })

    it('checks for public map ', () => {
        const wrapper = shallow(<AddLocation history={Mock} {...props} />)
        expect(wrapper.find(PublicMap).length).toEqual(1);
    })
    it('checks for snackbar', () => {
        const wrapper = shallow(<AddLocation history={Mock} {...props} />)
        expect(wrapper.find(Snackbar)).toHaveLength(1);
    })

})