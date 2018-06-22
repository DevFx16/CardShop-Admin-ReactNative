import React from 'react';
import { Icon, Content, Button, Container, Header, Item, Input, Thumbnail } from 'native-base';
import Lista from '../Views/List';
import { Col, Row, Grid } from "react-native-easy-grid";

export default class Cuenta extends React.Component {

  constructor(props) {
    super(props);
    this.state = { Array: ["Amazon 100 USD", "Amazon 50 USD"] }
  }

  render() {
    return (
      <Container style={{backgroundColor: '#222b38'}}>
        <Header searchBar rounded style={{ backgroundColor: '#d93e3f' }}>
          <Item>
            <Icon name="search" type='FontAwesome' style={{ color: '#d93e3f' }} />
            <Input placeholder="Buscar" />
            <Icon name="cards" type='MaterialCommunityIcons' style={{ color: '#d93e3f' }} />
            <Button transparent>
              <Icon active name="add-to-photos" type='MaterialIcons' style={{ color: '#d93e3f' }} />
            </Button>
          </Item>
        </Header>
        <Content padder contentContainerStyle={{ alignContent: 'center' }}>
          <Grid>
            <Row style={{ justifyContent: 'center' }} size={1}>
              <Thumbnail source={require('../Images/amazon.png')} large />
            </Row>
            <Lista Array={this.state.Array} Icon={{ Nombre: 'amazon', Tipo: 'FontAwesome' }} />
            <Row style={{ justifyContent: 'center' }} size={1}>
              <Thumbnail source={{ uri: 'https://cdn4.iconfinder.com/data/icons/free-colorful-icons/360/google_play.png' }} large />
            </Row>
            <Lista Array={["Google Play 100 USD", "Google Play 50 USD"]} Icon={{ Nombre: 'google-play', Tipo: 'Entypo' }} />
          </Grid>
        </Content>
      </Container>
    );
  }
}