import React from "react";
import { SafeAreaView, View, StyleSheet, Image, ScrollView, Text, TextInput, Pressable, Touchable, TouchableOpacity } from "react-native";

const Forget=()=>{
    return(
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Image style={styles.default} source={require('../sources/images/logo.jpg')} resizeMode={'stretch'} />
                </View>
                <View style={styles.container}>
                    <TextInput style={styles.inputStyle} placeholder="enter your email" />
                </View>

                <View style={styles.container}>
                    <TouchableOpacity style={styles.forgetButton}>
                        <Text style={{color:'#fff', fontSize:20}}>Send Code</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        </SafeAreaView>
            

    );
    
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems:'center',
      justifyContent:'center',  
    },
    default:{
        alignItems:'center',
        justifyContent:'center',
        width:150,
        height:150,
        borderRadius:1000,
        marginTop:100,
    },
    inputStyle:{
        width:300,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor:'#000000',
        borderRadius:20,
        textAlign:"center",
    },
    forgetButton:{
        width:300,
        height:40,
        borderRadius:40,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:'#f0430a',
        
    },
    
  });

export default Forget;