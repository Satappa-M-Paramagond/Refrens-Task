import 'react-native';
import React from 'react';
import App from '../App';
import { render } from '@testing-library/react-native';

describe('App => Snapshots => ', () => {
    test('should render properly', () => {
        const { toJSON } = render(<App />);
        expect(toJSON()).toMatchSnapshot();
        expect.assertions(1);
    });
});
