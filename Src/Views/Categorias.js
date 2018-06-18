import React from 'react';
import {Card, CardItem, Text, Icon, Content, Right, Left, StyleProvider} from 'native-base';
import Theme from '../Themes/Tab'
import getTheme from '../Themes/components';

const Array = [{Nombre: 'Amazon', Icon: {Nombre: 'amazon', Tipo: 'FontAwesome'}}, {Nombre: 'Google Play', Icon: {Nombre: 'google-play', Tipo: 'Entypo'}}, {Nombre: 'iTunes', Icon: {Nombre: 'itunes', Tipo: 'Zocial'}}, {Nombre: 'PlayStation', Icon: {Nombre: 'logo-playstation', Tipo: 'Ionicons'}}, {Nombre: 'Xbox', Icon: {Nombre: 'xbox', Tipo: 'MaterialCommunityIcons'}}, {Nombre: 'Paypal', Icon: {Nombre: 'paypal', Tipo: 'FontAwesome'}}, {Nombre: 'Steam', Icon: {Nombre: 'steam', Tipo: 'FontAwesome'}}];

export default class Categorias extends React.Component {

  constructor(props) {
    super(props);
  }
  render(){
    return(
      <StyleProvider style={getTheme(Theme)}>
        <Content padder contentContainerStyle={{backgroundColor: '#222b38'}}>
          {
            Array.map((Categoria, index) =>{
              return(
                <Card key={index} style={{borderColor: '#ffff'}}>
                  <CardItem button icon Bordered onPress={() => alert("Has Presionado: "+Categoria.Nombre)}>
                    <Left>
                      <Icon name={Categoria.Icon.Nombre} type={Categoria.Icon.Tipo} style={{color:'#ffff'}}/>
                    </Left>
                    <Text style={{color: "#ffff"}}>{Categoria.Nombre}</Text>
                    <Right>
                      <Icon name="hand-o-right" type='FontAwesome' style={{color:'#ffff'}}/>
                    </Right>
                  </CardItem>
                </Card>
              );
            })
          }
        </Content>
      </StyleProvider>
    );
  }
}