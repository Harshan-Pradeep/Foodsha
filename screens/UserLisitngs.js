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
            <View style={styles.componentContainer}>
                <View style={{flex:1, marginTop:100}}>
                  <ScrollView horizontal={true}>
                    <View>
                      <FlatList
                            data={foodItems}
                            numColumns={1 }
                            renderItem={({item})=>(
                            <View >
                                <Pressable >
                                    <CardComponents title={ item.Title} price={item.Price} category={item.Category} image={item.imageFile} />
                                    <TouchableOpacity><Text onPress={()=>deleteFoodItem(item)} >Delete</Text></TouchableOpacity>
                                </Pressable>
                                
                            </View>                 
                        )}
                        />
                    </View>
                    

                  </ScrollView>
                </View>  
            </View>
        </ScrollView>
        
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