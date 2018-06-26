import React from 'react';
import { Image, BackHandler } from 'react-native';
import { Text, Icon, Header, Item, Input, Button, Content, Container, StyleProvider, Body, Left, Card, CardItem, Thumbnail, Right, View } from 'native-base';
import Theme from '../Themes/Tab';
import GiftCard from './GiftCard';
import getTheme from '../Themes/components';

export default class Cards extends React.Component {

  constructor(props) {
    super(props);
    this.state = { Token: this.props.screenProps.Token, Elements: [], Load: false, Buscar: '' }
  }

  renderArray = async (Array) => {
    var Element = []
    Array.map((Cards, index) => {
      Cards.map((Data) => {
        Element.push(
          <GiftCard Nombre={Data.Nombre} UrlIcon={Data.UrlIcon} Image={'http://www.thebyrdhouse.com/wp-content/uploads/2015/08/giftcard.png'} Disponible={Data.Disponible} key={index} />
        );
      })
    })
    this.setState({ Elements: Element, Load: true });
  }

  async componentWillReceiveProps(newProps) {
    if (newProps.screenProps.route_index === 0) {
      this.setState({ Token: newProps.screenProps.Token });
      this.renderArray(newProps.screenProps.Backend);
    }
  }

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', function () {
      BackHandler.exitApp();
    });
    this.renderArray(this.props.screenProps.Backend);
  }

  Buscar = async () => {
    if (this.state.Buscar.length > 0) {
      this.setState({ Load: false});
      var Array = [], Cards = [];
      this.props.screenProps.Backend.map((item) => {
        item.map((CardCom) => {
          if (('GIFTCARD ' + CardCom.Nombre.toUpperCase() + ' ' + CardCom.Valor).includes(this.state.Buscar.toUpperCase())) {
            Array.push(CardCom);
          }
        })
      })
      Cards.push(Array);
      this.setState({ Buscar: '' });
      this.renderArray(Cards);
    } else {
      this.setState({Load: false });
      this.renderArray(this.props.screenProps.Backend);
    }
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#222b38' }}>
        <Header searchBar rounded style={{ backgroundColor: '#d93e3f' }}>
          <Item>
            <Input placeholder="Buscar" onChangeText={(Text) => this.setState({Buscar: Text})}/>
            <Icon name="cards" type='MaterialCommunityIcons' style={{ color: '#d93e3f' }} />
            <Button transparent onPress={this.Buscar.bind(this)} active={this.state.Load}>
              <Icon name="search" type='FontAwesome' style={{ color: '#d93e3f' }} />
            </Button>
          </Item>
        </Header>
        <Content padder>
          <StyleProvider style={getTheme(Theme)}>
            <View>
              {this.state.Load ? this.state.Elements : null}
            </View>
          </StyleProvider>
        </Content>
      </Container>
    );
  }
}
