import Orientation from 'react-native-orientation-locker';

const handlersMap = {
  PORTRAIT: Orientation.lockToPortrait,
  LANDSCAPE: Orientation.lockToLandscape,
  'LANDSCAPE-LEFT': Orientation.lockToLandscapeLeft,
  'LANDSCAPE-RIGHT': Orientation.lockToLandscapeRight,
  'PORTRAIT-UPSIDEDOWN': Orientation.lockToPortraitUpsideDown,
};

export default {
  lockCurrentOrientation() {
    Orientation.getOrientation(orientation => {
      // @ts-ignore
      const handler = handlersMap[orientation];

      if (handler) {
        handler();
      }
    });
  },

  lockToPortrait() {
    Orientation.lockToPortrait();
  },
  lockToLandscape() {
    Orientation.lockToLandscape();
  },
  unlockAllOrientations() {
    Orientation.unlockAllOrientations();
  },
};
