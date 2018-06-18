import React from 'react';
import {Card, CardItem, Icon, Button, View, Left, Right, Text, StyleProvider} from 'native-base';
import PropTypes from 'prop-types';

export default class List extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){
    return(
      <StyleProvider style={getTheme(Theme)}>
        {
          this.props.Array.map((Data, index) =>{
            return(
              <Card key={index} style={{borderWidth: 0, borderRadius: 10, borderColor: '#324054', backgroundColor: '#324054'}}>
                <CardItem icon style={{borderColor: '#324054', borderWidth: 0, backgroundColor: '#324054'}}>
                  <Left>
                    <Button transparent onPress={() => alert('Edit')} iconLeft>
                      <Icon active name="edit" type='FontAwesome' style={{color:'blue'}}/>
                    </Button>
                  </Left>
                  <Text style={{color: "#ffff"}}>{Data}</Text>
                  <Icon name={this.props.Icon.Nombre} type={this.props.Icon.Tipo} style={{color:'#ffff'}}/>
                  <Right>
                    <Button transparent onPress={() => alert('Trash')} iconLeft>
                      <Icon active name="trash"type='Entypo' style={{color:'red'}}/>
                    </Button>
                  </Right>
                </CardItem>
              </Card>
            );
          })
        }
      </StyleProvider>
    );
  }

}

List.propTypes = {
  Array: PropTypes.array.isRequired,
  Icon: PropTypes.object.isRequired
}
