/** Library import */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

/** Screen import */
import HomeScreen from './src/screens/HomeScreen';
import ImageFeedScreen from './src/screens/ImageFeedScreen';
import SavedImagesScreen from './src/screens/SavedImagesScreen';

type RootStackParamList = {
  Home: undefined;
  ImageFeed: undefined;
  SavedImages: undefined;
};

const App = () => {
  const RootStack = createStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="ImageFeed" component={ImageFeedScreen} />
        <RootStack.Screen name="SavedImages" component={SavedImagesScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
