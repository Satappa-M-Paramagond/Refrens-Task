import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    HomeController,
    ProfileController,
    ResidentsController
} from '../screens';
import { Colors, Screens } from '../constants';
import { StatusBar } from 'react-native';

const HomeStack = createNativeStackNavigator();

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={Colors.transparent}
                translucent={true}
            />
            <HomeStack.Navigator>
                <HomeStack.Screen
                    name={Screens.HOME}
                    component={HomeController}
                />
                <HomeStack.Screen
                    name={Screens.PROFILE}
                    component={ProfileController}
                />
                <HomeStack.Screen
                    name={Screens.RESIDENTS}
                    component={ResidentsController}
                />
            </HomeStack.Navigator>
        </NavigationContainer>
    );
};
