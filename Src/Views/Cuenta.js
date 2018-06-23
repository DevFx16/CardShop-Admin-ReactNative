import React from 'react';
import { Dimensions } from 'react-native';
import { Icon, Content, Button, Container, Header, Item, Input, Thumbnail, Form, Picker, Text } from 'native-base';
import Lista from '../Views/List';
import { Col, Row, Grid } from "react-native-easy-grid";
import Modal from 'react-native-modalbox';

const Array = ['Amazon', 'Google Play', 'iTunes', 'PlayStation', 'Steam', 'Xbox', 'PayPal'];

export default class Cuenta extends React.Component {

  constructor(props) {
    super(props);
    this.state = { Datos: { Datos: this.props.screenProps.Backend, Token: this.props.screenProps.Token }, Card: { Nombre: 'Amazon', UrlIcon: '', UrlCard: '', Valor: 0, Disponible: 0 } }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.screenProps.route_index === 2) {
      this.setState({ Datos: { Datos: newProps.screenProps.Backend, Token: newProps.screenProps.Token } });
    }
  }


  PickerValue = (Value) => {
    this.setState({ Card: { Nombre: Value, UrlIcon: this.state.Card.UrlIcon, UrlCard: this.state.Card.Card, Valor: this.state.Card.Valor, Disponible: this.state.Card.Disponible } })
  }

  Añadir = () => {

  }

  render() {
    return (
      <Container style={{ backgroundColor: '#222b38' }}>
        <Header searchBar rounded style={{ backgroundColor: '#d93e3f' }}>
          <Item>
            <Icon name="search" type='FontAwesome' style={{ color: '#d93e3f' }} />
            <Input placeholder="Buscar" />
            <Icon name="cards" type='MaterialCommunityIcons' style={{ color: '#d93e3f' }} />
            <Button transparent onPress={() => this.refs.Modal.open()}>
              <Icon active name="add-to-photos" type='MaterialIcons' style={{ color: '#d93e3f' }} />
            </Button>
          </Item>
        </Header>
        <Content padder contentContainerStyle={{ alignContent: 'center' }}>
          <Grid>
            <Row style={{ justifyContent: 'center' }} size={1}>
              <Thumbnail source={{ uri: 'https://cdn2.iconfinder.com/data/icons/funky/64/Amazon-2-512.png' }} large />
            </Row>
            <Lista Array={["Amazon 100 USD", "Amazon 50 USD"]} Icon={{ Nombre: 'amazon', Tipo: 'FontAwesome' }} />
            <Row style={{ justifyContent: 'center' }} size={1}>
              <Thumbnail source={{ uri: 'https://cdn4.iconfinder.com/data/icons/free-colorful-icons/360/google_play.png' }} large />
            </Row>
            <Lista Array={["Google Play 100 USD", "Google Play 50 USD"]} Icon={{ Nombre: 'google-play', Tipo: 'Entypo' }} />
          </Grid>
        </Content>
        <Modal style={{ borderRadius: 20, shadowRadius: 20, width: Dimensions.get('window').width - 80, height: 350 }} position={"center"} ref={"Modal"} isDisabled={false} backdropPressToClose={false} swipeToClose={false}>
          <Header style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: '#ffff', borderColor: '#ffff' }}>
            <Item style={{ justifyContent: 'flex-end', flex: 1, flexDirection: 'row', marginRight: 15, marginTop: 5 }}>
              <Button iconLeft transparent onPress={() => this.refs.Modal.close()}>
                <Icon active type='FontAwesome' name='close' style={{ color: 'red' }} />
              </Button>
            </Item>
          </Header>
          <Content contentContainerStyle={{flex: 1}}>
            <Form style={{ marginRight: 10 }}>
              <Item>
                <Icon active type='MaterialIcons' name='attach-money' style={{ color: 'black' }} />
                <Input style={{ color: 'white' }} placeholder="Valor" onChangeText={(Valor) => this.setState({ Card: { Nombre: this.state.Card.Nombre, UrlIcon: this.state.Card.UrlIcon, UrlCard: this.state.Card.UrlCard, Valor: Valor, Disponible: this.state.Card.Disponible } })} keyboardType='numeric'/>
              </Item>
              <Item>
                <Icon active type='FontAwesome' name='check-circle' style={{ color: 'black', fontSize: 20, }} />
                <Input style={{ color: 'white' }} secureTextEntry={true} placeholder="Disponibilidad" onChangeText={(Disponible) => this.setState({ Card: { Nombre: this.state.Card.Nombre, UrlIcon: this.state.Card.UrlIcon, UrlCard: this.state.Card.UrlCard, Valor: this.state.Card.Valor, Disponible: Disponible } })} keyboardType='number-pad'/>
              </Item>
              <Item>
                <Icon active type='MaterialCommunityIcons' name='weather-pouring' style={{ color: 'black', fontSize: 20, }} />
                <Input style={{ color: 'white' }} secureTextEntry={true} placeholder="Url Card" onChangeText={(Url) => this.setState({ Card: { Nombre: this.state.Card.Nombre, UrlIcon: this.state.Card.UrlIcon, UrlCard: Url, Valor: this.state.Card.Valor, Disponible: this.state.Card.Disponible } })} />
              </Item>
              <Item>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" type='FontAwesome'/>}
                  placeholder="Seleccione tipo de card"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  style={{ width: '100%' }}
                  selectedValue={this.state.Card.Nombre}
                  onValueChange={this.PickerValue.bind(this)}>
                  {
                    Array.map((Tipo, index) => {
                      return (
                        <Picker.Item label={Tipo} value={Tipo} key={index} />
                      );
                    })
                  }
                </Picker>
              </Item>
            </Form>
            <Button block style={{ marginTop: 25, backgroundColor: '#b33b3c', marginLeft: 10, marginRight: 10 }} onPress={this.Añadir.bind(this)}>
              <Text>Añadir</Text>
            </Button>
          </Content>
        </Modal>
      </Container>
    );
  }
}