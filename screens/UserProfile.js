import React, {useState, useEffect} from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import {firebase} from '../config';
import { SafeAreaView, View, StyleSheet, Image, ScrollView, Text, TextInput, Pressable, Touchable, TouchableOpacity, RootTagContext, Alert, FlatList } from "react-native";

const UserProfile=()=>{
    const navigation =useNavigation();
    //get current user id
    const user = firebase.auth().currentUser;
    const [userDetails, setUserDetails]=useState([]);
  const todoRef = firebase.firestore().collection('users');

  useEffect(()=>{
    const loadingdata=async()=>{
      todoRef
      .where('email','==',`${user.email}`)
      .get()
      .then(
        querySnapshot=>{
          const userDetails=[]
          querySnapshot.forEach((doc)=>{
            const {address, firstname , lastname, email} = doc.data()
            userDetails.push({
              address,
              firstname, 
              lastname,
              email,
            })
          })
          setUserDetails(userDetails);
        }  

      )
        
      

    }
    loadingdata();
    
  },[])





  return (
    <SafeAreaView>
        <ScrollView nestedScrollEnabled={true}>
            <View style={{marginTop:50}}>
            <View style={styles.container}>
                <Image style={styles.userProfile} source={require('../sources/images/logo.jpg')} resizeMode={'stretch'} />
                <ScrollView nestedScrollEnabled={true}> 
              <View>
                <FlatList
                        data={userDetails}
                        renderItem={({item})=>(
                        <View >
                
                            <Text style={styles.userName}  >{item.firstname} {item.lastname}</Text>
                            <Text>Email:{item.email}</Text>

                                        
                        </View>                 
                    )}
                  />

              </View>
              
            </ScrollView>
            </View>
            <View>
            
                
            </View>
            <View>
                <TouchableOpacity style={styles.userListingButton}>
                    <Text onPress={()=>{navigation.navigate("UserListings")}} style={{color:'#fff', fontSize:20}}>My Listings</Text>
                </TouchableOpacity>
            </View>
            
        </View>

        </ScrollView>
    </SafeAreaView>
    
  );

}
const styles=StyleSheet.create({
    userProfile:{
        alignItems:'center',
        justifyContent:'center',
        width:60,
        height:60,
        borderRadius:1000,
        marginLeft:20,
       
    },
    userName:{
        color:'#13005A',
        fontWeight:"bold",
        fontSize:15,
        textAlign:"center",
        textTransform:"capitalize",
       

        

    },
    userListingButton:{
        width:300,
        height:60,
        borderRadius:40,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:'#019267',

    },
})
export default UserProfile;