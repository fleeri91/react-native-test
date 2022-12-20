/** Library import */
import { observer } from 'mobx-react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

/** Component import */
import Image from '../../components/Image';

/** Store import */
import { PixabayStore } from '../../store/pixabay.store';

/** Style import */
import LayoutStyles from '../../styles/LayoutStyles';
import TypographyStyles from '../../styles/TypographyStyles';

/** Type import */
import { PixabayItem } from '../../types/pixabay.type';

const SavedImagesScreen = observer((): JSX.Element => {
  const renderImage = ({ item }: { item: PixabayItem }) => (
    <TouchableOpacity onLongPress={() => PixabayStore.deleteImage(item.id)}>
      <Image key={item.id} src={item.largeImageURL} alt={item.tags} />
    </TouchableOpacity>
  );

  const renderEmptyState = (): JSX.Element => {
    return (
      <View style={LayoutStyles.view}>
        <Text>No saved images</Text>
      </View>
    );
  };

  const renderSavedImages = (): JSX.Element => {
    return (
      <View style={LayoutStyles.view}>
        <Text style={TypographyStyles.h1}>Long press to delete image</Text>
        <FlatList
          keyExtractor={image => image.id.toString()}
          data={PixabayStore.savedImages}
          renderItem={renderImage}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  return PixabayStore.savedImages.length
    ? renderSavedImages()
    : renderEmptyState();
});

export default SavedImagesScreen;
