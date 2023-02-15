import React, {useState, useEffect} from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import {firebase} from '../config';
import CardComponents from "../Components/CardCompo/CardComponents";
import DonationListing from "./DonationListings";
import { SafeAreaView, View, StyleSheet, Image, ScrollView, Text, TextInput, Pressable, Touchable, TouchableOpacity, RootTagContext, Alert, FlatList } from "react-native";
import Card from "./Card";


const CommonListing=()=>{
    const navigation=useNavigation();
    
    // get data from database
    const [foodItems, setFoodItems]=useState([]);
  const todoRef = firebase.firestore().collection('listings');

  useEffect(()=>{
    const loadingdata=async()=>{
      todoRef
      .onSnapshot(
        querySnapshot=>{
          const foodItems=[]
          querySnapshot.forEach((doc)=>{
            const {imageFile, Category, Price, Title, Description} = doc.data()
            foodItems.push({
              id:doc.id,
              imageFile,
              Category, 
              Price,
              Title,
              Description,
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
                                  <Pressable onPress={()=>{navigation.navigate('Card',{paramTitle:item.Title, paramPrice:item.Price, paramImg:item.imageFile, paramCategory:item.Category, paramDetail:item.Description})}}>
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
              <TouchableOpacity onPress={()=>{navigation.navigate('CommonListing')}}  ><Image style={styles.bottomImage} source={require('../sources/images/home.png')}/></TouchableOpacity>
              <TouchableOpacity onPress={()=>{navigation.navigate("CreateListing")}}><Image style={styles.bottomImagePlus} source={require('../sources/images/listing.png')}/></TouchableOpacity>
              <TouchableOpacity onPress={()=>{navigation.navigate('UserProfile')}}><Image style={styles.bottomImage} source={require('../sources/images/profile.png')}/></TouchableOpacity>
              
            </View>


        </SafeAreaView>
    )

}
export default CommonListing;

const styles=StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',  
        flexDirection:"row",
        marginTop:50,
        marginLeft:6,
        marginBottom:25,
        
      },
      homeButton:{
        backgroundColor:'#00909E',
        borderRadius:5,
        width:103,
        height:35,
        margin:5,
        justifyContent:"center",
        marginTop:40,


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
        height:60,
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        marginTop:10,
        

     
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
})