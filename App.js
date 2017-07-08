import React from 'react';
import { StyleSheet, Text, View, ListView, Modal } from 'react-native';
import mockData from './mockData'
import Row from './PickerRow'



export default class App extends React.Component {
    constructor(props) {
    super(props);



    const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
    const getRowData = (dataBlob, sectionId, rowId) => {
                console.log(dataBlob[`${rowId}`]);
                return dataBlob[`${rowId}`];
            }

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
      getSectionData,
      getRowData,
    });

    const { dataBlob, sectionIds, rowIds } = this.formatData(mockData);

    this.state = {
      dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds),
      data: mockData
    };
  }


  formatData(data) {
      const dataBlob = {};
      const sectionIds = [];
      const rowIds = [];
      rowIds.push([]);

      sectionIds.push(0);
      dataBlob[0] = 'Header';

    //   for (let sectionId = 0; sectionId < data.length; sectionId++) {
    //       sectionIds.push(sectionId);
    //       dataBlob[sectionId] = 'Header';
    //   }
      for (let rowId = 0; rowId < data.length; rowId++) {
          const rowIdTest = `0:${rowId}`;
         rowIds[0].push(rowIdTest);
         dataBlob[rowIdTest] = data[rowId];
      }

     // debugger
      return { dataBlob, sectionIds, rowIds };

  }


  _onShowModalPicker (name, currentColor) {
      const newdata = this.state.data.map(element => {
            if(element.name == name){
                element.value = currentColor
            }
            return element
        });
      this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(newdata),
            data: newdata
        });

  }

  renderRow(data) {
      console.log(data)
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
            renderSectionHeader={this.renderHeader}
            stickySectionHeadersEnabled={true}
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
