import React from 'react';
import {Card, CardItem, Text, Icon, Content, Right, Left} from 'native-base';

const Array = [{Nombre: 'Amazon', Icon: {Nombre: 'amazon', Tipo: 'FontAwesome'}}, {Nombre: 'Google Play', Icon: {Nombre: 'google-play', Tipo: 'Entypo'}}, {Nombre: 'iTunes', Icon: {Nombre: 'itunes', Tipo: 'Zocial'}}, {Nombre: 'PlayStation', Icon: {Nombre: 'logo-playstation', Tipo: 'Ionicons'}}, {Nombre: 'Xbox', Icon: {Nombre: 'xbox', Tipo: 'MaterialCommunityIcons'}}, {Nombre: 'Paypal', Icon: {Nombre: 'paypal', Tipo: 'FontAwesome'}}, {Nombre: 'Steam', Icon: {Nombre: 'steam', Tipo: 'FontAwesome'}}];

export default class Categorias extends React.Component {

  constructor(props) {
    super(props);
  }
  render(){
    return(
      <Content>
        {
          Array.map((Categoria, index) =>{
            return(
              <Card key={index}>
                <CardItem button icon Bordered onPress={() => alert("Has Presionado: "+Categoria.Nombre)}>
                  <Left>
                    <Icon name={Categoria.Icon.Nombre} type={Categoria.Icon.Tipo} style={{color:'#b33b3c'}}/>
                  </Left>
                  <Text style={{color: "#b33b3c"}}>{Categoria.Nombre}</Text>
                  <Right>
                    <Icon name="hand-o-right" type='FontAwesome' style={{color:'#b33b3c'}}/>
                  </Right>
                </CardItem>
              </Card>
            );
          })
        }
      </Content>
    );
  }
}