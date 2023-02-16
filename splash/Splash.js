import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, View, Text ,StyleSheet} from "react-native";


const Splash=()=>{
    const [isGo,setIsGo]=useState(true);
    const Navigation=useNavigation();

    useEffect(()=>{
        if(isGo==true){
            setTimeout(()=>{
                Navigation.navigate("Login");
                setIsGo(false)
            },4000);
        }
    });


    return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}>
                <Image style={styles.default} source={require('../sources/images/logo.png')}  />
            </View>    

    );
}
const styles = StyleSheet.create({
    default:{
        alignItems:'center',
        justifyContent:'center',
        width:250,
        height:250,
        borderRadius:1000,

    },
     
  });
export default Splash;
