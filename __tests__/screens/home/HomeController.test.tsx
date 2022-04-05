import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { HomeController } from '../../../src/screens';
import { mount, shallow } from 'enzyme';
import { TestIDs } from '../../../src/constants';

describe('HomeController => Snapshots => ', () => {
    test('should render properly', () => {
        const tree = renderer.create(<HomeController />).toJSON();
        expect(tree).toMatchSnapshot();
        expect.assertions(1);
    });
});

describe.skip('HomeController => Enzyme => ', () => {
    test('should update state on click', () => {
        const setActivePhase = jest.fn();
        const wrapper = mount(<HomeController />);
        const handleSet = jest.spyOn(React, 'useState');
        handleSet.mockImplementation(activePhase => [
            activePhase,
            setActivePhase
        ]);

        wrapper
            .findWhere(n => n.prop('testID') === TestIDs.primaryButton)
            .first()
            .props()
            .onPress();

        expect(setActivePhase).toHaveBeenCalled();
        expect.assertions(1);
    });
});
