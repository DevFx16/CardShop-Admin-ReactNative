import React from 'react';
import { Container, Content, Icon, Footer, Button, Text, Spinner, Root, FooterTab, StyleProvider, Card } from 'native-base';
import Theme from '../Themes/Tab'
import getTheme from '../Themes/components';
import Cards from '../Views/Cards';
import Controller from '../Controllers/CardController';
import Categorias from '../Views/Categorias';
import Cuenta from '../Views/Cuenta';
import { createBottomTabNavigator,createStackNavigator } from 'react-navigation';

var Conexion;

const Tabs = createBottomTabNavigator({
  Cards: { screen: Cards },
  Categorias: { screen: Categorias },
  Cuenta: { screen: Cuenta }
}, {
    tabBarComponent: props => {
      return (
        <Footer>
          <StyleProvider style={getTheme(Theme)}>
            <FooterTab>
              <Button vertical active={props.navigationState.index === 0}>
                <Icon type='MaterialCommunityIcons' name="wallet-giftcard" color='#d93e3f' />
                <Text active={props.navigationState.index === 0}>Cards</Text>
              </Button>
              <Button vertical active={props.navigationState.index === 1}>
                <Icon type='FontAwesome' name="list-ul" color='#d93e3f' />
                <Text active={props.navigationState.index === 1}>categorías</Text>
              </Button>
              <Button vertical active={props.navigationState.index === 2}>
                <Icon type='MaterialCommunityIcons' name="account" color='#d93e3f' />
                <Text active={props.navigationState.index === 2}>Cuenta</Text>
              </Button>
            </FooterTab>
          </StyleProvider>
        </Footer>
      );
    }
  }
);
export  class Principal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Cards: false, Backend: [] };
  }
  static navigationOptions = {
    header: null
  }
  componentDidMount() {
    Controller.Get().then((json) => {
      this.setState({ Backend: json, Cards: true });
    });
    console.log(this.props.navigation.state.params.token);
    this.props.navigation.navigate('Tabs', this.state.Backend);
  }
  render() {
    return (
      <Container>
        <Content contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
          <Spinner color='blue' size='large' />
        </Content>
      </Container>
    );
  }
}
export default AppStackNavigation = createStackNavigator({
  Principal: { screen: Principal, navigationOptions: () => ({header: null}) },
  Tabs: { screen: Tabs, navigationOptions: () => ({header: null})}
})
