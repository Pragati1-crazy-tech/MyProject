import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ProductListScreen from './Component/ProductListScreen';
import ProductDetailScreen from './Component/ProductDetailScreen';
import CartScreen from './Component/CartScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Home Stack Navigator (ProductList + ProductDetail)

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProductList" component={ProductListScreen} options={{ title: 'Products' }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Product Detail' }} />
    </Stack.Navigator>
  );
}

//  Main App with Bottom Tabs (HomeStack + Cart)
export default function App() {
  return (
    <NavigationContainer>
      
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            const icons: Record<string, string> = {
              Home: 'home-outline',
              Cart: 'cart-outline',
            };

            // Dynamically fetch the icon name based on the route
            const iconName = icons[route.name] || 'home-outline';
             // Default to home if route not found

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Cart" component={CartScreen} />
      </Tab.Navigator>
    </NavigationContainer>


  );
}
