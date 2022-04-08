import React from 'react';
import {
    StyleSheet,
    View,
    Alert,
    FlatList,
    RefreshControl,
    ActivityIndicator
} from 'react-native';
import { Loader, UserProfileCard } from '../../components';
import { Colors, Scale } from '../../constants';
import { ApiMethods, ApiPaths, ApiService } from '../../utils';

export class HomeController extends React.Component {
    onEndReachedCalledDuringMomentum = true;

    constructor(props: any) {
        super(props);
        this.state = {
            characterList: [],
            activePage: 1,
            pageSize: 20,
            totalPages: 0,
            isLoading: false,
            isPageLoading: false,
            isRefreshing: false
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true }, () => {
            this.handleApiCall();
        });
    }

    handleApiCall = () => {
        ApiService(
            `${ApiPaths.getCharacters}?page=${this.state.activePage}`,
            ApiMethods.GET,
            this.handleSuccess,
            this.handleFailure
        );
    };

    handleSuccess = (response: any) => {
        if (response?.data) {
            const { data } = response;
            const results =
                this.state.activePage === 1
                    ? data.results
                    : [...this.state.characterList, ...data.results];

            // Set items, page and counts in state
            this.setState({
                characterList: results,
                totalPages: data.info.pages
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
            isPageLoading: false,
            isRefreshing: false
        });
    };

    handleEndReached = ({ distanceFromEnd }) => {
        if (!this.onEndReachedCalledDuringMomentum) {
            const newPage = this.state.activePage + 1;

            // Check if new page is less than or equal to total pages
            if (newPage <= this.state.totalPages) {
                this.setState(
                    { activePage: newPage, isPageLoading: true },
                    () => {
                        this.handleApiCall();
                    }
                );
            }

            this.onEndReachedCalledDuringMomentum = true;
        }
    };

    handleRefresh = () => {
        this.setState({ activePage: 1, isRefreshing: true }, () => {
            this.handleApiCall();
        });
    };

    renderCharacter = ({ item, index }: any) => {
        return <UserProfileCard key={index} userInfo={item} {...this.props} />;
    };

    render() {
        const { characterList, isLoading, isPageLoading, isRefreshing }: any =
            this.state;

        if (isLoading) {
            return <Loader />;
        } else {
            return (
                <View style={styles.container}>
                    <FlatList
                        data={characterList}
                        renderItem={this.renderCharacter}
                        keyExtractor={(x, i) => i.toString()}
                        onEndReached={this.handleEndReached}
                        onEndReachedThreshold={0.2}
                        onMomentumScrollBegin={() =>
                            (this.onEndReachedCalledDuringMomentum = false)
                        }
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefreshing}
                                onRefresh={() => this.handleRefresh()}
                            />
                        }
                        ListFooterComponent={() => (
                            <View style={styles.listFooter}>
                                {isPageLoading && (
                                    <ActivityIndicator
                                        color={Colors.darkGrey}
                                        size={'small'}
                                    />
                                )}
                            </View>
                        )}
                    />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listFooter: {
        height: Scale(66)
    }
});
