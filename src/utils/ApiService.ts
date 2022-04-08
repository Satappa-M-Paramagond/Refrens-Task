import axios from 'axios';

export const Axios = axios.create({
    baseURL: 'https://rickandmortyapi.com/api/',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

export const ApiMethods = {
    GET: 'GET'
};

export const ApiPaths = {
    getCharacters: 'character/',
    getLocation: 'location/',
    getEpisode: 'episode/'
};

export const ApiService = (
    apiPath: string,
    apiMethod: string,
    onSuccess: (response: any) => void,
    onFailure: (error: any) => void
) => {
    Axios({
        url: apiPath,
        method: apiMethod
    }).then(
        response => {
            onSuccess(response);
        },
        error => {
            onFailure(error);
        }
    );
};
