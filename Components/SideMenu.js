import React, {Component} from 'react';
import {Text, View,TouchableOpacity,Image,RefreshControl} from 'react-native';
import Drawer from 'react-native-drawer';

export default class SideMenu extends Component {
    closeControlPanel = () => {
        this._drawer.close()
      };
      openControlPanel = () => {
        this._drawer.open()
      };
    render() {
        
        return (
            
                <Drawer
                    tapToClose={true}
                    openDrawerOffset={0.5} // 50% gap on the right side of drawer
                    ref={(ref) => this._drawer = ref}
                    content={
                        <View style={{ flex:1, backgroundColor:"blue"}}></View>
                    }
                    >

                    <View style={{flex:1,backgroundColor:"yellow",padding:50}}>
                        <TouchableOpacity onPress={()=>{this.openControlPanel()}}>
                            <Text>OPEN</Text>
                        </TouchableOpacity>
                    </View>

                </Drawer>               
            
        );    
    }

}