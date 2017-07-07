import React, {Component} from 'react';
import { View, Text, StyleSheet, Button, Modal, TouchableHighlight} from 'react-native';
import { ColorPicker, toHsv, fromHsv } from 'react-native-color-picker'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  text: {
    marginLeft: 12,
    marginRight: 12,
    fontSize: 16,
    flexGrow: 1,
  },
  circle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'transparent'
  },
  button: {
      marginLeft:'auto'

  },
});

export default class PickerRow extends Component {
    constructor(props) {
    super(props);
    console.log(fromHsv(toHsv(this.props.data.value)))
    this.state = {
      modalVisible: false,
      color: toHsv(this.props.data.value)
    };
  }

     _onButtonPress = (id, color) => {
        this.setState({modalVisible: true});
    }

    onColorChange(color) {
        this.setState({ color })
  }

  onColorSelected() {
      this.setState({modalVisible: false});
      this.props.onButtonPress(this.props.data.name, fromHsv(this.state.color))
  }

  onOldColorSelected() {
      this.setState({modalVisible: false});
      this.props.onButtonPress(this.props.data.name, fromHsv(toHsv(this.props.data.value)))
  }

    render() {
        return(
            <View style={styles.container}>
                <View style={[styles.circle, {backgroundColor: fromHsv(this.props.data.value)}]} />
                <Text style={styles.text}>
                    {this.props.data.name}
                </Text>
                <Button style={styles.button} onPress={this._onButtonPress} title="Pick" color="#cbcfd6"/>
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={this.onColorSelected.bind(this)}
                >

                    <View style={{flex: 1, padding: 10, backgroundColor: '#212021'}}>
                        <Text style={{color: 'white'}}>Theme for {this.props.data.name}</Text>
                        <ColorPicker
                            oldColor={fromHsv(toHsv(this.props.data.value))}
                            color={this.state.color}
                            onColorChange={this.onColorChange.bind(this)}
                            onColorSelected={this.onColorSelected.bind(this)}
                            onOldColorSelected={this.onOldColorSelected.bind(this)}
                            style={{flex: 1}}
                        />
                    </View>
                </Modal>
            </View>
        )
    }
}
