import React from 'react';
import {Text, Icon, Content, SwipeRow, Button, Container, Header, Item, Input, View} from 'native-base';
import Theme from '../Themes/Tab'
import getTheme from '../Themes/components';
import Lista from '../Views/List';

export default class Cuenta extends React.Component {

  constructor(props) {
    super(props);
    this.state = {Array: ["hola", "hola 1"]}
  }

  List(Array){
    Array.map((Data, index) =>{
      return(
        <View style={{backgroundColor: '#324054', borderWidth: 0, borderColor: '#324054', marginBottom: 10}}  key={index}>
          <SwipeRow style={{backgroundColor: '#324054', borderWidth: 0, borderColor: '#324054'}}
            leftOpenValue={75}
            rightOpenValue={-75}
            left={
              <Button primary onPress={() => alert('Edit')}>
                <Icon active name="edit" type='FontAwesome'/>
              </Button>
            }
            body={
              <View>
                <Text style={{color: '#ffff'}}>GiftCard Amazon 100 USD</Text>
              </View>
            }
            right={
              <Button danger onPress={() => alert('Trash')}>
                <Icon active name="trash"type='Entypo' />
              </Button>
            }
          />
        </View>
      );
    })
  }

  render(){
    return(
      <Container>
        <Header searchBar rounded style={{backgroundColor: '#d93e3f'}}>
          <Item>
            <Icon name="search" type='FontAwesome' style={{color: '#d93e3f'}}/>
            <Input placeholder="Buscar" />
            <Icon name="cards" type='MaterialCommunityIcons' style={{color: '#d93e3f'}}/>
            <Button transparent>
              <Text style={{color: '#d93e3f'}}>Buscar</Text>
            </Button>
          </Item>
        </Header>
        <Content padder>
          <Lista Array={this.state.Array}/>
        </Content>
      </Container>
    );
  }
}