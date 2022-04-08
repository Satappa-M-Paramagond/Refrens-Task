jest.useFakeTimers();
import React from 'react';
import renderer from 'react-test-renderer';
import { FormatText } from '../../src/components';
import { Strings } from '../../src/constants';

describe('FormatText => Snapshots => ', () => {
    test('should render properly without props', () => {
        const tree = renderer.create(<FormatText />).toJSON();
        expect(tree).toMatchSnapshot();
        expect.assertions(1);
    });

    test('should render properly with props', () => {
        const tree = renderer
            .create(<FormatText title={Strings.gender} text={'Male'} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
        expect.assertions(1);
    });
});
