
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
            <ScrollView>
                <View style={styles.container}>
                    <Image style={styles.default} source={require('../sources/images/logo.jpg')} resizeMode={'stretch'} />
                </View>
                <View style={styles.container}>
                    <TextInput style={styles.inputStyle} placeholder="enter your email" onChangeText={(email)=>setEmail(email)} autoCapitalize="none" autoCorrect={false} />
                    <TextInput style={styles.inputStyle} placeholder="enter your password" onChangeText={(password)=>setPassword(password)} autoCapitalize="none" autoCorrect={false}  secureTextEntry={true}/>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity onPress={()=>loginUser(email, password)} style={styles.loginButton}>
                        <Text style={{color:'#fff', fontSize:20}}>Login</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.container}>
                    <TouchableOpacity>
                        <Text style={{color:'#000', fontSize:20,padding:20}} onPress={()=>{navigation.navigate("Register")}}>Don't have an account?</Text>
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
    loginButton:{
        width:300,
        height:40,
        borderRadius:40,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:'#160be0',
        
    },
    
  });

export default Login;