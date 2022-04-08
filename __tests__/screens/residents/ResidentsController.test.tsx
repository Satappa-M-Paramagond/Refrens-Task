jest.useFakeTimers();
import React from 'react';
import renderer from 'react-test-renderer';
import { ResidentsController } from '../../../src/screens';
import { mount } from 'enzyme';
import { usersData } from '../../__mock__/mockData';

const props = {
    route: {
        params: {
            residents: '1,2'
        }
    }
};

describe('ResidentsController => Snapshots => ', () => {
    test('should render loading view properly', () => {
        const wrapper = mount(<ResidentsController {...props} />);
        const instance = wrapper.instance() as ResidentsController;
        instance.setState({
            isLoading: true
        });
        wrapper.update();

        const tree = renderer
            .create(<ResidentsController {...props} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
        expect.assertions(1);
    });

    test('should render empty view properly', () => {
        const wrapper = mount(<ResidentsController {...props} />);
        const instance = wrapper.instance() as ResidentsController;
        instance.setState({
            isLoading: false,
            residentsIDs: '1,2',
            residentsList: []
        });
        wrapper.update();

        const tree = renderer
            .create(<ResidentsController {...props} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
        expect.assertions(1);
    });

    test('should render list view properly', () => {
        const wrapper = mount(<ResidentsController {...props} />);
        const instance = wrapper.instance() as ResidentsController;
        instance.setState({
            isLoading: false,
            residentsIDs: '1,2',
            residentsList: usersData
        });
        wrapper.update();

        const tree = renderer
            .create(<ResidentsController {...props} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
        expect.assertions(1);
    });
});
