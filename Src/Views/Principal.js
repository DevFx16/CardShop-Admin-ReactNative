import React from 'react';
import {StatusBar, NetInfo, Image} from 'react-native';
import { Container, Content, Item, Icon, Input, Form, Footer, Button, Text, Spinner, Toast, Root, FooterTab, StyleProvider} from 'native-base';
import Card from '../Controllers/CardController';
import Theme from '../Themes/Tab'
import getTheme from '../Themes/components';
import categorias from '../Views/Categorias';
import Categorias from '../Views/Categorias';

var Toaste, Image1;

export default class Principal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {Font: false, Network: true, Toast: '', Tabs: {Tab1 : true, Tab2: false, Tab3: false}};
  }
  componentDidMount(){
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    StatusBar.setHidden(true);
  }
  handleConnectionChange = () => {
    NetInfo.isConnected.fetch().then(isConnected => {
      Image1 = isConnected ? require('../Images/Login.jpg') : require('../Images/Conexion.png')
      this.setState({ Network: isConnected });
    });
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({Font: true});
  }
  componentDidUpdate(){
    Toaste = this.state.Toast.length > 0 ? Toast.show({onClose: this.Close, text: this.state.Toast, buttonText: "Okay",duration: 3000, buttonStyle: {backgroundColor: '#b33b3c'}}) : null 
  }
  Close = () => {
    this.setState({Toast: ''});
  }
  render() {
    if(this.state.Network){
      if(this.state.Font){
        var Cont;
        if(this.state.Tabs.Tab1){
          Cont = null;
        }else if(this.state.Tabs.Tab2){
          Cont = <Categorias/>
        }else{
          Cont = null;
        }
        return (
          <Root>
            <Container>
              <Content padder>
                {Cont}
              </Content>
              <Footer>
                <StyleProvider style={getTheme(Theme)}>
                  <FooterTab style={{backgroundColor: '#ffff'}}>
                    <Button vertical active={this.state.Tabs.Tab1} onPress={() => this.setState({Tabs: {Tab1 : true, Tab2: false, Tab3: false}})}>
                      <Icon type='MaterialCommunityIcons' name="wallet-giftcard" color='#b33b3c'/>
                      <Text active={this.state.Tabs.Tab1}>Cards</Text>
                    </Button>
                    <Button vertical active={this.state.Tabs.Tab2} onPress={() => this.setState({Tabs: {Tab1 : false, Tab2: true, Tab3: false}})}>
                      <Icon type='FontAwesome' name="list-ul" color='#b33b3c'/>
                      <Text active={this.state.Tabs.Tab2}>categorías</Text>
                    </Button>
                    <Button vertical active={this.state.Tabs.Tab3} onPress={() => this.setState({Tabs: {Tab1 : false, Tab2: false, Tab3: true}})}>
                      <Icon type='MaterialCommunityIcons' name="account" color='#b33b3c'/>
                      <Text active={this.state.Tabs.Tab3}>Cuenta</Text>
                    </Button> 
                  </FooterTab>
                </StyleProvider>
              </Footer>
            </Container>
            {Toaste}
          </Root>
        );
      }else{
        return(
          <Container>
            <Content contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
              <Spinner color='blue' size='large'/>
            </Content>
          </Container>
        );
      }
    }else{
      return(
        <Root>
          <Image source={Image1} resizeMode='cover' style={{width: '100%', height: '100%'}}/>
        </Root>
      );
    }
  }
}