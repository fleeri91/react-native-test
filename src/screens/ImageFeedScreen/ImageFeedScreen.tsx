/** Library import */
import { observer } from 'mobx-react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

/** Component import */
import Button from '../../components/Button';
import Image from '../../components/Image';

/** Store import */
import { PixabayStore } from '../../store/pixabay.store';

/** Style import */
import LayoutStyles from '../../styles/LayoutStyles';
import TypographyStyles from '../../styles/TypographyStyles';

/** Type import */
import { PixabayItem } from '../../types/pixabay.type';
import { State } from '../../types/global.type';

interface ImageFeedScreenProps {
  navigation: any;
}

const ImageFeedScreen = observer(
  ({ navigation }: ImageFeedScreenProps): JSX.Element => {
    const onClick = () => {
      navigation.navigate('SavedImages');
    };

    const renderImage = ({ item }: { item: PixabayItem }) => (
      <TouchableOpacity onLongPress={() => PixabayStore.saveImage(item)}>
        <Image key={item.id} src={item.largeImageURL} alt={item.tags} />
      </TouchableOpacity>
    );

    const renderImageList = (): JSX.Element => {
      return (
        <View style={LayoutStyles.view}>
          <Text style={TypographyStyles.h1}>Long press to save image</Text>
          <Button onPress={() => onClick()}>View saved images</Button>
          <FlatList
            keyExtractor={image => image.id.toString()}
            data={PixabayStore.imageList}
            renderItem={renderImage}
            showsVerticalScrollIndicator={false}
          />
        </View>
      );
    };

    const renderContent = (state: State): JSX.Element | null => {
      switch (state) {
        case 'idle':
          return renderImageList();
        case 'loading':
          return renderLoadingState();
        case 'error':
          return renderErrorState();
        default:
          return <></>;
      }
    };

    const renderLoadingState = (): JSX.Element => {
      return (
        <View style={LayoutStyles.view}>
          <ActivityIndicator animating={PixabayStore.state === 'loading'} />
        </View>
      );
    };

    const renderErrorState = (): JSX.Element => {
      return (
        <View style={LayoutStyles.view}>
          <Text style={TypographyStyles.h1}>Error while fetching data</Text>
        </View>
      );
    };

    return <>{renderContent(PixabayStore.state)}</>;
  },
);

export default ImageFeedScreen;
