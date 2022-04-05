import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { FormHeader } from '../../../src/components';

describe('FormHeader => Snapshots => ', () => {
    test('should render properly without props', () => {
        const tree = renderer.create(<FormHeader />).toJSON();
        expect(tree).toMatchSnapshot();
        expect.assertions(1);
    });

    test('should render properly with props', () => {
        const tree = renderer
            .create(<FormHeader activePhase={1} noOfPhases={5} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
        expect.assertions(1);
    });
});
