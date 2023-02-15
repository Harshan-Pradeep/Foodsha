import React, {useState, useEffect} from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import {firebase} from '../config';
import CardComponents from "../Components/CardCompo/CardComponents";
import { SafeAreaView, View, StyleSheet, Image, ScrollView, Text, TextInput, Pressable, Touchable, TouchableOpacity, RootTagContext, Alert, FlatList } from "react-native";

const DonationListings=()=>{
    const navigation=useNavigation();
    // get data from database
    const [foodItems, setFoodItems]=useState([]);
  const todoRef = firebase.firestore().collection('listings');

  useEffect(()=>{
    const loadingdata=async()=>{
      todoRef
      .where('Category','==','Donation')
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

    return(
      <SafeAreaView>
        <View style={styles.container} >
          <TouchableOpacity style={styles.homeButton} onPress={()=>{navigation.navigate('DonationListings')}}><Text style={styles.buttonText}  >Donation </Text></TouchableOpacity>
          <TouchableOpacity style={styles.homeButton} onPress={()=>{navigation.navigate('RequestListings')}}><Text style={styles.buttonText}  >Request </Text></TouchableOpacity>
          <TouchableOpacity style={styles.homeButton} onPress={()=>{navigation.navigate('DiscountListings')}}><Text style={styles.buttonText}  >Discount </Text></TouchableOpacity>
        </View>

        <ScrollView nestedScrollEnabled={true} style={{flex: 1, paddingBottom: 620}}>
            <View style={styles.componentContainer}>
                <View style={{flex:1, marginTop:100}}>
                  <ScrollView horizontal={true}>
                    <FlatList
                          data={foodItems}
                          numColumns={2}
                          renderItem={({item})=>(
                          <View >
                              <Pressable onPress={()=>{navigation.navigate('Login')}}>
                                  <CardComponents title={ item.Title} price={item.Price} category={item.Category} image={item.imageFile} />
                              </Pressable>
                              
                          </View>                 
                      )}
                      />

                  </ScrollView>
                </View>  
            </View>
        </ScrollView>
        <View style={styles.bottomNavigation}>
          <TouchableOpacity onPress={()=>{navigation.navigate('CommonListing')}}><Image style={styles.bottomImage} source={require('../sources/images/home.png')}/></TouchableOpacity>
          <TouchableOpacity><Image style={styles.bottomImage} source={require('../sources/images/profile.png')}/></TouchableOpacity>
          <TouchableOpacity><Image style={styles.bottomImage} source={require('../sources/images/listing.png')}/></TouchableOpacity>
        </View>
    </SafeAreaView>
    )

}
export default DonationListings;

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
    marginTop:-80,
    marginLeft:6,

  },
  bottomNavigation:{
    backgroundColor:'#00909E',
    height:80,
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row",
    

 
  },
  bottomImage:{
    margin:45,
    maxHeight:30,
    maxWidth:30,
  },
})