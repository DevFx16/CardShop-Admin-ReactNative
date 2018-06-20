import React from 'react';
import { Container, Content, Icon, Footer, Button, Text, Spinner, Root, FooterTab, StyleProvider, Card } from 'native-base';
import Theme from '../Themes/Tab'
import getTheme from '../Themes/components';
import Cards from '../Views/Cards';
import Controller from '../Controllers/CardController';
import Categorias from '../Views/Categorias';
import Cuenta from '../Views/Cuenta';
import PropTypes from 'prop-types';

var Conexion;

export default class Principal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Font: false, Network: true, Tabs: { Tab1: true, Tab2: false, Tab3: false }, Cards: false, Backend: [] };
    Conexion = require('../Images/Conexion.png');
  }
  componentDidMount() {
    Controller.Get().then((json) => {
      this.setState({ Backend: json, Cards: true });
    });
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ Font: true });
  }
  getData(val) {
    // do not forget to bind getData in constructor
    console.log(val);
  }
  render() {
    if (this.state.Font && this.state.Cards) {
      var Cont;
      if (this.state.Tabs.Tab1) {
        Cont = <Cards sendData={this.getData} />;
      } else if (this.state.Tabs.Tab2) {
        Cont = <Categorias />
      } else {
        Cont = <Cuenta />;
      }
      return (
        <Container style={{ backgroundColor: '#222b38' }}>
          {Cont}
          <Footer>
            <StyleProvider style={getTheme(Theme)}>
              <FooterTab>
                <Button vertical active={this.state.Tabs.Tab1} onPress={() => this.setState({ Tabs: { Tab1: true, Tab2: false, Tab3: false } })}>
                  <Icon type='MaterialCommunityIcons' name="wallet-giftcard" color='#d93e3f' />
                  <Text active={this.state.Tabs.Tab1}>Cards</Text>
                </Button>
                <Button vertical active={this.state.Tabs.Tab2} onPress={() => this.setState({ Tabs: { Tab1: false, Tab2: true, Tab3: false } })}>
                  <Icon type='FontAwesome' name="list-ul" color='#d93e3f' />
                  <Text active={this.state.Tabs.Tab2}>categorías</Text>
                </Button>
                <Button vertical active={this.state.Tabs.Tab3} onPress={() => this.setState({ Tabs: { Tab1: false, Tab2: false, Tab3: true } })}>
                  <Icon type='MaterialCommunityIcons' name="account" color='#d93e3f' />
                  <Text active={this.state.Tabs.Tab3}>Cuenta</Text>
                </Button>
              </FooterTab>
            </StyleProvider>
          </Footer>
        </Container>
      );
    } else {
      return (
        <Container>
          <Content contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
            <Spinner color='blue' size='large' />
          </Content>
        </Container>
      );
    }
  }
}

Principal.propTypes = {
  Token: PropTypes.string.isRequired
}
