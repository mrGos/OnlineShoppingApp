/** @format */

import {AppRegistry} from 'react-native';
import App from './Components/App';
import SideMenu from './Components/SideMenu';
import Demo from './Components/Demo';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Demo);
