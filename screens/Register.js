import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";
import {firebase} from '../config';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView, View, StyleSheet, Image, ScrollView, Text, TextInput, Pressable, Touchable, TouchableOpacity, RootTagContext, Alert } from "react-native";

const Register=()=>{
    const navigation=useNavigation();
    const [email, setEmail]=useState('');
    const [nic, setNic]=useState('');
    const [password, setPassword]=useState('');
    const [firstName, setFirstName]=useState('');
    const [lastName, setLastName]=useState('');
    const [number, setNumber]=useState('');
    const [address, setAddress]=useState('');
    const [image, setImage]=useState(null);
    const [uploading, setUploading]=useState(false);

    const pickImage=async()=>{
        let result=await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[4,3],
            quality:1,
        });

        const source={uri:result.assets[0].uri};
        setImage(source);
    };
    const uploadImage=async ()=>{
        setUploading(true);
        const response=await fetch(image.uri)
        const blob=await response.blob();
        const filename=image.uri.substring(image.uri.lastIndexOf('/')+1);
        var ref=firebase.storage().ref().child(filename).put(blob);

        try{
            await ref;

        }catch(e){
            console.log(e);
        }
        setUploading(false);
        Alert.alert(
            'Photo Uploaded...!!'
        );
        
        


    }


    

    const registerUser=async(email, password, firstName, lastName ,nic ,number, address, image)=>{
        
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(()=>{
            firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp:true,
                url:'https://foodsha-2aa1f.firebaseapp.com',
            })
            .then(()=>{
                alert('Verfication email sent')
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
                    "image":image,
           })
                   
            })
            .catch((error)=>{
                alert(error.message)
            })     
        })
        .catch((error=>{
            alert(error.message)
        }))
        setImage(null);
       

    }
    return(
        <SafeAreaView>
            <ScrollView>
            {/*adding logo*/ }
                <View style={styles.container}>
                    <Image style={styles.default} source={require('../sources/images/logo.png')} resizeMode={'stretch'} />
                </View>

                <View style={styles.imageContainerMain}>
                        <TouchableOpacity onPress={pickImage}><Image style={styles.addImage} source={require('../sources/images/addImage.png')} /></TouchableOpacity>
                        <View style={styles.imageContainer}>
                          {image && <Image source={{uri:image.uri}} style={{width:300, height:300}} />}
                          <TouchableOpacity onPress={uploadImage}>
                            <Text>Upload Image</Text>
                          </TouchableOpacity>
                        </View>
                </View>

                 {/*First name and last name*/ }
                <View style={styles.container}>
                    <TextInput style={styles.contactStyle} placeholder="First Name" onChangeText={(firstName)=>setFirstName(firstName)} autoCorrect={false} />
                    <TextInput style={styles.contactStyle} placeholder="Last Name" onChangeText={(lastName)=>setLastName(lastName)} autoCorrect={false} />    
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
                    <TouchableOpacity onPress={()=>{registerUser(email, password, firstName, lastName, number, nic, address,image)}} style={styles.registerButton} >
                        <Text style={{color:'#fff', fontSize:20}}>Submit</Text>
                    </TouchableOpacity>
                </View>

                {/*Login*/ }
                <View style={styles.container}>
                    <TouchableOpacity>
                        <Text style={{color:'#696969', fontSize:15, padding:10}} onPress={()=>{navigation.navigate("Login")}}>Have you account?</Text>
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
        width:500,
        height:250,
        borderRadius:1000,
        marginTop:10,
        marginBottom:-30,
    },
    inputStyle:{
      
        margin: 12,
        borderWidth: 1,
        padding: 5,
        borderColor:'#fe0000',
        borderRadius:20,
        textAlign:"center",
    
    },
    registerButton:{
        width:330,
        height:50,
        borderRadius:40,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:'#fe0000',
        marginTop:10,
        
    },
    view1:{
        flex:1,
        flexDirection:"row",
    },
    contactStyle:{
        width:330,
        margin: 12,
        //borderWidth: 1,
        padding: 5,
        //borderColor:'#fe0000',
        borderRadius:20,
        textAlign:"center",
        elevation:5,
        backgroundColor:'#FFF'
    },
    locationStyle:{
        flex:3,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor:'#000000',
        borderRadius:20,
        textAlign:"center",

    },
    imageContainerMain: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',  
        marginTop:50,
    },
    imageContainer:{
        marginBottom:10,
        alignItems:"center",
        
    },
 
    addImage:{
        width:80,
        height:80,
        
    },
  });

export default Register;