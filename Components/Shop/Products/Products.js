/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, View,ListView,Image,RefreshControl} from 'react-native';
import getAllProduct from '../../Api/ProductApi/getAllProduct';
import {pageSizeDefault} from '../../../Common/PaginationDefault';



export default class Products extends Component {

  constructor(props){
    super(props);
    
    this.state = {
      page:0,
      totalPages:0,
      refreshing: false,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      
    };
  }

 CrawlProductData(keyword,page,pageSize){
  getAllProduct(keyword,page,pageSize)
    .then((responseJson) => {
      //console.log(responseJson.Items);
        console.log( "current "+this.state.page+"- total:"+responseJson.TotalPages);
        this.setState({      
          dataSource: this.state.dataSource.cloneWithRows(responseJson.Items),        
          page: this.state.page +1,
          totalPages: responseJson.TotalPages,
          refreshing:false
        });
      
      console.log( "currentafter "+this.state.page+"- totalRes:"+responseJson.TotalPages+"- totalProp:"+this.state.totalPages);
      //console.log(responseJson);
    })
    .catch((error) => {
      console.error(error);
    });
}

  loadNewData(){

    this.setState({
      refreshing:true
    });

    console.log("reload: Curpage="+this.state.page +" - CurTotal="+ this.state.totalPages);

    if(this.state.page < this.state.totalPages){
      console.log("true");
      this.CrawlProductData("",this.state.page,pageSizeDefault());
    }
    else{      
      console.log('false');
      this.setState({  
        page: 0
      });
      console.log('PageCauseError: '+ this.state.page);
     this.CrawlProductData("",0,pageSizeDefault());
      console.log('false result: '+this.state.refreshing + "-"+this.state.page);
    }    
  }

  render() {
    return (      
          //refresh list view
          <ListView
            refreshControl = {
              <RefreshControl
                refreshing={this.state.refreshing}              //bool IsRefresh indicator
                onRefresh={this.loadNewData.bind(this)}         // If yes, do function
              />
            }
            
            //read each data row by render Row with rowItem
            dataSource={this.state.dataSource}
            renderRow={(rowItem) => 
              <View style={{padding:20, borderWidth:1}}>
                { <Image source={{uri:rowItem.Image}} style={{width:70,height:100}}/> }
                <Text>{rowItem.Name}</Text>                
              </View>
              
            }
          />
            
    );
  }

  componentDidMount(){
    this.CrawlProductData("",0,pageSizeDefault());
  }
}



