import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import { FormHeader } from '../../../src/components';

describe('FormHeader => Snapshots => ', () => {
    test('should render properly without props', () => {
        const { toJSON } = render(<FormHeader />);
        expect(toJSON()).toMatchSnapshot();
        expect.assertions(1);
    });

    test('should render properly with props', () => {
        const { toJSON } = render(
            <FormHeader activePhase={1} noOfPhases={5} />
        );
        expect(toJSON()).toMatchSnapshot();
        expect.assertions(1);
    });
});
