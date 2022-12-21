/** Library import */
import { action, autorun, makeObservable, observable, runInAction } from 'mobx';

/** Type import */
import { PixabayItem } from 'types/pixabay.type';
import { State } from 'types/global.type';

const API_KEY = '32173246-2902566c497968f0a6bb0218e';
const BASE_URL = 'https://pixabay.com/api';

class Pixabay {
  query: string = '';
  state: State = 'idle';
  imageList: PixabayItem[] = [];
  savedImages: PixabayItem[] = [];

  constructor() {
    makeObservable(this, {
      query: observable,
      state: observable,
      imageList: observable,
      savedImages: observable,
      getImages: action,
      setImageList: action,
      saveImage: action,
      deleteImage: action,
      setQuery: action,
    });

    autorun(() => {
      this.getImages(this.query);
    });
  }

  /**
   * Get images from Pixabay api by query string
   *
   * @param query
   */
  getImages = async (query: string) => {
    this.state = 'loading';
    const url = BASE_URL + `/?key=${API_KEY}&q=${query}&image_type=photo`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      runInAction(() => {
        this.setImageList(data.hits as PixabayItem[]);
        this.state = 'idle';
      });
    } catch (error: any) {
      this.state = 'error';
    }
  };

  /**
   * Set image list state
   *
   * @param list
   */
  setImageList(list: PixabayItem[]) {
    this.imageList = list;
  }

  /**
   * Add image to saved image list
   *
   * @param image
   */
  saveImage(image: PixabayItem) {
    this.savedImages = [...this.savedImages, image];
  }

  /**
   * Delete image in saved image list by id
   *
   * @param id
   */
  deleteImage(id: number | string) {
    this.savedImages = this.savedImages.filter(image => image.id !== id);
  }

  /**
   * Set query for Pixabay api fetch
   *
   * @param query
   */
  setQuery(query: string) {
    this.query = query;
  }
}

export const PixabayStore = new Pixabay();
