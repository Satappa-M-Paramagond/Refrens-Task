import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FormHeader, PrimaryButton } from '../../components';
import { Colors, Constants, Scale, Strings } from '../../constants';
import RangeSlider from '@react-native-community/slider';

const TOTAL_PHASES = 5;

export const HomeController: React.FC = () => {
    const [activePhase, setActivePhase] = useState(0);
    const [angerLevel, setAngerLevel] = useState(0);

    const handleItemPress = useCallback(index => {
        setActivePhase(index);
    }, []);

    const handleNextPress = useCallback(() => {
        setActivePhase(activePhase + 1);
    }, [activePhase]);

    const handleSliderValueChange = useCallback(level => {
        setAngerLevel(level);
    }, []);

    const renderPhaseTwo = () => {
        return (
            <View style={styles.subContainer}>
                <TouchableOpacity
                    style={[
                        styles.bar,
                        styles.firstBar,
                        angerLevel >= 5 && styles.activeBar
                    ]}
                    onPress={() => handleSliderValueChange(5)}
                />
                <TouchableOpacity
                    style={[
                        styles.bar,
                        styles.secondBar,
                        angerLevel >= 4 && styles.activeBar
                    ]}
                    onPress={() => handleSliderValueChange(4)}
                />
                <TouchableOpacity
                    style={[
                        styles.bar,
                        styles.thirdBar,
                        angerLevel >= 3 && styles.activeBar
                    ]}
                    onPress={() => handleSliderValueChange(3)}
                />
                <TouchableOpacity
                    style={[
                        styles.bar,
                        styles.fourthbar,
                        angerLevel >= 2 && styles.activeBar
                    ]}
                    onPress={() => handleSliderValueChange(2)}
                />
                <TouchableOpacity
                    style={[
                        styles.bar,
                        styles.fifthBar,
                        angerLevel >= 1 && styles.activeBar
                    ]}
                    onPress={() => handleSliderValueChange(1)}
                />
                <View style={[styles.overlay, styles.rightOverlay]} />
                <View style={[styles.overlay, styles.leftOverlay]} />
            </View>
        );
    };

    const renderPhaseOne = () => {
        return (
            <View style={styles.subContainer}>
                <View style={styles.outerCircle}>
                    <View style={styles.borderedCircle}>
                        <View style={styles.mediumCircle}>
                            <View style={styles.innerCircle}>
                                <Text style={styles.levelText}>
                                    {angerLevel}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <RangeSlider
                    style={styles.slider}
                    value={angerLevel}
                    minimumValue={0}
                    maximumValue={5}
                    step={1}
                    thumbTintColor={Colors.cyan}
                    minimumTrackTintColor={Colors.cyan}
                    maximumTrackTintColor={Colors.white}
                    onValueChange={handleSliderValueChange}
                />
            </View>
        );
    };

    const renderContent = () => {
        switch (activePhase) {
            case 0:
                return renderPhaseOne();
            case 1:
                return renderPhaseTwo();
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <FormHeader
                    noOfPhases={TOTAL_PHASES}
                    activePhase={activePhase}
                    onPress={handleItemPress}
                />

                <Text style={styles.headerTitle}>{Strings.pickAngerLevel}</Text>
            </View>

            {renderContent()}

            {activePhase === 1 && (
                <Text style={styles.levelStatusText}>
                    {Constants.angerLevelStatus[angerLevel]}
                </Text>
            )}

            <View style={{}}>
                <PrimaryButton text={Strings.next} onPress={handleNextPress} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: Scale(15),
        height: '100%',
        justifyContent: 'space-between'
    },
    headerTitle: {
        marginTop: Scale(30),
        color: Colors.white,
        fontSize: Scale(16),
        lineHeight: Scale(24),
        fontWeight: '700',
        textAlign: 'left'
    },
    subContainer: {
        marginTop: Scale(-80),
        alignItems: 'center'
    },
    outerCircle: {
        height: Scale(280),
        width: Scale(280),
        borderRadius: Scale(140),
        borderStyle: 'dashed',
        borderColor: Colors.darkGrey,
        borderWidth: Scale(4),
        justifyContent: 'center',
        alignItems: 'center'
    },
    borderedCircle: {
        height: Scale(230),
        width: Scale(230),
        backgroundColor: Colors.white,
        borderRadius: Scale(115),
        justifyContent: 'center',
        alignItems: 'center'
    },
    mediumCircle: {
        height: Scale(220),
        width: Scale(220),
        backgroundColor: Colors.lighterCyan,
        borderRadius: Scale(110),
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerCircle: {
        height: Scale(150),
        width: Scale(150),
        backgroundColor: Colors.cyan,
        borderRadius: Scale(75),
        justifyContent: 'center',
        alignItems: 'center'
    },
    levelText: {
        color: Colors.white,
        fontSize: Scale(44),
        fontWeight: 'bold'
    },
    slider: {
        marginTop: Scale(50),
        width: '90%',
        height: Scale(50)
    },
    levelStatusText: {
        color: Colors.white,
        fontSize: Scale(16),
        lineHeight: Scale(24),
        fontWeight: '700',
        textAlign: 'center'
    },
    bar: {
        marginTop: Scale(15),
        height: Scale(44),
        backgroundColor: Colors.darkGrey,
        borderBottomStartRadius: Scale(40),
        borderBottomEndRadius: Scale(40),
        borderTopStartRadius: Scale(30),
        borderTopEndRadius: Scale(30)
    },
    firstBar: {
        width: Scale(240)
    },
    secondBar: {
        width: Scale(200)
    },
    thirdBar: {
        width: Scale(160)
    },
    fourthbar: {
        width: Scale(100)
    },
    fifthBar: {
        width: Scale(60)
    },
    activeBar: {
        backgroundColor: Colors.white
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 0,
        height: 0,
        backgroundColor: Colors.transparent,
        borderStyle: 'solid',
        borderLeftWidth: Scale(10),
        borderRightWidth: Scale(120),
        borderTopWidth: Scale(300),
        borderLeftColor: Colors.transparent,
        borderRightColor: Colors.transparent,
        borderTopColor: Colors.darkCyan
    },
    leftOverlay: {
        left: Scale(50),
        transform: [{ rotateX: '180deg' }]
    },
    rightOverlay: {
        right: Scale(50),
        transform: [{ rotate: '180deg' }]
    }
});
