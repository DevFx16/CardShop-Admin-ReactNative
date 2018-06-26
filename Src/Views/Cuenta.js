import React from 'react';
import { Dimensions } from 'react-native';
import { Icon, Content, Button, Container, Header, Item, Input, Form, Picker, Text, Card, CardItem, Left, Right, Spinner } from 'native-base';
import Modal from 'react-native-modalbox';
import CardCo from '../Controllers/CardController';
import ModalBox from '../Views/ModalBox';

const Array = ['Amazon', 'GooglePlay', 'iTunes', 'PlayStation', 'Steam', 'Xbox', 'Paypal'];
const Iconos = [{ Nombre: 'amazon', Tipo: 'FontAwesome' }, { Nombre: 'google-play', Tipo: 'Entypo' }, { Nombre: 'itunes', Tipo: 'Zocial' }, { Nombre: 'paypal', Tipo: 'FontAwesome' }, { Nombre: 'logo-playstation', Tipo: 'Ionicons' }, { Nombre: 'steam', Tipo: 'FontAwesome' }, { Nombre: 'xbox', Tipo: 'MaterialCommunityIcons' }];

export default class Cuenta extends React.Component {

  constructor(props) {
    super(props);
    this.state = { Card: { Nombre: 'Amazon', UrlIcon: 'http://www.kimlukeauthor.com/wp-content/uploads/2015/03/Amazon-Icon.png', UrlCard: '', Valor: 0, Disponible: 0 }, ModalView: false, ModalImage: false, ModalImageSet: '', Token: this.props.screenProps.Token, Elements: [], Load: false, Buscar: '' }

  }

  CardsArray = async (Array) => {
    var Element = []
    Array.map((Cards, index) => {
      Cards.map((Data) => {
        Element.push(
          <Card key={index} style={{ borderWidth: 0, borderRadius: 10, borderColor: '#324054', backgroundColor: '#324054' }}>
            <CardItem icon style={{ borderColor: '#324054', borderWidth: 0, backgroundColor: '#324054' }}>
              <Left>
                <Button transparent onPress={() => alert('Edit')} iconLeft>
                  <Icon active name="edit" type='FontAwesome' style={{ color: 'blue' }} />
                </Button>
              </Left>
              <Text style={{ color: "#ffff" }}>{Data.Nombre + ' ' + Data.Disponible + ' USD'}</Text>
              <Icon name={Iconos[index].Nombre} type={Iconos[index].Tipo} style={{ color: '#ffff' }} />
              <Right>
                <Button transparent iconLeft onPress={this.Eliminar.bind(this, Data.Id, Data.Nombre)}>
                  <Icon active name="trash" type='Entypo' style={{ color: 'red' }} />
                </Button>
              </Right>
            </CardItem>
          </Card>
        );
      })
    })
    this.setState({ Elements: Element, Load: true, ModalView: false });
  }

  async componentDidMount() {
    this.CardsArray(this.props.screenProps.Backend);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.screenProps.route_index === 2) {
      this.setState({ ModalView: false, Token: newProps.screenProps.Token, Load: false });
      this.CardsArray(newProps.screenProps.Backend);
    }
  }

  PickerValue = (Value) => {
    var Url;
    if (Value === 'Amazon') {
      Url = 'http://www.kimlukeauthor.com/wp-content/uploads/2015/03/Amazon-Icon.png';
    } else if (Value === 'GooglePlay') {
      Url = 'https://www.androidpolice.com/wp-content/uploads/2017/05/nexus2cee_ic_launcher_play_store_new-1.png';
    } else if (Value === 'iTunes') {
      Url = 'https://pre00.deviantart.net/a18a/th/pre/f/2015/161/a/e/itunes_13_icon__png__ico__icns__by_loinik-d8wqjzr.png';
    } else if (Value === 'PlayStation') {
      Url = 'https://cdn.icon-icons.com/icons2/290/PNG/512/playstation_30852.png';
    } else if (Value === 'Steam') {
      Url = 'https://vignette.wikia.nocookie.net/central/images/1/14/Steam_icon_logo.svg.png/revision/latest?cb=20170704030440';
    } else if (Value === 'Xbox') {
      Url = 'https://cdn2.iconfinder.com/data/icons/metro-uinvert-dock/256/XBox_360.png';
    } else {
      Url = 'http://icons.iconarchive.com/icons/sicons/basic-round-social/256/paypal-icon.png';
    }
    this.setState({ Card: { Nombre: Value, UrlIcon: Url, UrlCard: this.state.Card.UrlCard, Valor: this.state.Card.Valor, Disponible: this.state.Card.Disponible }, ModalView: false })
  }

  Eliminar = async (Id, Tipo) => {
    this.setState({ ModalTexto: 'Espere...', ModalView: true, ModalImage: false });
    CardCo.Delete(Tipo, Id, this.state.Token).then((Res) => {
      console.log(Res);
      if (Res.status == 401) {
        CardCo.ReAuth();
        this.Eliminar(Tipo, Id, this.state.Token);
      } else {
        if (Res.status == 200) {
          (Res.json()).then((Res) => {
            CardCo.setDatos({ Cards: Res, Token: this.state.Token }, 'Datos');
            this.setState({ ModalTexto: 'Se ha eliminado', ModalImage: true, ModalView: true, ModalImageSet: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-512.png', Load: false });
            this.CardsArray(Res);
          })
        } else {
          this.setState({ ModalTexto: 'Ha ocurrido un error vuelva a intentar', ModalImage: true, ModalView: true, ModalImageSet: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678069-sign-error-512.png' });
        }
      }
    })
  }

  Añadir = async () => {
    var noValido = / /;
    if (this.state.Card.Nombre.length <= 0 || this.state.Card.UrlCard.length <= 0 || this.state.Card.UrlIcon.length <= 0 || this.state.Card.Disponible <= 0 || this.state.Card.Valor <= 0 || noValido.test(this.state.Card.UrlCard)) {
      this.setState({ ModalTexto: 'Se requieren los campos', ModalImage: true, ModalView: true, ModalImageSet: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678069-sign-error-512.png' });
    } else {
      this.setState({ ModalTexto: 'Espere...', ModalView: true, ModalImage: false });
      CardCo.Post(JSON.stringify(this.state.Card), this.state.Card.Nombre, this.state.Token).then((Res) => {
        if (Res.status == 401) {
          CardCo.ReAuth();
          Añadir();
        } else {
          if (Res.status == 200) {
            (Res.json()).then((Res) => {
              CardCo.setDatos({ Cards: Res, Token: this.state.Token }, 'Datos');
              this.setState({ ModalTexto: 'Se ha registrado', ModalImage: true, ModalView: true, ModalImageSet: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-512.png', Load: false });
              this.CardsArray(Res);
            })
          } else {
            this.setState({ ModalTexto: 'Ha ocurrido un error vuelva a intentar', ModalImage: true, ModalView: true, ModalImageSet: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678069-sign-error-512.png' });
          }
        }
      })
    }
  }

  Buscar = async () => {
    if (this.state.Buscar.length > 0) {
      this.setState({ Load: false });
      var Array = [], Cards = [];
      this.state.Backup.map((item) => {
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
      this.setState({ Load: false });
      this.renderArray(this.state.Backup);
    }
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#222b38' }}>
        <Header searchBar rounded style={{ backgroundColor: '#d93e3f' }}>
          <Item>
            <Input placeholder="Buscar" onChangeText={(Text) => this.setState({ Buscar: Text })} />
            <Icon name="cards" type='MaterialCommunityIcons' style={{ color: '#d93e3f' }} />
            <Button transparent onPress={() => this.refs.Modal.open()}>
              <Icon active name="add-to-photos" type='MaterialIcons' style={{ color: '#d93e3f' }} />
            </Button>
            <Button transparent onPress={this.Buscar.bind(this)} active={this.state.Load}>
              <Icon name="search" type='FontAwesome' style={{ color: '#d93e3f' }} />
            </Button>
          </Item>
        </Header>
        <Content padder>
          {this.state.Load ? this.state.Elements : <Spinner color='red' size='large' />}
        </Content>
        <Modal style={{ borderRadius: 20, shadowRadius: 20, width: Dimensions.get('window').width - 80, height: 350 }} position={"center"} ref={"Modal"} isDisabled={false} backdropPressToClose={false} swipeToClose={false}>
          <Header style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: '#ffff', borderColor: '#ffff' }}>
            <Item style={{ justifyContent: 'flex-end', flex: 1, flexDirection: 'row', marginRight: 15, marginTop: 5 }}>
              <Button iconLeft transparent onPress={() => this.refs.Modal.close()}>
                <Icon active type='FontAwesome' name='close' style={{ color: 'red' }} />
              </Button>
            </Item>
          </Header>
          <Content contentContainerStyle={{ flex: 1 }}>
            <Form style={{ marginRight: 10 }}>
              <Item>
                <Icon active type='MaterialIcons' name='attach-money' style={{ color: 'black' }} />
                <Input style={{ color: 'black' }} placeholder="Valor" onChangeText={(Valor) => this.setState({ Card: { Nombre: this.state.Card.Nombre, UrlIcon: this.state.Card.UrlIcon, UrlCard: this.state.Card.UrlCard, Valor: Valor, Disponible: this.state.Card.Disponible }, ModalView: false })} keyboardType='numeric' />
              </Item>
              <Item>
                <Icon active type='FontAwesome' name='check-circle' style={{ color: 'black', fontSize: 20, }} />
                <Input style={{ color: 'black' }} placeholder="Disponibilidad" onChangeText={(Disponible) => this.setState({ Card: { Nombre: this.state.Card.Nombre, UrlIcon: this.state.Card.UrlIcon, UrlCard: this.state.Card.UrlCard, Valor: this.state.Card.Valor, Disponible: Disponible }, ModalView: false })} keyboardType='numeric' />
              </Item>
              <Item>
                <Icon active type='MaterialCommunityIcons' name='weather-pouring' style={{ color: 'black', fontSize: 20, }} />
                <Input style={{ color: 'black' }} placeholder="Url Card" onChangeText={(Url) => this.setState({ Card: { Nombre: this.state.Card.Nombre, UrlIcon: this.state.Card.UrlIcon, UrlCard: Url, Valor: this.state.Card.Valor, Disponible: this.state.Card.Disponible }, ModalView: false })} />
              </Item>
              <Item>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" type='FontAwesome' />}
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
        {this.state.ModalView ? <ModalBox Text={this.state.ModalTexto} SpinnerComp={!this.state.ModalImage} Close={this.state.ModalImage} Image={this.state.ModalImage} ImageSet={this.state.ModalImageSet} /> : null}
      </Container>
    );
  }
}