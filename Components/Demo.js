import React, { Component } from 'react';
import {StyleSheet, View, Text, ActivityIndicator, FlatList} from 'react-native';


export default class Demo extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading : true,
      dataSource: null,
    }
  };

  componentDidMount(){
      fetch('https://facebook.github.io/react-native/movies.json')
      .then((response)=> response.json())
      .then( (responseJSON) =>{
          this.setState({
              isLoading : false,
              dataSource: responseJSON.movies
          })
          console.log(responseJSON)
      })
      .catch((error) =>{
          console.log(error);
      })
  }

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
          keyExtractor={({id}, index) => id}
        />
      </View>
    );
  }
}