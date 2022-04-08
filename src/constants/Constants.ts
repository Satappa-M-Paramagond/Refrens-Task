export const GetIDFromURL = (url: string) => {
    let id = 0;
    if (url) {
        id = url.split('/').pop();
    }
    return id;
};

export const TestIDs = {
    primaryButton: 'primaryButton',
    profileCard: 'profileCard'
};
