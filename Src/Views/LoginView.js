import React from 'react';
import {ImageBackground, StatusBar} from 'react-native';
import { Container, Header, Content, Item, Icon, Input, Form, Label, Title, Body, Button, Text, Thumbnail, Spinner, Left} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";

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
        <ImageBackground source={require('../Images/Foto.jpg')} resizeMode='cover' style={{width: '100%', height: '100%'}}>
          <Container>
            <Header>
              <Left>
                <Thumbnail source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}} small/>
              </Left>
              <Body> 
                <Title>Login</Title>
              </Body>
            </Header>
            <Content padder contentContainerStyle={{flex:1, justifyContent: 'center'}}>
                <Form style={{marginRight: 10}}>
                  <Item floatingLabel>
                    <Icon active type='FontAwesome' name='user-circle' style={{color: 'white'}}/>
                    <Label style={{color: 'white'}}>Username</Label>
                    <Input style={{color: 'white'}}/>
                  </Item>
                  <Item floatingLabel>
                    <Icon active type='MaterialCommunityIcons' name='account-key' style={{color: 'white'}} />
                    <Label style={{color: 'white'}}>Password</Label>
                    <Input style={{color: 'white'}} secureTextEntry={true}/>
                  </Item>
                </Form>
                <Button block rounded iconLeft style={{marginTop: 40}}>
                  <Icon active type='FontAwesome' name='lock' style={{color: 'white'}} />
                  <Text>Login</Text>
                </Button>
            </Content>
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