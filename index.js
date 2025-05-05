/**
 * @format
 */
import 'react-native-gesture-handler'; // 👈 MUST be first
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { enableScreens } from 'react-native-screens';

enableScreens(); // 👈 Optional but improves performance

AppRegistry.registerComponent(appName, () => App);
