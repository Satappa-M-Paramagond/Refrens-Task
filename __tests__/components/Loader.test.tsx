jest.useFakeTimers();
import React from 'react';
import renderer from 'react-test-renderer';
import { Loader } from '../../src/components';
import { Colors } from '../../src/constants';

describe('Loader => Snapshots => ', () => {
    test('should render properly without props', () => {
        const tree = renderer.create(<Loader />).toJSON();
        expect(tree).toMatchSnapshot();
        expect.assertions(1);
    });

    test('should render properly with props', () => {
        const tree = renderer
            .create(
                <Loader
                    containerStyle={{ backgroundColor: Colors.lightGrey }}
                    size={'large'}
                />
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
        expect.assertions(1);
    });
});
