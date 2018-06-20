import React from 'react';
import { Dimensions } from 'react-native';
import Modal from 'react-native-modalbox';
import PropTypes from 'prop-types';
import { Icon, Text, Spinner, Button, Thumbnail, Header, Item } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class ModalBox extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.refs.Modal.open();
  }
  componentDidUpdate(){
    this.refs.Modal.open();
  }
  render() {
    return (
      <Modal style={{ borderRadius: 20, shadowRadius: 20, width: Dimensions.get('window').width - 60, height: 180 }} position={"center"} ref={"Modal"} isDisabled={false} backdropPressToClose={false} swipeToClose={false}>
        <Header style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: '#ffff', borderColor: '#ffff' }}>
          <Item style={{ justifyContent: 'flex-end', flex: 1, flexDirection: 'row', marginRight: 15, marginTop: 5 }}>
            {this.props.Close ?
              (<Button iconLeft transparent onPress={() => this.refs.Modal.close()}>
                <Icon active type='FontAwesome' name='close' style={{ color: 'red' }} />
              </Button>) : null}
          </Item>
        </Header>
        <Grid style={{ flex: 1 }}>
          <Col size={1} style={{ justifyContent: 'center', marginLeft: 20 }}>
            {this.props.SpinnerComp ? <Spinner color='red' size='large' /> : null}
            {this.props.Image ? <Thumbnail source={{ uri: this.props.ImageSet }} large/> : null}
          </Col>
          <Col size={2} style={{ justifyContent: 'center' }}>
            <Text style={{ color: 'black' }}>{this.props.Text}</Text>
          </Col>
        </Grid>
      </Modal>
    );
  }
}

ModalBox.propTypes = {
  Text: PropTypes.string.isRequired,
  SpinnerComp: PropTypes.bool.isRequired,
  Close: PropTypes.bool.isRequired,
  Image: PropTypes.bool.isRequired,
  ImageSet: PropTypes.string.isRequired
}
