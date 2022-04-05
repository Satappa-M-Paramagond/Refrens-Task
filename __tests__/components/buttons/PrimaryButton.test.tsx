import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { PrimaryButton } from '../../../src/components';
import { Strings } from '../../../src/constants';

describe('PrimaryButton => Snapshots => ', () => {
    test('should render properly without props', () => {
        const tree = renderer.create(<PrimaryButton />).toJSON();
        expect(tree).toMatchSnapshot();
        expect.assertions(1);
    });

    test('should render properly with props', () => {
        const tree = renderer
            .create(<PrimaryButton text={Strings.next} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
        expect.assertions(1);
    });
});
