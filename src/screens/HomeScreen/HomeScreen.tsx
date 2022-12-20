/** Library import */
import { Text, View } from 'react-native';

/** Component import */
import Button from 'components/Button';

/** Store import */
import { PixabayStore } from 'store/pixabay.store';

/** Style import */
import LayoutStyles from 'styles/LayoutStyles';
import TypographyStyles from 'styles/TypographyStyles';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const onClick = (query: string) => {
    PixabayStore.setQuery(query);
    navigation.navigate('ImageFeed');
  };

  return (
    <View style={LayoutStyles.view}>
      <Text style={TypographyStyles.h1}>React native code test</Text>
      <Text style={TypographyStyles.h2}>Click a button to see images</Text>
      <Button onPress={() => onClick('Christmas')}>Christmas</Button>
      <Button onPress={() => onClick('New year')}>New year</Button>
      <Button onPress={() => onClick('Donald Duck')}>Donald Duck</Button>
    </View>
  );
};

export default HomeScreen;
