import React from 'react';
import { Card, CardItem, Text, Icon, Content, Right, Left, StyleProvider, Body, Container, Spinner, Header, Item, Input, Button } from 'native-base';
import Theme from '../Themes/Tab'
import getTheme from '../Themes/components';
import CardCo from '../Controllers/CardController';
import GiftCard from './GiftCard';

const Array = [{ Nombre: 'Amazon', Icon: { Nombre: 'amazon', Tipo: 'FontAwesome' } }, { Nombre: 'GooglePlay', Icon: { Nombre: 'google-play', Tipo: 'Entypo' } }, { Nombre: 'iTunes', Icon: { Nombre: 'itunes', Tipo: 'Zocial' } }, { Nombre: 'PlayStation', Icon: { Nombre: 'logo-playstation', Tipo: 'Ionicons' } }, { Nombre: 'Xbox', Icon: { Nombre: 'xbox', Tipo: 'MaterialCommunityIcons' } }, { Nombre: 'Paypal', Icon: { Nombre: 'paypal', Tipo: 'FontAwesome' } }, { Nombre: 'Steam', Icon: { Nombre: 'steam', Tipo: 'FontAwesome' } }];

export default class Categorias extends React.Component {

  constructor(props) {
    super(props);
    this.state = { Token: this.props.screenProps.Token, Elements: [], Load: false, Categoria: false, Nombre: '', Buscar: '', Cards: [] }
  }

  async renderCatego() {
    var Elements = [];
    Array.map((Categoria, index) => {
      Elements.push(
        <Card key={index} style={{ borderWidth: 0, borderRadius: 10, borderColor: '#324054', backgroundColor: '#324054', flexDirection: 'column', justifyContent: 'center' }}>
          <CardItem button icon onPress={this.Boton.bind(this, Categoria.Nombre)} style={{ borderColor: '#324054', borderWidth: 0, backgroundColor: '#324054' }}>
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

  ModToken = () => {
    CardCo.Datos('Datos').then((json) => {
      if (json !== null) {
        Json = JSON.parse(json);
        this.setState({ Token: Json.Token });
      }
    });
  }

  GiftCards = async (Cards) => {
    var Element = [];
    Cards.map((Data, index) => {
      Element.push(
        <GiftCard Nombre={Data.Nombre} UrlIcon={Data.UrlIcon} Image={Data.UrlCard} Disponible={Data.Disponible} key={index} />
      );
    })
    this.setState({ Load: true, Elements: Element });
  }

  Boton = async (Nombre) => {
    CardCo.GetCards(Nombre, this.state.Token).then((Res) => {
      if (Res.status == 401) {
        CardCo.ReAuth();
        this.ModToken();
        this.Boton(Nombre);
      } else {
        (Res.json()).then((json) => {
          this.setState({ Categoria: true, Nombre: Nombre, Load: false, Cards: JSON.parse(json)});
          this.GiftCards(JSON.parse(json));
        })
      }
    })
  }

  async componentDidMount() {
    this.renderCatego();
  }

  async componentWillReceiveProps(newProps) {
    if (newProps.screenProps.route_index === 1) {
      this.setState({ Token: newProps.screenProps.Token });
    }
  }

  Buscar = async () => {
    if (this.state.Buscar.length > 0) {
      this.setState({ Load: false });
      var Array = [];
      this.state.Cards.map((CardCom) => {
        if (('GIFTCARD ' + CardCom.Nombre.toUpperCase() + ' ' + CardCom.Valor + ' USD').includes(this.state.Buscar.toUpperCase())) {
          Array.push(CardCom);
        }
      })
      this.setState({ Buscar: '' });
      this.GiftCards(Array);
    }
  }

  Back = async () => {
    this.setState({ Categoria: false, Nombre: '' , Load: false})
    this.renderCatego();
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#222b38' }}>
        {this.state.Categoria ? (<Header searchBar rounded style={{ backgroundColor: '#d93e3f' }}>
          <Item>
            <Input placeholder="Buscar" onChangeText={(Text) => this.setState({ Buscar: Text })} value={this.state.Buscar} />
            <Icon name="cards" type='MaterialCommunityIcons' style={{ color: '#d93e3f' }} />
            <Button transparent onPress={this.Back.bind(this)}>
              <Icon active name="md-arrow-round-back" type='Ionicons' style={{ color: '#d93e3f' }} />
            </Button>
            <Button transparent onPress={this.Buscar.bind(this)} active={this.state.Load}>
              <Icon name="search" type='FontAwesome' style={{ color: '#d93e3f' }} />
            </Button>
          </Item>
        </Header>) : null}
        <StyleProvider style={getTheme(Theme)}>
          <Content padder contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'column', flex: 1 }}>
            {this.state.Load ? this.state.Elements : <Spinner color='red' size='large' />}
          </Content>
        </StyleProvider>
      </Container>
    );
  }
}