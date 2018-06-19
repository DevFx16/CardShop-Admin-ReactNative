import React from 'react';
import {StatusBar, NetInfo, Image} from 'react-native';
import { Container, Content, Icon, Footer, Button, Text, Spinner, Toast, Root, FooterTab, StyleProvider, Card} from 'native-base';
import Theme from '../Themes/Tab'
import getTheme from '../Themes/components';
import Cards from '../Views/Cards';
import Categorias from '../Views/Categorias';
import Cuenta from '../Views/Cuenta';
import PropTypes from 'prop-types';

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
  getData(val){
    // do not forget to bind getData in constructor
    console.log(val);
  }
  componentDidUpdate(){
    Toaste = this.state.Toast.length > 0 ? Toast.show({onClose: this.Close, text: this.state.Toast, buttonText: "Okay",duration: 3000, buttonStyle: {backgroundColor: '#d93e3f'}}) : null 
  }
  Close = () => {
    this.setState({Toast: ''});
  }
  render() {
    if(this.state.Network){
      if(this.state.Font){
        var Cont;
        if(this.state.Tabs.Tab1){
          Cont = <Cards sendData={this.getData}/>;
        }else if(this.state.Tabs.Tab2){
          Cont = <Categorias/>
        }else{
          Cont = <Cuenta/>;
        }
        return (
          <Root>
            <Container style={{backgroundColor: '#222b38'}}>
              {Cont}
              <Footer>
                <StyleProvider style={getTheme(Theme)}>
                  <FooterTab>
                    <Button vertical active={this.state.Tabs.Tab1} onPress={() => this.setState({Tabs: {Tab1 : true, Tab2: false, Tab3: false}})}>
                      <Icon type='MaterialCommunityIcons' name="wallet-giftcard" color='#d93e3f'/>
                      <Text active={this.state.Tabs.Tab1}>Cards</Text>
                    </Button>
                    <Button vertical active={this.state.Tabs.Tab2} onPress={() => this.setState({Tabs: {Tab1 : false, Tab2: true, Tab3: false}})}>
                      <Icon type='FontAwesome' name="list-ul" color='#d93e3f'/>
                      <Text active={this.state.Tabs.Tab2}>categorías</Text>
                    </Button>
                    <Button vertical active={this.state.Tabs.Tab3} onPress={() => this.setState({Tabs: {Tab1 : false, Tab2: false, Tab3: true}})}>
                      <Icon type='MaterialCommunityIcons' name="account" color='#d93e3f'/>
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

Principal.propTypes = {
  Token: PropTypes.string.isRequired
}
