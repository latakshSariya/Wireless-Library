import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class issuescreen extends React.Component {

  constructor(){
    super();
    this.state = {
      Camerapermission : null,
      isScanned : false,
      ScannedData : '',
      buttonState : 'normal'
    }
  }
  getCameraPermission=async()=>{
    const{status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      Camerapermission:status === 'granted' ,
      buttonState : 'clicked',
      isScanned :false
    })
  }
  barCodeScanHandler=async({type, data})=>{
    this.setState({
      isScanned : true,
      ScannedData:data,
      buttonState:'normal',
    })
  }
  render() {
    const CameraPermission =this.state.Camerapermission;
    const Scanned = this.state.isScanned;
    const buttonState = this.state.buttonState;
    if (buttonState === 'clicked' && CameraPermission) {
      return(
        <BarCodeScanner
        onBarCodeScanned = {Scanned ? undefined : this.barCodeScanHandler}
        /> 
      )}
      else if(buttonState === 'normal'){  
        return (
          <View style={{flex:1}}>
            <TouchableOpacity style = {styles.scanButton} 
              onPress={this.getCameraPermission}>
              <Text style = {styles.buttonText}>Click Here To Scan</Text>
            </TouchableOpacity>  
            <Text style={styles.headingStyle}>
             {CameraPermission === true ? this.state.ScannedData : "Request Camera Permission Again"}
          </Text>      
          </View>
        );
      }
    }
  }

const styles = StyleSheet.create({
    headingStyle:{
      fontSize:20,
      color:"black",
      alignContent:'center',
      alignItems:'center',
      alignSelf:'center',
      marginTop:30
    },buttonText:{
      fontSize:20,
      fontWeight:'bold',
      color:'#f8f4e1',
      alignSelf:'center'
    },
    scanButton:{
      backgroundColor:'#4e3620',
      margin:10,
      padding:10,
      marginTop:20
    }

})
