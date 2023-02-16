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
            const {address, firstname , lastname, email, nic, number, image} = doc.data()
            userDetails.push({
              address,
              firstname, 
              lastname,
              email,
              nic,
              number,
              image,
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
      <View style={styles.imageConatiner}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Image  style={styles.backImage} source={require('../sources/images/back.png')} />
          </TouchableOpacity>
          
          <Image style={styles.homeImage} source={require('../sources/images/1.png')} />     
      </View>
        <ScrollView nestedScrollEnabled={true}>
            <View style={{marginTop:-5}}>
            <View style={styles.container}>
                
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> 
                    <FlatList
                            data={userDetails}
                            renderItem={({item})=>(
                            <View >
                                <Image style={styles.userProfile} source={item.image} resizeMode={'stretch'} />
                                <Text style={styles.userName}  >{item.firstname} {item.lastname}</Text>

                                <View style={{flexDirection:"row"}}>
                                  <Text style={styles.item}>Email </Text>
                                  <Text style={{ fontSize:18 , marginLeft:48, marginBottom:10, paddingRight:10}}>{item.email}</Text> 
                                </View>

                                <View style={{flexDirection:"row"}}>
                                  <Text style={styles.item}>Contact  </Text>
                                  <Text style={{fontSize:18 , marginLeft:25, marginBottom:10}}>{item.number}</Text>
                                </View>

                                <View style={{flexDirection:"row"}}>
                                  <Text style={styles.item}>NIC </Text>
                                  <Text style={{ fontSize:18 , marginLeft:63, marginBottom:10}}>{item.nic}</Text>
                                </View>

                                <View style={{flexDirection:"row"}}>
                                  <Text style={styles.item}>Address </Text>
                                  <Text style={{ fontSize:18 , marginLeft:30, marginBottom:10}}>{item.address}</Text>
                                </View>
                           </View>                 
                        )}
                      />  
            </ScrollView>
            </View>
            <View>
            
                
            </View>
            <View>
                <TouchableOpacity style={styles.userListingButton}>
                    <Text onPress={()=>{firebase.auth().signOut()}} style={{color:'#fff', fontSize:20}}>Sign Out</Text>
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
        width:150,
        height:150,
        borderRadius:1000,
        marginLeft:100,

       
    },
    userName:{
        color:'#13005A',
        fontWeight:"bold",
        fontSize:25,
        textAlign:"center",
        textTransform:"capitalize",
        marginTop:20,
        marginBottom:50,
        marginLeft:40
        
       

        

    },
    userListingButton:{
        width:280,
        height:40,
        borderRadius:40,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:'#fe0000',
        marginTop:200,
        marginLeft:40,

    },
    imageConatiner:{
      flex: 1,
      alignItems:'center',
      justifyContent:'center',  
      flexDirection:"row",
      marginTop:50,
      marginBottom:20
    
    },
    homeImage:{
      maxHeight:100,
      maxWidth:150,
      marginRight:350
    
    },
    backImage:{
      width:20,
      height:10,
      marginLeft:265,
    },
    item:{
      fontSize:18,
      marginLeft:15,

    },

})
export default UserProfile;