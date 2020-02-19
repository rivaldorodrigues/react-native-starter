import React from 'react';
import { Root, Container, Content, Text, StyleProvider } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import { CORES } from './assets/cores';
import { StatusBar } from 'react-native';
import { createStackNavigator } from 'react-navigation';

//Desabilita warnings na aplicação
console.disableYellowBox = true;

// Salva a tela atual e recarrega após o refresh
const navigationPersistenceKey = __DEV__ ? 'NavigationStateDEV' : null;

export default class App extends React.Component {
  componentDidMount(): void {
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor(CORES.SECUNDARIO);
  }

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Root>
          <Container>
            <Content>
              <Text>I have changed the text color.</Text>
            </Content>
          </Container>
        </Root>
      </StyleProvider>
    );
  }
}
