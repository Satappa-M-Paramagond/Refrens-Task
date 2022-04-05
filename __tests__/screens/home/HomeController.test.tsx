import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import { HomeController } from '../../../src/screens';

describe('HomeController => Snapshots => ', () => {
    test('should render properly', () => {
        const { toJSON } = render(<HomeController />);
        expect(toJSON()).toMatchSnapshot();
        expect.assertions(1);
    });
});
