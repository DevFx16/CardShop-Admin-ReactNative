import React from 'react';
import { Container, Content, Icon, Footer, Button, Text, Spinner, Root, FooterTab, StyleProvider, Card } from 'native-base';
import Theme from '../Themes/Tab'
import getTheme from '../Themes/components';
import Cards from '../Views/Cards';
import Controller from '../Controllers/CardController';
import Categorias from '../Views/Categorias';
import Cuenta from '../Views/Cuenta';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

var Backend, Token;
const Tabs = createBottomTabNavigator({
  Cards: { screen: Cards },
  Categorias: { screen: Categorias },
  Cuenta: { screen: Cuenta }
}, {
    tabBarPosition: 'bottom',
    navigationOptions: ({ navigation }) => ({
      tabBarComponent: (props) => {
        const { routeName } = navigation.state;
        return (
          <Footer>
            <StyleProvider style={getTheme(Theme)}>
              <FooterTab>
                <Button vertical active={routeName === 'Cards'} onPress={() => props.navigation.navigate('Cards', { Cards: Backend, Token: Token})}>
                  <Icon type='MaterialCommunityIcons' name="wallet-giftcard" color='#d93e3f' />
                  <Text active={routeName === 'Cards'}>Cards</Text>
                </Button>
                <Button vertical active={routeName === 'Categorias'} onPress={() => props.navigation.navigate('Categorias', { Cards: Backend, Token: Token})}>
                  <Icon type='FontAwesome' name="list-ul" color='#d93e3f' />
                  <Text active={routeName === 'Categorias'}>categorías</Text>
                </Button>
                <Button vertical active={routeName === 'Cuenta'} onPress={() => props.navigation.navigate('Cuenta', { Cards: Backend, Token: Token})}>
                  <Icon type='MaterialCommunityIcons' name="account" color='#d93e3f' />
                  <Text active={routeName === 'Cuenta'}>Cuenta</Text>
                </Button>
              </FooterTab>
            </StyleProvider>
          </Footer>
        );
      }
    })
  }
);
export class Principal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Cards: false, Backend: [] };
  }
  componentDidMount() {
    Controller.Get().then((json) => {
      this.setState({ Backend: json, Cards: true, Backup: json });
    });
    Backend = this.state.Backend;
    Token = this.props.Token;
    this.props.navigation.navigate('Tabs', { Cards: this.state.Backend, Token:  this.props.Token});
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
  Principal: { screen: Principal, navigationOptions: () => ({ header: null }) },
  Tabs: { screen: Tabs, navigationOptions: () => ({ header: null }) }
})
