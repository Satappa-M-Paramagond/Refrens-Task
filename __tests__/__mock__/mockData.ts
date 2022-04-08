export const usersData = [
    {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: {
            name: 'Earth (C-137)',
            url: 'https://rickandmortyapi.com/api/location/2'
        },
        location: {
            name: 'Earth (Replacement Dimension)',
            url: 'https://rickandmortyapi.com/api/location/1'
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        episode: [
            'https://rickandmortyapi.com/api/episode/1',
            'https://rickandmortyapi.com/api/episode/2'
        ],
        url: 'https://rickandmortyapi.com/api/character/1',
        created: '2017-11-04T18:48:46.250Z'
    },
    {
        id: 2,
        name: 'Johnny Depp',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: {
            name: 'Earth (C-500A)',
            url: 'https://rickandmortyapi.com/api/location/1'
        },
        location: {
            name: 'Earth (C-500A)',
            url: 'https://rickandmortyapi.com/api/location/2'
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/2'],
        url: 'https://rickandmortyapi.com/api/character/2',
        created: '2017-12-29T18:51:29.693Z'
    }
];

export const locationsData = [
    {
        id: 1,
        name: 'Citadel of Ricks',
        type: 'Space station',
        dimension: 'unknown',
        residents: [
            'https://rickandmortyapi.com/api/character/2',
            'https://rickandmortyapi.com/api/character/1'
        ],
        url: 'https://rickandmortyapi.com/api/location/1',
        created: '2017-11-10T13:08:13.191Z'
    },
    {
        id: 2,
        name: 'Testicle Monster Dimension',
        type: 'Dimension',
        dimension: 'Testicle Monster Dimension',
        residents: [
            'https://rickandmortyapi.com/api/character/1',
            'https://rickandmortyapi.com/api/character/2'
        ],
        url: 'https://rickandmortyapi.com/api/location/2',
        created: '2017-11-18T19:41:01.605Z'
    }
];

export const episodesData = [
    {
        id: 1,
        name: 'Close Rick-counters of the Rick Kind',
        air_date: 'April 7, 2014',
        episode: 'S01E10',
        characters: [
            'https://rickandmortyapi.com/api/character/1',
            'https://rickandmortyapi.com/api/character/2'
        ],
        url: 'https://rickandmortyapi.com/api/episode/1',
        created: '2017-11-10T12:56:34.747Z'
    },
    {
        id: 2,
        name: 'The Ricklantis Mixup',
        air_date: 'September 10, 2017',
        episode: 'S03E07',
        characters: [
            'https://rickandmortyapi.com/api/character/1',
            'https://rickandmortyapi.com/api/character/2'
        ],
        url: 'https://rickandmortyapi.com/api/episode/2',
        created: '2017-11-10T12:56:36.618Z'
    }
];
