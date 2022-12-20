/** Library import */
import { Image } from 'react-native';

/** Style import */
import ImageStyles from '../../styles/ImageStyles';

interface ImgProps {
  /** Image source path */
  src?: string;

  /** Image alt text */
  alt?: string;
}

const Img = ({ src, alt }: ImgProps): JSX.Element => {
  return (
    <Image
      source={{
        uri: src,
      }}
      accessibilityLabel={alt}
      style={ImageStyles.image}
    />
  );
};

export default Img;
