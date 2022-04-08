import React from 'react';
import {
    StyleSheet,
    View,
    Alert,
    FlatList,
    RefreshControl
} from 'react-native';
import { Loader, UserProfileCard } from '../../components';
import { Scale } from '../../constants';
import { ApiMethods, ApiPaths, ApiService } from '../../utils';

export class ResidentsController extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            residentsIDs: props.route.params.residents,
            residentsList: [],
            isLoading: false,
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
            `${ApiPaths.getCharacters + this.state.residentsIDs}`,
            ApiMethods.GET,
            this.handleSuccess,
            this.handleFailure
        );
    };

    handleSuccess = (response: any) => {
        if (response?.data) {
            // Set items, page and counts in state
            this.setState({
                residentsList: response.data
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

    handleRefresh = () => {
        this.setState({ isRefreshing: true }, () => {
            this.handleApiCall();
        });
    };

    renderCharacter = ({ item, index }: any) => {
        return <UserProfileCard key={index} userInfo={item} {...this.props} />;
    };

    render() {
        const { residentsList, isLoading, isRefreshing }: any = this.state;

        if (isLoading) {
            return <Loader />;
        } else {
            return (
                <View style={styles.container}>
                    <FlatList
                        data={residentsList}
                        renderItem={this.renderCharacter}
                        keyExtractor={(x, i) => i.toString()}
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefreshing}
                                onRefresh={() => this.handleRefresh()}
                            />
                        }
                        ListFooterComponent={() => (
                            <View style={styles.listFooter} />
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
