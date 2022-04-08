import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Colors, Scale } from '../constants';

type Props = {
    title: string;
    text: string;
};

export const FormatText: React.FC<Props> = props => {
    const { title = '', text = '' } = props;

    if (text && !!text) {
        return <Text style={styles.itemText}>{`${title} : ${text}`}</Text>;
    } else {
        return null;
    }
};

const styles = StyleSheet.create({
    itemText: {
        fontSize: Scale(12),
        color: Colors.black
    }
});
