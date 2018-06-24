import React from 'react';
import { Container, Content, Icon, Footer, Button, Text, Spinner, FooterTab, StyleProvider } from 'native-base';
import Theme from '../Themes/Tab'
import getTheme from '../Themes/components';
import Cards from '../Views/Cards';
import Controller from '../Controllers/CardController';
import Categorias from '../Views/Categorias';
import Cuenta from '../Views/Cuenta';
import { createBottomTabNavigator} from 'react-navigation';
import PropTypes from 'prop-types';

const Tabs = createBottomTabNavigator({
  Cards: { screen: Cards },
  Categorias: { screen: Categorias },
  Cuenta: { screen: Cuenta }
}, {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    navigationOptions: ({ navigation }) => ({
      tabBarComponent: (props) => {
        const { routeName } = navigation.state;
        return (
          <Footer>
            <StyleProvider style={getTheme(Theme)}>
              <FooterTab>
                <Button vertical active={routeName === 'Cards'} onPress={() => props.navigation.navigate('Cards')}>
                  <Icon type='MaterialCommunityIcons' name="wallet-giftcard" color='#d93e3f' />
                  <Text active={routeName === 'Cards'}>Cards</Text>
                </Button>
                <Button vertical active={routeName === 'Categorias'} onPress={() => props.navigation.navigate('Categorias')}>
                  <Icon type='FontAwesome' name="list-ul" color='#d93e3f' />
                  <Text active={routeName === 'Categorias'}>categorías</Text>
                </Button>
                <Button vertical active={routeName === 'Cuenta'} onPress={() => props.navigation.navigate('Cuenta')}>
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
export default class Principal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Cards: false, Backend: [], route_index: 0, Token: '' };
  }
  _onNavigationStateChange = (prevState, newState) => {
    Controller.Datos('Datos').then((json) => {
      if(json !== null){
        Json = JSON.parse(json);
        this.setState({Backend: Json.Cards, route_index: newState.index, Token: Json.Token});
      } 
    });
  }
  componentDidMount() {
    Controller.Get().then((json) => {
      this.setState({ Backend: json});
      Controller.setDatos({Cards : json, Token: this.props.Token}, 'Datos').then(() =>{
        this.setState({ Cards: true, Token: this.props.Token});
      });
    });
  }

  render() {
    if(this.state.Cards){
      return(<Tabs onNavigationStateChange={this._onNavigationStateChange} screenProps={this.state}/>);
    }else{
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
};