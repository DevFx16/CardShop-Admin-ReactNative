import React from 'react';
import {ImageBackground, StatusBar} from 'react-native';
import { Container, Content, Item, Icon, Input, Form, Footer, Button, Text, Spinner} from 'native-base';

const Image = require('../Images/Login.jpg')

export default class LoginView extends React.Component {
  constructor() {
    super();
    this.state = {Font: false};
  }
  componentDidMount(){
    StatusBar.setHidden(true);
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({Font: true});
  }
  render() {
    if(this.state.Font){
      return (
        <ImageBackground source={Image} resizeMode='cover' style={{width: '100%', height: '100%'}}>
          <Container>
            <Content padder contentContainerStyle={{flex:1, justifyContent: 'flex-end'}}>
                <Form style={{marginRight: 10}}>
                  <Item>
                    <Icon active type='FontAwesome' name='user-circle' style={{color: 'white'}}/>
                    <Input style={{color: 'white'}} placeholder="Username" />
                  </Item>
                  <Item>
                    <Icon active type='MaterialIcons' name='vpn-key' style={{color: 'white', fontSize: 20,}}/>
                    <Input style={{color: 'white'}} secureTextEntry={true} placeholder="Password" />
                  </Item>
                </Form>
                <Button block rounded iconLeft style={{marginTop: 40, marginBottom: 40, backgroundColor:'#b33b3c' }}>
                  <Text>Login</Text>
                </Button>
            </Content>
            <Footer style={{backgroundColor: 'rgba(0,0,0,0)'}}/>
          </Container>
        </ImageBackground>
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
  }
}