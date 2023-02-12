import React, {useState, useEffect} from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import {firebase} from '../config';
import CardComponents from "../Components/CardCompo/CardComponents";
import DonationListing from "./DonationListings";
import { SafeAreaView, View, StyleSheet, Image, ScrollView, Text, TextInput, Pressable, Touchable, TouchableOpacity, RootTagContext, Alert, FlatList } from "react-native";

const DonationListings=()=>{
    const navigation=useNavigation();
    // get data from database
    const [foodItems, setFoodItems]=useState([]);
  const todoRef = firebase.firestore().collection('listings');

  useEffect(()=>{
    const loadingdata=async()=>{
      todoRef
      .where('Category','==','Discount')
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
            <ScrollView>
                <View style={styles.container}>
                    <TouchableOpacity><Text>Home </Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigation.navigate('DonationListings')}}><Text>Donation </Text></TouchableOpacity>
                    <TouchableOpacity><Text>Request </Text></TouchableOpacity>
                    <TouchableOpacity><Text>Discount </Text></TouchableOpacity>
                </View>

                <View style={styles.container}>
                    <View style={{flex:1, marginTop:100}}>
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

                    </View>
                </View>
            </ScrollView>
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
        marginTop:100,
        
    
      },
})