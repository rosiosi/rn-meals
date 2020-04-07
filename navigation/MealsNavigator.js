import React from 'react';
import { Platform, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, HeaderTitle } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';

import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';

const defaultStackOptios = { 
    headerStyle:{
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTitleStyle:{
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white': Colors.primaryColor,
    headerTitle: 'A screen'
}

const MealsNavigator = createStackNavigator(
    {
        Categories: {screen: CategoriesScreen
        },
        CategoryMeals: {
            screen: CategoryMealsScreen
        },
        MealDetailScreen: MealDetailScreen
    },
    {
        defaultNavigationOptions: defaultStackOptios
    }
);

const FavoriteNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
},
{
    defaultNavigationOptions:defaultStackOptios
}
);

const tabNavigator = {
    Meals: {screen: MealsNavigator, 
        navigationOptions: {
            tabBarIcon: (tabInfo) => {  
                return (<Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor}/>
            );
             },
            tabBarColor: Colors.primaryColor,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Meals'
        }},
        Fav: {screen: FavoriteNavigator,
            navigationOptions: {
                tabBarIcon: (tabInfo) => {  
                    return (<Ionicons name="ios-star" size={25} color={tabInfo.tintColor}/>)
                },
                tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Favorites</Text> : 'Favorites'
                //tabBarColor: Colors.primaryColor
            }
        } 
    }

const MealsFavTabNavigator = 
Platform.OS === 'android' 
? createMaterialBottomTabNavigator(tabNavigator,{    
        activeTintColor: 'white',
        shifting: true,
        barStyle:{
            backgroundColor: Colors.primaryColor
        }    
}) 
: createBottomTabNavigator(tabNavigator, {
        tabBarOptions:{
            labelStyle:{
                fontFamily: 'open-sans'
            },
            activeTintColor: Colors.accentColor
        }
    }
);

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
},{
    defaultNavigationOptions:defaultStackOptios   
});

const MainNavigator = createDrawerNavigator({
    MealsFavs: {
        screen: MealsFavTabNavigator, 
        navigationOptions:{
            drawerLabel: 'Meals'
    }},
    Filters: FiltersNavigator
},{
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle:{
            fontFamily: 'open-sans-bold'
        }
    }
});

export default createAppContainer(MainNavigator);