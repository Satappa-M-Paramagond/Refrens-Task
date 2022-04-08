jest.useFakeTimers();
import React from 'react';
import renderer from 'react-test-renderer';
import { HomeController } from '../../../src/screens';
import { mount } from 'enzyme';
import { usersData } from '../../__mock__/mockData';

describe('HomeController => Snapshots => ', () => {
    test('should render loading view properly', () => {
        const wrapper = mount(<HomeController />);
        const instance = wrapper.instance() as HomeController;
        instance.setState({
            isLoading: true
        });
        wrapper.update();

        const tree = renderer.create(<HomeController />).toJSON();
        expect(tree).toMatchSnapshot();
        expect.assertions(1);
    });

    test('should render empty view properly', () => {
        const wrapper = mount(<HomeController />);
        const instance = wrapper.instance() as HomeController;
        instance.setState({
            isLoading: false,
            characterList: [],
            activePage: 1,
            pageSize: 20,
            totalPages: 0
        });
        wrapper.update();

        const tree = renderer.create(<HomeController />).toJSON();
        expect(tree).toMatchSnapshot();
        expect.assertions(1);
    });

    test('should render list view properly', () => {
        const wrapper = mount(<HomeController />);
        const instance = wrapper.instance() as HomeController;
        instance.setState({
            isLoading: false,
            characterList: usersData,
            activePage: 1,
            pageSize: 20,
            totalPages: 10
        });
        wrapper.update();

        const tree = renderer.create(<HomeController />).toJSON();
        expect(tree).toMatchSnapshot();
        expect.assertions(1);
    });
});
