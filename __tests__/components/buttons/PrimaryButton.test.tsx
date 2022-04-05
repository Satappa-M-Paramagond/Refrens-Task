import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import { PrimaryButton } from '../../../src/components';
import { Strings } from '../../../src/constants';

describe('PrimaryButton => Snapshots => ', () => {
    test('should render properly without props', () => {
        const { toJSON } = render(<PrimaryButton />);
        expect(toJSON()).toMatchSnapshot();
        expect.assertions(1);
    });

    test('should render properly with props', () => {
        const { toJSON } = render(<PrimaryButton text={Strings.next} />);
        expect(toJSON()).toMatchSnapshot();
        expect.assertions(1);
    });
});
