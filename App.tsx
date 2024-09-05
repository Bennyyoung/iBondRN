import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <View></View>
      </Provider>
    </>
  );
};

export default App;
