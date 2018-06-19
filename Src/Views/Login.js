import React from 'react';
import {ImageBackground, StatusBar, NetInfo, Image} from 'react-native';
import { Container, Content, Item, Icon, Input, Form, Footer, Button, Text, Spinner, Toast, Root} from 'native-base';
import Card from '../Controllers/CardController';
import Principal from '../Views/Principal';

var Toaste, Image1;

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {Font: false, Network: true, User: {Username: '', Password: ''}, Toast: '', status: 400, Token: ''};
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
  Login = () => {
    if(this.state.User.Username.length <= 0 || this.state.User.Password.length <= 0){
      this.setState({Toast: 'Se requieren los campos'});
    }else{
      Card.Login(JSON.stringify(this.state.User))
      .then((Res) => {
        this.setState({status: Res.status});
        (Res.json()).then((Json) =>{
          if(this.state.status == 200){
            this.setState({Token: Json.token});
          }else{
            this.setState({Toast: Json});
          }
        })
      });
    }
  }
  Close = () => {
    this.setState({Toast: ''});
  }
  render() {
    if(this.state.Network){
      if(this.state.Font){
        if(this.state.Token.length <= 0){
          return (
            <Root>
              <ImageBackground source={Image1} resizeMode='cover' style={{width: '100%', height: '100%'}}>
                <Container>
                  <Content padder contentContainerStyle={{flex:1, justifyContent: 'flex-end'}}>
                    <Form style={{marginRight: 10}}>
                      <Item>
                        <Icon active type='FontAwesome' name='user-circle' style={{color: 'white'}}/>
                        <Input style={{color: 'white'}} placeholder="Username" onChangeText={(Username) => this.setState({User: {Username: Username, Password: this.state.User.Password}})}/>
                      </Item>
                      <Item>
                        <Icon active type='MaterialIcons' name='vpn-key' style={{color: 'white', fontSize: 20,}}/>
                        <Input style={{color: 'white'}} secureTextEntry={true} placeholder="Password" onChangeText={(Password) => this.setState({User: {Username: this.state.User.Username, Password: Password}})}/>
                      </Item>
                    </Form>
                    <Button block rounded iconLeft style={{marginTop: 40, marginBottom: 40, backgroundColor:'#b33b3c' }} onPress={this.Login}  ref={"Boton"}>
                      <Text>Login</Text>
                    </Button>
                  </Content>
                  <Footer style={{backgroundColor: 'rgba(0,0,0,0)'}}/>
              </Container>
              {Toaste}
              </ImageBackground>
            </Root>
        );
      }else{
        return(
          <Principal Token={this.state.Token}/>
        );
      }
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