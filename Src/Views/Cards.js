import React from 'react';
import {Image} from 'react-native';
import {Text, Icon, Header, Item, Input, Button, Content, Container, StyleProvider, Body, Left, Card, CardItem, Thumbnail} from 'native-base';
import Theme from '../Themes/Tab';
import getTheme from '../Themes/components';

export default class Cards extends React.Component {

  constructor(props) {
    super(props);
  }
  render(){
    return(
      <Container>
        <Header searchBar rounded style={{backgroundColor: '#d93e3f'}}>
          <Item>
            <Icon name="search" type='FontAwesome' style={{color: '#d93e3f'}}/>
            <Input placeholder="Buscar" />
            <Icon name="cards" type='MaterialCommunityIcons' style={{color: '#d93e3f'}}/>
            <Button transparent>
              <Text style={{color: '#d93e3f'}}>Buscar</Text>
            </Button>
          </Item>
        </Header>
        <Content padder>
          <StyleProvider style={getTheme(Theme)}>
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={require('../Images/amazon.png')} small/>
                <Body>
                  <Text style={{color: '#ffff'}}>GiftCard Amazon</Text>
                </Body>
              </Left>
              </CardItem>
              <CardItem cardBody>
                <Image source={require('../Images/Gift.png')} resizeMode='cover' style={{height: 200, width: null ,flex: 1}}/> 
              </CardItem>
              <CardItem>
                <Left>
                  <Icon active name="check-circle" type={'FontAwesome'} style={{color: '#ffff'}} />
                  <Text style={{color: '#ffff'}}>Disponible 40</Text>
                </Left>
              </CardItem>
            </Card>
          </StyleProvider>
        </Content>
      </Container>
    );
  }
}
