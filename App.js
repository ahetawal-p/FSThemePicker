import React from 'react';
import { StyleSheet, Text, View, ListView, Modal } from 'react-native';
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

  renderHeader() {
      return (<View style={styles.container}>
          <Text style={styles.input}>
              {'Test this'}
          </Text>

      </View>)
  }

  render() {
    return (
        <ListView
            style={styles.container}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
            renderHeader={() => this.renderHeader()}
        />
    );
  }
}

const styles = StyleSheet.create({
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
