jest.useFakeTimers();
import React from 'react';
import renderer from 'react-test-renderer';
import { ProfileController } from '../../../src/screens';
import { mount } from 'enzyme';
import {
    episodesData,
    locationsData,
    usersData
} from '../../__mock__/mockData';

const props = {
    route: {
        params: {
            characterDetails: usersData[0]
        }
    }
};

describe('ProfileController => Snapshots => ', () => {
    test('should render loading view properly', () => {
        const wrapper = mount(<ProfileController {...props} />);
        const instance = wrapper.instance() as ProfileController;
        instance.setState({
            isLoading: true
        });
        wrapper.update();

        const tree = renderer.create(<ProfileController {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
        expect.assertions(1);
    });

    test('should render empty view properly', () => {
        const wrapper = mount(<ProfileController {...props} />);
        const instance = wrapper.instance() as ProfileController;
        instance.setState({
            isLoading: false,
            characterDetails: usersData[0],
            originInfo: {},
            locationInfo: {},
            episodesList: []
        });
        wrapper.update();

        const tree = renderer.create(<ProfileController {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
        expect.assertions(1);
    });

    test('should render list view properly', () => {
        const wrapper = mount(<ProfileController {...props} />);
        const instance = wrapper.instance() as ProfileController;
        instance.setState({
            isLoading: false,
            characterDetails: usersData[0],
            originInfo: locationsData[0],
            locationInfo: locationsData[1],
            episodesList: episodesData
        });
        wrapper.update();

        const tree = renderer.create(<ProfileController {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
        expect.assertions(1);
    });
});
