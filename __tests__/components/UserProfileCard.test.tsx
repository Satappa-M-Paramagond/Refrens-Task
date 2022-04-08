jest.useFakeTimers();
import React from 'react';
import renderer from 'react-test-renderer';
import { UserProfileCard } from '../../src/components';
import { Screens, TestIDs } from '../../src/constants';
import { mount } from 'enzyme';

const userInfo = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
        name: 'Earth (C-137)',
        url: 'https://rickandmortyapi.com/api/location/1'
    },
    location: {
        name: 'Earth (Replacement Dimension)',
        url: 'https://rickandmortyapi.com/api/location/20'
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [
        'https://rickandmortyapi.com/api/episode/1',
        'https://rickandmortyapi.com/api/episode/2'
    ],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z'
};

describe('UserProfileCard => Snapshots => ', () => {
    test('should render properly with props', () => {
        const tree = renderer
            .create(<UserProfileCard userInfo={userInfo} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
        expect.assertions(1);
    });
});

describe('UserProfileCard => Enzyme => ', () => {
    test('should call onPress of prop when item is pressed', () => {
        const props = {
            userInfo,
            navigation: {
                navigate: jest.fn()
            }
        };

        const wrapper = mount(<UserProfileCard {...props} />);

        wrapper
            .findWhere(n => n.prop('testID') === TestIDs.profileCard)
            .first()
            .props()
            .onPress();

        expect(props.navigation.navigate).toHaveBeenCalledWith(
            Screens.PROFILE,
            {
                characterDetails: userInfo
            }
        );
        expect.assertions(1);
    });
});
