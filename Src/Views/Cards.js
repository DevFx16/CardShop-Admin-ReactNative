import React from 'react';
import { Image, BackHandler } from 'react-native';
import { Text, Icon, Header, Item, Input, Button, Content, Container, StyleProvider, Body, Left, Card, CardItem, Thumbnail, Right } from 'native-base';
import Theme from '../Themes/Tab';
import getTheme from '../Themes/components';
import Controller from '../Controllers/CardController';

export default class Cards extends React.Component {

  constructor(props) {
    super(props);
    this.state ={Datos: {Datos: this.props.screenProps.Backend, Token: this.props.screenProps.Token}}
  }

  componentWillReceiveProps(newProps) {
    if (newProps.screenProps.route_index === 0) {
      this.setState({Datos: {Datos: newProps.screenProps.Backend, Token: newProps.screenProps.Token}});
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', function () {
      BackHandler.exitApp();
    });
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#222b38' }}>
        <Header searchBar rounded style={{ backgroundColor: '#d93e3f' }}>
          <Item>
            <Icon name="search" type='FontAwesome' style={{ color: '#d93e3f' }} />
            <Input placeholder="Buscar" />
            <Icon name="cards" type='MaterialCommunityIcons' style={{ color: '#d93e3f' }} />
            <Button transparent>
              <Text style={{ color: '#d93e3f' }}>Buscar</Text>
            </Button>
          </Item>
        </Header>
        <Content padder>
          <StyleProvider style={getTheme(Theme)}>
            <Card style={{ borderWidth: 0, borderRadius: 10, borderColor: '#324054', backgroundColor: '#222b38' }}>
              <CardItem style={{ borderColor: '#324054', borderWidth: 0, backgroundColor: '#324054', flexDirection: 'row', justifyContent: 'space-around' }} bordered>
                <Left>
                  <Thumbnail source={{uri: 'https://cdn2.iconfinder.com/data/icons/funky/64/Amazon-2-512.png'}} small />
                  <Text style={{ color: '#ffff' }}>GiftCard Amazon</Text>
                </Left>
              </CardItem>
              <CardItem cardBody style={{ borderColor: '#324054', borderWidth: 0 }} bordered>
                <Image source={{uri: 'http://www.rhinotelevisionmedia.co.uk/images/site/pound%20gift%20card.png'}} resizeMode='cover' style={{ height: 200, width: null, flex: 1 }} />
              </CardItem>
              <CardItem style={{ borderColor: '#324054', borderWidth: 0 }} bordered>
                <Left style={{ borderColor: '#324054', borderWidth: 0 }}>
                  <Button transparent>
                    <Icon active name="heart" type={'FontAwesome'} style={{ color: '#ffff' }} />
                  </Button>
                </Left>
                <Body style={{ flexDirection: "row", justifyContent: "center" }}>
                  <Button transparent>
                    <Icon active name="shopping-bag" type={'FontAwesome'} style={{ color: '#ffff' }} />
                  </Button>
                </Body>
                <Right style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
                  <Icon active name="check-circle" type={'FontAwesome'} style={{ color: '#ffff' }} />
                  <Text style={{ color: '#ffff', marginLeft: 5 }}>40</Text>
                </Right>
              </CardItem>
            </Card>
          </StyleProvider>
        </Content>
      </Container>
    );
  }
}
