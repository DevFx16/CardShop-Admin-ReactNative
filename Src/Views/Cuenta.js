import React from 'react';
import { Dimensions } from 'react-native';
import { Icon, Content, Button, Container, Header, Item, Input, Thumbnail, Form, Picker, Text } from 'native-base';
import Lista from '../Views/List';
import { Col, Row, Grid } from "react-native-easy-grid";
import Modal from 'react-native-modalbox';
import CardCo  from '../Controllers/CardController';
import ModalBox from '../Views/ModalBox';

const Array = ['Amazon', 'GooglePlay', 'iTunes', 'PlayStation', 'Steam', 'Xbox', 'Paypal'];

export default class Cuenta extends React.Component {

  constructor(props) {
    super(props);
    this.state = { Datos: { Datos: this.props.screenProps.Backend, Token: this.props.screenProps.Token }, Card: { Nombre: 'Amazon', UrlIcon: 'http://www.kimlukeauthor.com/wp-content/uploads/2015/03/Amazon-Icon.png', UrlCard: '', Valor: 0, Disponible: 0 }, ModalView: false, ModalImage: false, ModalImageSet: '' }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.screenProps.route_index === 2) {
      this.setState({ Datos: { Datos: newProps.screenProps.Backend, Token: newProps.screenProps.Token }, ModalView: false });
    }
  }


  PickerValue = (Value) => {
    var Url;
    if(Value === 'Amazon'){
      Url = 'http://www.kimlukeauthor.com/wp-content/uploads/2015/03/Amazon-Icon.png';
    }else if(Value === 'GooglePlay'){
      Url = 'https://www.androidpolice.com/wp-content/uploads/2017/05/nexus2cee_ic_launcher_play_store_new-1.png';
    }else if(Value === 'iTunes'){
      Url = 'https://pre00.deviantart.net/a18a/th/pre/f/2015/161/a/e/itunes_13_icon__png__ico__icns__by_loinik-d8wqjzr.png';
    }else if(Value === 'PlayStation'){
      Url = 'http://playstationeu.i.lithium.com/t5/image/serverpage/image-id/915459iA23166170E72C898/image-size/original?v=mpbl-1&px=-1';
    }else if(Value === 'Steam'){
      Url = 'https://vignette.wikia.nocookie.net/central/images/1/14/Steam_icon_logo.svg.png/revision/latest?cb=20170704030440';
    }else if(Value === 'Xbox'){
      Url = 'https://cdn2.iconfinder.com/data/icons/metro-uinvert-dock/256/XBox_360.png';
    }else{
      Url = 'http://icons.iconarchive.com/icons/sicons/basic-round-social/256/paypal-icon.png';
    }
    this.setState({ Card: { Nombre: Value, UrlIcon: Url, UrlCard: this.state.Card.UrlCard, Valor: this.state.Card.Valor, Disponible: this.state.Card.Disponible }, ModalView: false })
  }

  Añadir = () => {
    var noValido = / /;
    console.log(this.state.Card.UrlCard);
    if(this.state.Card.Nombre.length <= 0 || this.state.Card.UrlCard.length <= 0 || this.state.Card.UrlIcon.length <= 0 || this.state.Card.Disponible <= 0 || this.state.Card.Valor <= 0 || noValido.test(this.state.Card.UrlCard)){
      this.setState({ ModalTexto: 'Se requieren los campos', ModalImage: true, ModalView: true, ModalImageSet: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678069-sign-error-512.png' });
    }else{
      this.setState({ ModalTexto: 'Espere...', ModalView: true, ModalImage: false });
      CardCo.Post(JSON.stringify(this.state.Card), this.state.Card.Nombre, this.state.Datos.Token).then((Res) =>{
        if(Res.status == 401){
          CardCo.ReAuth();
          Añadir();
        }else{
          if(Res.status == 200){
            (Res.json()).then((Res) =>{
              CardCo.setDatos({Cards : Res, Token: this.props.Token}, 'Datos');
              this.setState({ ModalTexto: 'Se ha registrado', ModalImage: true, ModalView: true, ModalImageSet: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-512.png' });
            })
          }else{
            this.setState({ ModalTexto: 'Ha ocurrido un error vuelva a intentar', ModalImage: true, ModalView: true, ModalImageSet: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678069-sign-error-512.png' });
          }
        }
      })
    }
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
                <Input style={{ color: 'black' }} placeholder="Valor" onChangeText={(Valor) => this.setState({ Card: { Nombre: this.state.Card.Nombre, UrlIcon: this.state.Card.UrlIcon, UrlCard: this.state.Card.UrlCard, Valor: Valor, Disponible: this.state.Card.Disponible }, ModalView: false })} keyboardType='numeric'/>
              </Item>
              <Item>
                <Icon active type='FontAwesome' name='check-circle' style={{ color: 'black', fontSize: 20, }} />
                <Input style={{ color: 'black' }} placeholder="Disponibilidad" onChangeText={(Disponible) => this.setState({ Card: { Nombre: this.state.Card.Nombre, UrlIcon: this.state.Card.UrlIcon, UrlCard: this.state.Card.UrlCard, Valor: this.state.Card.Valor, Disponible: Disponible }, ModalView: false })} keyboardType='numeric'/>
              </Item>
              <Item>
                <Icon active type='MaterialCommunityIcons' name='weather-pouring' style={{ color: 'black', fontSize: 20, }} />
                <Input style={{ color: 'black' }} placeholder="Url Card" onChangeText={(Url) => this.setState({ Card: { Nombre: this.state.Card.Nombre, UrlIcon: this.state.Card.UrlIcon, UrlCard: Url, Valor: this.state.Card.Valor, Disponible: this.state.Card.Disponible }, ModalView: false })} />
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
        {this.state.ModalView ? <ModalBox Text={this.state.ModalTexto} SpinnerComp={!this.state.ModalImage} Close={this.state.ModalImage} Image={this.state.ModalImage} ImageSet={this.state.ModalImageSet} /> : null}
      </Container>
    );
  }
}