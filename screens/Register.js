import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";
import {firebase} from '../config';
import { SafeAreaView, View, StyleSheet, Image, ScrollView, Text, TextInput, Pressable, Touchable, TouchableOpacity, RootTagContext } from "react-native";

const Register=()=>{
    const navigation=useNavigation();
    const [email, setEmail]=useState('');
    const [nic, setNic]=useState('');
    const [password, setPassword]=useState('');
    const [firstName, setFirstName]=useState('');
    const [lastName, setLastName]=useState('');
    const [number, setNumber]=useState('');
    const [address, setAddress]=useState('');

    const registerUser=async(email, password, firstName, lastName)=>{
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(()=>{
            firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp:true,
                url:'https://foodsha-2aa1f.firebaseapp.com',
            })
            .then(()=>{
                alert('Verficatio email sent')
            }).catch((error)=>{
                alert(error.message)
            })
            .then(()=>{
                firebase.firestore().collection('users')
                .doc(firebase.auth().currentUser.uid)
                .set({
                    "firstname":firstName,
                    "lastname":lastName,
                    "password":password,
                    "email":email,
                    "number":number,
                    "nic":nic,
                    "address":address,
                 
                })
                   
            })
            .catch((error)=>{
                alert(error.message)
            })     
        })
        .catch((error=>{
            alert(error.message)
        }))

    }
    return(
        <SafeAreaView>
            <ScrollView>
            {/*adding logo*/ }
                <View style={styles.container}>
                    <Image style={styles.default} source={require('../sources/images/logo.jpg')} resizeMode={'stretch'} />
                </View>

                 {/*First name and last name*/ }
                <View style={styles.view1}>
                    <TextInput style={styles.inputStyle} placeholder="First Name" onChangeText={(firstName)=>setFirstName(firstName)} autoCorrect={false} />
                    <TextInput style={styles.inputStyle} placeholder="Last Name" onChangeText={(lastName)=>setLastName(lastName)} autoCorrect={false} />    
                </View>

                 {/*Contact number and email*/ }
                <View style={styles.container}>
                    <TextInput style={styles.contactStyle} placeholder="Contact Number" onChangeText={(number)=>setNumber(number)}  autoCorrect={false} keyboardType="numeric"/>
                    <TextInput style={styles.contactStyle} placeholder="Email Address" onChangeText={(email)=>setEmail(email)} autoCapitalize="none" autoCorrect={false} keyboardType="email-address" />
                    <TextInput style={styles.contactStyle} placeholder="NIC" onChangeText={(nic)=>setEmail(nic)} autoCapitalize="none" autoCorrect={false} />
                </View>

                 

                {/*Full Address*/ }
                <View style={styles.container}>
                    <TextInput style={styles.contactStyle} placeholder="Full Address" onChangeText={(address)=>setAddress(address)} autoCapitalize="none" autoCorrect={false} />
                </View>

                {/*Password*/ }
                <View style={styles.container}>
                    <TextInput style={styles.contactStyle} placeholder="Password" onChangeText={(password)=>setPassword(password)} autoCapitalize="none" autoCorrect={false} secureTextEntry={true} />
                </View>

                {/*Submit*/ }
                <View style={styles.container}>
                    <TouchableOpacity onPress={()=>{registerUser(email, password, firstName, lastName, number, nic, address)}} style={styles.registerButton} onPressOut={()=>{navigation.navigate("Login")}}>
                        <Text style={{color:'#fff', fontSize:20}}>Submit</Text>
                    </TouchableOpacity>
                </View>

                {/*Login*/ }
                <View style={styles.container}>
                    <TouchableOpacity>
                        <Text style={{color:'#000', fontSize:15, padding:10}} onPress={()=>{navigation.navigate("Login")}}>Have you account?</Text>
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
        marginTop:40,
    },
    inputStyle:{
        flex:2,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor:'#00E7FF',
        borderRadius:20,
        textAlign:"center",
    },
    registerButton:{
        width:330,
        height:50,
        borderRadius:40,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:'#019267',
        marginTop:10,
        
    },
    view1:{
        flex:1,
        flexDirection:"row",
    },
    contactStyle:{
        width:330,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor:'#00E7FF',
        borderRadius:20,
        textAlign:"center",
    },
    locationStyle:{
        flex:3,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor:'#000000',
        borderRadius:20,
        textAlign:"center",

    }
    
  });

export default Register;