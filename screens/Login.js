
import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";
import {firebase} from '../config';
import { SafeAreaView, View, StyleSheet, Image, ScrollView, Text, TextInput, Pressable, Touchable, TouchableOpacity } from "react-native";

const Login=()=>{
    const navigation=useNavigation();
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    loginUser= async(email, password)=>{
        try{
            await firebase.auth().signInWithEmailAndPassword(email, password)
        }catch (error){
            alert(error.message)
        }
    }
    return(
                <SafeAreaView>
                    <ScrollView >
                        <View style={styles.container}>
                            <Image style={styles.default} source={require('../sources/images/logo.png')} resizeMode={'stretch'} />
                        </View>
                        <View style={{marginTop:-25}}>
                            <View style={styles.container}>
                                <TextInput style={styles.inputStyle} placeholder="Enter Your Email" placeholderTextColor={'#A9A9A9'}  onChangeText={(email)=>setEmail(email)} autoCapitalize="none" autoCorrect={false} />
                                <TextInput style={styles.inputStyle} placeholder="Enter Your Password" placeholderTextColor={'#A9A9A9'} onChangeText={(password)=>setPassword(password)} autoCapitalize="none" autoCorrect={false}  secureTextEntry={true}/>
                            </View>
                            <View style={styles.container}>
                                <TouchableOpacity onPress={()=>loginUser(email, password)} style={styles.loginButton}>
                                    <Text style={{color:'#fff', fontSize:20}}>Login</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.container}>
                                <TouchableOpacity>
                                    <Text style={{color:'#696969', fontSize:15,padding:20}} onPress={()=>{navigation.navigate("Register")}}>Don't have an account?</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        
                    </ScrollView>
            </SafeAreaView>

            

    );
    
}
const styles = StyleSheet.create({

    container: {

      alignItems:'center',
      justifyContent:'center', 

    },
    default:{
        alignItems:'center',
        justifyContent:'center',
        width:600,
        height:325,
        borderRadius:1000,
        marginTop:30,
        marginBottom:10,
    },
    inputStyle:{
        width:300,
        height: 50,
        marginTop: 20,
        //borderWidth: 2,
        padding: 10,
        //borderColor:'#fe0000',
        borderRadius:20,
        textAlign:"center",
        elevation:5,
        backgroundColor:'#FFF'
 
        
       
    },
    loginButton:{
        width:300,
        height:60,
        borderRadius:40,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:'#fe0000',
        marginTop:25,
        elevation:5,

    },
    
  });

export default Login;