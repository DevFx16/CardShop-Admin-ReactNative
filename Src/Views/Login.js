import React from 'react';
import { ImageBackground, StatusBar, NetInfo, Image, View } from 'react-native';
import { Container, Content, Item, Icon, Input, Form, Footer, Button, Text, Spinner, Root } from 'native-base';
import Card from '../Controllers/CardController';
import Principal from '../Views/Principal';
import ModalBox from '../Views/ModalBox';

var LoginImage, Conexion, Modal;

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Font: false, Network: true, User: { Username: '', Password: '' }, ModalTexto: '', status: 400, Token: '', ModalView: false, ModalImage: false, ModalImageSet: '' };
  }
  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    StatusBar.setHidden(true);
    LoginImage = require('../Images/Login.jpg');
    Conexion = require('../Images/Conexion.png');
  }
  handleConnectionChange = () => {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({ Network: isConnected });
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
  Login = () => {
    if (this.state.User.Username.length <= 0 || this.state.User.Password.length <= 0) {
      this.setState({ ModalTexto: 'Se requieren los campos', ModalImage: true, ModalView: true, ModalImageSet: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678069-sign-error-512.png' });
    } else {
      this.setState({ ModalText: 'Espere validando ingreso...', ModalView: true, ModalImage: false });
      Card.Login(JSON.stringify(this.state.User))
        .then((Res) => {
          this.setState({ status: Res.status});
          (Res.json()).then((Json) => {
            if (this.state.status == 200) {
              this.setState({ Token: Json.token, ModalView: false });
            } else {
              this.setState({ ModalTexto: Json, ModalImage: true, ModalImageSet: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678069-sign-error-512.png' });
            }
          })
        });
    }
  }
  render() {
    if (this.state.Network) {
      if (this.state.Font) {
        if (this.state.Token.length <= 0) {
          return (
            <Root>
              <ImageBackground source={LoginImage} resizeMode='cover' style={{ width: '100%', height: '100%' }}>
                <Container>
                  <Content padder contentContainerStyle={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Form style={{ marginRight: 10 }}>
                      <Item>
                        <Icon active type='FontAwesome' name='user-circle' style={{ color: 'white' }} />
                        <Input style={{ color: 'white' }} placeholder="Username" onChangeText={(Username) => this.setState({ User: { Username: Username, Password: this.state.User.Password}, ModalView: false})} />
                      </Item>
                      <Item>
                        <Icon active type='MaterialIcons' name='vpn-key' style={{ color: 'white', fontSize: 20, }} />
                        <Input style={{ color: 'white' }} secureTextEntry={true} placeholder="Password" onChangeText={(Password) => this.setState({ User: { Username: this.state.User.Username, Password: Password}, ModalView: false })} />
                      </Item>
                    </Form>
                    <Button block rounded iconLeft style={{ marginTop: 40, backgroundColor: '#b33b3c' }} onPress={this.Login.bind(this)}>
                      <Text>Login</Text>
                    </Button>
                  </Content>
                  <Footer style={{ backgroundColor: 'rgba(0,0,0,0)' }} />
                </Container>
                {this.state.ModalView ? <ModalBox Text={this.state.ModalTexto} SpinnerComp={!this.state.ModalImage} Close={this.state.ModalImage} Image={this.state.ModalImage} ImageSet={this.state.ModalImageSet} /> : null}
              </ImageBackground>
            </Root>
          );
        } else {
          return (
            <Principal Token={this.state.Token} />
          );
        }
      } else {
        return (
          <Container>
            <Content contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
              <Spinner color='blue' size='large' />
            </Content>
          </Container>
        );
      }
    } else {
      return (
        <Root>
          <Image source={Conexion} resizeMode='cover' style={{ width: '100%', height: '100%' }} />
        </Root>
      );
    }
  }
}