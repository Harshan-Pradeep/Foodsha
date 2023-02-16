import React, {useState, useEffect} from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import {firebase} from '../config';
import CardComponents from "../Components/CardCompo/CardComponents";
import { SafeAreaView, View, StyleSheet, Image, ScrollView, Text, TextInput, Pressable, Touchable, TouchableOpacity, RootTagContext, Alert, FlatList } from "react-native";

const UserListings=()=>{
    const navigation=useNavigation();
    // get data from database
    
    const [foodItems, setFoodItems]=useState([]);
  const todoRef = firebase.firestore().collection('listings');

  //get current user id
  const user = firebase.auth().currentUser;

  useEffect(()=>{
    const loadingdata=async()=>{
      todoRef
      .where('userId','==',`${user.email}`)
      .get()
      .then(
        querySnapshot=>{
          const foodItems=[]
          querySnapshot.forEach((doc)=>{
            const {imageFile, Category, Price, Title} = doc.data()
            foodItems.push({
              id:doc.id,
              imageFile,
              Category, 
              Price,
              Title,
            })
          })
          setFoodItems(foodItems);
        }  

      )
        
      

    }
    loadingdata();
    
  },[])
  const deleteFoodItem = (foodItems)=>{
    todoRef
      .doc(foodItems.id)
      .delete()
      .then(()=>{
        alert("Deleted Successfully")
      })
      .catch(error=>{
        alert(error)
      })
  }

  

    return(
      <SafeAreaView>
        

        <ScrollView nestedScrollEnabled={true} style={{flex: 1, paddingBottom: 620}}>
          <View style={styles.imageConatiner}>
          <TouchableOpacity onPress={()=>{navigation.goBack()}}>
            <Image style={styles.backImage} source={require('../sources/images/backArrow.png')} />
          </TouchableOpacity>
            <Image style={styles.homeImage} source={require('../sources/images/1.png')} />
            <TouchableOpacity onPress={()=>{navigation.navigate('UserProfile')}}><Image style={styles.profileIcon} source={require('../sources/images/profile.png')}/></TouchableOpacity>
          </View>
            <View style={styles.componentContainer}>
                <View style={{flex:1, marginTop:100}}>
                  <ScrollView horizontal={true}>
                    <View>
                      <FlatList
                            data={foodItems}
                            numColumns={2}
                            renderItem={({item})=>(
                            <View >
                                <Pressable >
                                    <CardComponents title={ item.Title} price={item.Price} category={item.Category} image={item.imageFile} />
                                    <TouchableOpacity><Text onPress={()=>deleteFoodItem(item)} style={styles.deleteButton}>Delete</Text></TouchableOpacity>
                                </Pressable>
                                
                            </View>                 
                        )}
                        />
                    </View>
                    

                  </ScrollView>
                </View>  
            </View>
        </ScrollView>
        <View style={styles.bottomNavigation}>
          <TouchableOpacity onPress={()=>{navigation.navigate('CommonListing')}}  ><Image style={styles.bottomImage} source={require('../sources/images/home.png')}/></TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate("CreateListing")}}><Image style={styles.bottomImagePlus} source={require('../sources/images/CreateListing.png')}/></TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate('UserListings')}}><Image style={styles.bottomImage} source={require('../sources/images/listing.png')}/></TouchableOpacity>   
        </View>
        
    </SafeAreaView>
    )

}
export default UserListings;

const styles=StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',  
    flexDirection:"row",
    marginTop:50,
    marginLeft:6,
    marginBottom:18,
    
  },
  homeButton:{
    backgroundColor:'#00909E',
    borderRadius:5,
    width:70,
    height:25,
    margin:10,
    justifyContent:"center",


  },
  buttonText:{
    color:'#FFF',
    textAlign:"center",


  },
  componentContainer:{
    alignItems:'center',
    justifyContent:'center',  
    marginTop:-350,
    marginLeft:6,

  },

  bottomImage:{
    margin:45,
    maxHeight:30,
    maxWidth:30,
  },
  imageConatiner:{
    flex: 1,
    alignItems:'center',
    justifyContent:'center',  
    flexDirection:"row",
    marginTop:-220,
    marginBottom:5,

  },
  homeImage:{
    maxHeight:100,
    maxWidth:150,
    marginLeft:10,
    marginTop:-20,
    marginRight:10
  },
  profileIcon:{
    margin:50,
    maxHeight:25,
    maxWidth:25,
    marginLeft:80,
    marginTop:20

  },
  deleteButton:{
    backgroundColor:'#fe0000',
    width:80,
    height:25,
    textAlign:"center",
    color:'#FFF',
    borderRadius:25,
    marginLeft:48,
    

  },
  bottomNavigation:{
    backgroundColor:'#fe0000',
    height:60,
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row",
    marginTop:60,
    

 
  },
  bottomImage:{
    margin:45,
    maxHeight:30,
    maxWidth:30,
  },
  bottomImagePlus:{
    margin:45,
    maxHeight:40,
    maxWidth:40,
  },
  backImage:{
    width:35,
    height:30,
    marginLeft:40,
    marginTop:-20,
  },
})