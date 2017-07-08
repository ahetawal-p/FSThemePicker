import React from 'react';
import { StyleSheet, Text, View, ListView, Modal, TouchableNativeFeedback } from 'react-native';
import mockData from './mockData'
import Row from './PickerRow'

export default class App extends React.Component {
    constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(mockData),
      data: mockData
    };
  }

  _onShowModalPicker (name, currentColor) {
      const newdata = this.state.data.map(element => {
            if(element.name == name){
                element.value = currentColor
            }
            return element
        });
      this.setState({
            dataSource: this.state.dataSource.cloneWithRows(newdata),
            data: newdata
        });

  }

  renderRow(data) {
      return (<Row data={data} key={data.name} onButtonPress={this._onShowModalPicker.bind(this)}/>)
  }

  _onSaveButton = () => {
      alert('Save Clicked');
    }

    _onCancelButton = () => {
        alert('Cancel Clicked');
      }

  renderHeader() {
      return (
          <View style={styles.header}>
              <TouchableNativeFeedback
                  onPress={this._onCancelButton}
                  background={TouchableNativeFeedback.SelectableBackgroundBorderless()}>
                  <View style={{padding:16}}>
                      <Text style={[styles.input]}>
                          {'Cancel'}
                      </Text>
                  </View>
              </TouchableNativeFeedback>
              <Text style={[styles.input, {fontSize:18}, {fontWeight: 'bold'}]}>
                  {'ThemePicker'}
              </Text>
              <TouchableNativeFeedback
                  onPress={this._onSaveButton}
                  background={TouchableNativeFeedback.SelectableBackgroundBorderless()}>
                  <View style={{padding:16}}>
                      <Text style={[styles.input]}>
                          {'Save'}
                      </Text>
                  </View>
              </TouchableNativeFeedback>

          </View>
      )
  }

  render() {
    return (
        <ListView
            style={styles.container}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
            renderHeader={this.renderHeader.bind(this)}
            renderFooter={this.renderHeader.bind(this)}
        />
    );
  }
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        height: 56,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E6E6EB'
    },
    input: {
        fontSize:16,
    },
    container: {
        flex: 1,
        marginTop: 20,
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    }
});
