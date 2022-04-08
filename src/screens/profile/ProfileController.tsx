import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    Image,
    ScrollView,
    RefreshControl,
    TouchableOpacity
} from 'react-native';
import { FormatText, Loader, PrimaryButton } from '../../components';
import { Colors, GetIDFromURL, Scale, Screens, Strings } from '../../constants';
import { ApiMethods, ApiPaths, ApiService } from '../../utils';
import FontIcon from 'react-native-vector-icons/FontAwesome5';

export class ProfileController extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            characterDetails: props.route.params.characterDetails,
            originInfo: {},
            locationInfo: {},
            episodesList: [],
            isLoading: false,
            isRefreshing: false
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true }, () => {
            this.handleApiCall();
        });
    }

    handleRefresh = () => {
        this.setState({ isRefreshing: true }, () => {
            this.handleApiCall();
        });
    };

    handleApiCall = () => {
        const { characterDetails }: any = this.state;
        const originId = GetIDFromURL(characterDetails?.origin?.url);

        const locationID = GetIDFromURL(characterDetails?.location?.url);
        let episodeIds: Array<number> = [];
        if (characterDetails?.episode) {
            characterDetails?.episode.map((episode: any) => {
                episodeIds.push(GetIDFromURL(episode));
            });
        }

        ApiService(
            `${ApiPaths.getLocation + originId}`,
            ApiMethods.GET,
            this.handleOriginSuccess,
            this.handleFailure
        );

        ApiService(
            `${ApiPaths.getLocation + locationID}`,
            ApiMethods.GET,
            this.handleLocationSuccess,
            this.handleFailure
        );

        ApiService(
            `${ApiPaths.getEpisode + episodeIds}`,
            ApiMethods.GET,
            this.handleEpisodesSuccess,
            this.handleFailure
        );
    };

    handleOriginSuccess = (response: any) => {
        if (response?.data) {
            this.setState({
                originInfo: response.data
            });
        }
    };

    handleLocationSuccess = (response: any) => {
        if (response?.data) {
            this.setState({
                locationInfo: response.data
            });
        }
    };

    handleEpisodesSuccess = (response: any) => {
        if (response?.data) {
            this.setState({
                episodesList: response.data
            });
        }
        this.handleRemoveLoaders();
    };

    handleFailure = (error: any) => {
        Alert.alert(JSON.stringify(error));
        this.handleRemoveLoaders();
    };

    handleRemoveLoaders = () => {
        this.setState({
            isLoading: false,
            isRefreshing: false
        });
    };

    handleViewResidentsPress = (residents: any[]) => {
        let residentIDs: Array<number> = [];
        if (residents.length > 0) {
            residents.map((resident: any) => {
                residentIDs.push(GetIDFromURL(resident));
            });
        }

        this.props.navigation.navigate(Screens.RESIDENTS, {
            residents: residentIDs.toString()
        });
    };

    renderUserInfo = () => {
        const { characterDetails }: any = this.state;

        return (
            <View style={[styles.userContainer, styles.card]}>
                <Image
                    source={{ uri: characterDetails.image }}
                    style={styles.profilePic}
                />
                <View style={styles.userDetailsContainer}>
                    <Text style={styles.userName}>{characterDetails.name}</Text>
                    <FormatText
                        title={Strings.gender}
                        text={characterDetails.gender}
                    />
                    <FormatText
                        title={Strings.species}
                        text={characterDetails.species}
                    />
                    <FormatText
                        title={Strings.status}
                        text={characterDetails.status}
                    />
                </View>
            </View>
        );
    };

    renderOrigin = () => {
        const { originInfo }: any = this.state;

        if (originInfo && !!originInfo) {
            return (
                <View style={styles.card}>
                    <Text style={styles.headerTitle}>{Strings.origin}</Text>

                    <FormatText title={Strings.name} text={originInfo?.name} />
                    <FormatText title={Strings.type} text={originInfo?.type} />
                    <FormatText
                        title={Strings.dimension}
                        text={originInfo?.dimension}
                    />
                    <FormatText
                        title={Strings.residents}
                        text={originInfo?.residents?.length}
                    />

                    {originInfo?.residents?.length > 0 && (
                        <PrimaryButton
                            text={Strings.viewResidents}
                            style={styles.button}
                            textStyle={styles.buttonText}
                            onPress={() =>
                                this.handleViewResidentsPress(
                                    originInfo.residents
                                )
                            }
                        />
                    )}
                </View>
            );
        } else {
            return null;
        }
    };

    renderLocation = () => {
        const { locationInfo }: any = this.state;

        if (locationInfo && !!locationInfo) {
            return (
                <View style={styles.card}>
                    <Text style={styles.headerTitle}>{Strings.location}</Text>

                    <FormatText
                        title={Strings.name}
                        text={locationInfo?.name}
                    />
                    <FormatText
                        title={Strings.type}
                        text={locationInfo?.type}
                    />
                    <FormatText
                        title={Strings.dimension}
                        text={locationInfo?.dimension}
                    />
                    <FormatText
                        title={Strings.residents}
                        text={locationInfo?.residents?.length}
                    />

                    {locationInfo?.residents?.length > 0 && (
                        <PrimaryButton
                            text={Strings.viewResidents}
                            style={styles.button}
                            textStyle={styles.buttonText}
                            onPress={() =>
                                this.handleViewResidentsPress(
                                    locationInfo.residents
                                )
                            }
                        />
                    )}
                </View>
            );
        } else {
            return null;
        }
    };

    renderEpisode = (episode: any, index: number) => {
        const backgroundColor =
            index % 2 === 0 ? Colors.whiteSmoke : Colors.white;

        return (
            <TouchableOpacity
                key={index}
                style={[
                    styles.episodeCard,
                    {
                        backgroundColor
                    }
                ]}
                onPress={() =>
                    this.handleViewResidentsPress(episode.characters)
                }>
                <View style={styles.episodeDetailsView}>
                    <Text style={styles.episodeName}>{episode.name}</Text>
                    <FormatText
                        title={Strings.airDate}
                        text={episode.air_date}
                    />
                    <FormatText
                        title={Strings.episode}
                        text={episode.episode}
                    />
                    <FormatText
                        title={Strings.characters}
                        text={episode?.characters?.length}
                    />
                </View>
                <View style={styles.iconView}>
                    <FontIcon
                        name="angle-right"
                        size={Scale(18)}
                        color={Colors.blue}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        const { episodesList, isLoading, isRefreshing }: any = this.state;

        if (isLoading) {
            return <Loader />;
        } else {
            return (
                <ScrollView
                    style={styles.container}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={() => this.handleRefresh()}
                        />
                    }>
                    {this.renderUserInfo()}

                    {this.renderOrigin()}
                    {this.renderLocation()}
                    <View style={styles.card}>
                        <Text style={styles.headerTitle}>
                            {Strings.episodes}
                        </Text>

                        {episodesList && episodesList.length > 0 ? (
                            episodesList.map((episode: any, index: number) =>
                                this.renderEpisode(episode, index)
                            )
                        ) : (
                            <Text style={styles.itemText}>
                                {Strings.noEpisodes}
                            </Text>
                        )}
                    </View>
                    <View style={styles.listFooter} />
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Scale(15)
    },
    card: {
        padding: Scale(15),
        marginBottom: Scale(10),
        backgroundColor: Colors.white
    },
    headerTitle: {
        fontSize: Scale(15),
        color: Colors.blue,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: Scale(6),
        textTransform: 'uppercase'
    },
    description: {
        fontSize: Scale(13),
        color: Colors.blue,
        textAlign: 'justify'
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemText: {
        fontSize: Scale(13),
        color: Colors.black
    },
    userContainer: {
        flexDirection: 'row',
        marginBottom: Scale(15)
    },
    profilePic: {
        height: Scale(77),
        width: Scale(77),
        borderRadius: Scale(10)
    },
    userDetailsContainer: {
        paddingHorizontal: Scale(10),
        flexShrink: 1
    },
    userName: {
        color: Colors.blue,
        fontSize: Scale(18),
        fontWeight: '600',
        lineHeight: Scale(24),
        textAlign: 'left'
    },
    listFooter: {
        height: Scale(66)
    },
    episodeCard: {
        padding: Scale(15),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    episodeDetailsView: {
        width: '92%'
    },
    episodeName: {
        color: Colors.blue,
        fontSize: Scale(16),
        fontWeight: '600',
        marginBottom: Scale(2)
    },
    iconView: {
        width: '8%',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    button: {
        backgroundColor: Colors.blue,
        borderRadius: Scale(5),
        marginTop: Scale(10),
        height: Scale(36)
    },
    buttonText: {
        color: Colors.white,
        fontSize: Scale(14)
    }
});
