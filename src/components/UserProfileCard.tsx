import React, { useCallback } from 'react';
import { NavigationAction } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Scale, Screens, Strings, TestIDs } from '../constants';
import { FormatText } from './FormatText';

type Location = {
    name: string;
    url: string;
};

type UserInfo = {
    name: string;
    gender: string;
    species: string;
    status: string;
    origin?: Location;
    location?: Location;
    image: string;
};

type Props = {
    userInfo: UserInfo;
    navigation?: any;
};

export const UserProfileCard: React.FC<Props> = props => {
    const { userInfo, navigation } = props;

    const handleProfilePress = useCallback(() => {
        navigation.navigate(Screens.PROFILE, {
            characterDetails: userInfo
        });
    }, [navigation, userInfo]);

    return (
        <View style={styles.profileCard}>
            <TouchableOpacity
                testID={TestIDs.profileCard}
                accessibilityLabel={TestIDs.profileCard}
                onPress={handleProfilePress}>
                <View style={styles.userContainer}>
                    <Image
                        source={{ uri: userInfo?.image }}
                        style={styles.profilePic}
                    />
                    <View style={styles.userDetailsContainer}>
                        <Text style={styles.userName}>{userInfo.name}</Text>
                        <FormatText
                            title={Strings.gender}
                            text={userInfo.gender}
                        />
                        <FormatText
                            title={Strings.species}
                            text={userInfo.species}
                        />
                        <FormatText
                            title={Strings.status}
                            text={userInfo.status}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    profileCard: {
        flex: 1,
        marginHorizontal: Scale(20),
        marginVertical: Scale(8),
        backgroundColor: Colors.white,
        borderRadius: Scale(10),
        padding: Scale(12),
        elevation: 4,
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowColor: Colors.lightGrey,
        shadowOpacity: 1
    },
    userContainer: {
        flexDirection: 'row'
    },
    profilePic: {
        height: Scale(66),
        width: Scale(66),
        borderRadius: Scale(10),
        alignSelf: 'center'
    },
    userDetailsContainer: {
        paddingHorizontal: Scale(10),
        flexShrink: 1
    },
    userName: {
        marginBottom: Scale(2),
        color: Colors.blue,
        fontSize: Scale(16),
        fontWeight: '600',
        textAlign: 'left'
    }
});
