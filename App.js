import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './views/pages/authentication/Components/Login';
import Home from './views/pages/main/Components/Home';
import Register from './views/pages/authentication/Components/Register';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import History from './views/pages/main/Components/History';
import MyBarCodeScanner from './views/pages/main/Components/MyBarCodeScanner';
import ContainerDetails from './views/pages/main/Components/ContainerDetails';
import PickupInformation from './views/pages/main/Components/PickupInformation';
import ScanConatiner from './views/pages/main/Components/ScanConatiner';
import SignaturePage from './views/pages/main/Components/SignaturePage';
import CustomMap from './views/pages/main/maps/CustomMap';
import OTP_Verification from './views/pages/authentication/Components/OTP_Verification';
import { Provider } from 'react-redux';
import Store from './views/redux/Store';
import Loader from './views/common/Loader';
import TruckPickUpMap from './views/pages/main/maps/TruckPickUpMap';
import ReachedScanContainer from './views/pages/main/Components/ReachedScanContainer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Provider store={Store}>
        <Loader />

        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}

          />
          <Stack.Screen
            name="OTP_Verification"
            component={OTP_Verification}
            options={{ headerShown: false }}

          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}

          />
          {/* <Stack.Screen
            name="BarCodeScanner"
            component={MyBarCodeScanner}
            options={{ headerShown: false }}
          /> */}
          <Stack.Screen
            name="ContainerDetails"
            component={ContainerDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PickupInformation"
            component={PickupInformation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ScanConatiner"
            component={ScanConatiner}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ReachedScanContainer"
            component={ReachedScanContainer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignatureScreen"
            component={SignaturePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TruckPickUpMap"
            component={TruckPickUpMap}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CustomMap"
            component={CustomMap}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />

          {/* <Stack.Screen name="Drawer" component={MyDrawer} options={{ headerShown: false }} /> */}

        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

// export function MyDrawer(props) {

//   return (
//     <Drawer.Navigator initialRouteName="Home"
//       // drawerContent={() => <Sidebar {...props} />}
//       screenOptions={{ headerShown: false }}
//     >
//       <Drawer.Screen name="Home" component={Home} />
//       <Drawer.Screen name="History" component={History} />
//       <Drawer.Screen name="Map" component={CustomMap} />
//     </Drawer.Navigator>
//   );
// }
