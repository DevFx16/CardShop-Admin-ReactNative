import React from 'react';
import { Card, CardItem, Text, Icon, Content, Right, Left, StyleProvider, Body, Container, Spinner } from 'native-base';
import Theme from '../Themes/Tab'
import getTheme from '../Themes/components';

const Array = [{ Nombre: 'Amazon', Icon: { Nombre: 'amazon', Tipo: 'FontAwesome' } }, { Nombre: 'Google Play', Icon: { Nombre: 'google-play', Tipo: 'Entypo' } }, { Nombre: 'iTunes', Icon: { Nombre: 'itunes', Tipo: 'Zocial' } }, { Nombre: 'PlayStation', Icon: { Nombre: 'logo-playstation', Tipo: 'Ionicons' } }, { Nombre: 'Xbox', Icon: { Nombre: 'xbox', Tipo: 'MaterialCommunityIcons' } }, { Nombre: 'Paypal', Icon: { Nombre: 'paypal', Tipo: 'FontAwesome' } }, { Nombre: 'Steam', Icon: { Nombre: 'steam', Tipo: 'FontAwesome' } }];

export default class Categorias extends React.Component {

  constructor(props) {
    super(props);
    this.state = { Cards: this.props.screenProps.Backend, Token: this.props.screenProps.Token, Elements: [], Load: false }
  }

  async renderCatego() {
    var Elements = [];
    Array.map((Categoria, index) => {
      Elements.push(
        <Card key={index} style={{ borderWidth: 0, borderRadius: 10, borderColor: '#324054', backgroundColor: '#324054', flexDirection: 'column', justifyContent: 'center' }}>
          <CardItem button icon onPress={() => alert("Has Presionado: " + Categoria.Nombre)} style={{ borderColor: '#324054', borderWidth: 0, backgroundColor: '#324054' }}>
            <Left>
              <Icon name={Categoria.Icon.Nombre} type={Categoria.Icon.Tipo} style={{ color: '#ffff' }} />
            </Left>
            <Body style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
              <Text style={{ color: "#ffff" }}>{Categoria.Nombre}</Text>
            </Body>
            <Right>
              <Icon name="hand-o-right" type='FontAwesome' style={{ color: '#ffff' }} />
            </Right>
          </CardItem>
        </Card>
      );
    })
    this.setState({ Elements: Elements, Load: true })
  }

  async componentDidMount() {
    this.renderCatego();
  }

  async componentWillReceiveProps(newProps) {
    if (newProps.screenProps.route_index === 1) {
      this.setState({ Cards: newProps.screenProps.Backend, Token: newProps.screenProps.Token });
    }
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#222b38' }}>
        <StyleProvider style={getTheme(Theme)}>
          <Content padder contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'column', flex: 1 }}>
            {this.state.Load ? this.state.Elements : <Spinner color='red' size='large' />}
          </Content>
        </StyleProvider>
      </Container>
    );
  }
}