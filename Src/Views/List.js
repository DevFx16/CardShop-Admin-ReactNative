import React from 'react';
import {Text, Icon, SwipeRow, Button, View} from 'native-base';
import PropTypes from 'prop-types';

export default class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {Array: ["hola", "hola 1"]}
  }

  render(){
    return(
      <View>
        {
          this.props.Array.map((Data, index) =>{
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
      </View>
    );
  }

}

List.propTypes = {
  Array: PropTypes.array.isRequired
}
