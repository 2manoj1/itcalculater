import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'New Regima';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="New Regima"
        component={HomeScreen}
        options={{
          title: 'New Regima',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-calculator" />,
        }}
      />
      <BottomTab.Screen
        name="Old Regima"
        component={LinksScreen}
        options={{
          title: 'Old Regima',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-calculator" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'New Regima':
      return 'New Tax Regima Calculation';
    case 'Old Regima':
      return 'Old Tax Regima Calculation';
  }
}
