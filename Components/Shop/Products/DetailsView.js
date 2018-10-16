import React, {Component} from 'react';
import {Text, View,Image} from 'react-native';

export default class Products extends Component {

    constructor(props){
      super(props);    
      this.state = {
  
        containerStyle: styles.flatContainer,
        itemStyle: styles.itemContainer,
        page:0,
        totalPages:1,
        refreshing: false,
        //dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        dataSource:[]
      };
    }

    render(){
      return(
          <View style={{ flex: 1, backgroundColor: 'red' }}>
              <Text>Details</Text>
          </View>
      );
  }

}