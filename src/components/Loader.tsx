import React from 'react';
import { StyleSheet, View, ActivityIndicator, ViewStyle } from 'react-native';
import { Colors } from '../constants';

enum Sizes {
    SMALL = 'small',
    LARGE = 'large'
}
type Props = {
    containerStyle?: ViewStyle;
    size?: Sizes;
};

export const Loader: React.FC<Props> = props => {
    const { containerStyle = {}, size = 'large' } = props;

    return (
        <View style={[styles.container, containerStyle]}>
            <ActivityIndicator color={Colors.darkGrey} size={size} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
