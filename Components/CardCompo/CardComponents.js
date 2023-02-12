import React, { useState } from 'react';
import { View, Pressable, Image, Text, Input, TextInput  } from 'react-native';
import { StyleSheet, Dimensions } from "react-native";
const {width}=Dimensions.get('window');


const  CardComponents =({title, price, category, image})=>{

    return(
        <View style={styles.container}>
            <Image style={styles.image} source={image} /> 
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.category}>{category}</Text>
            <Text style={styles.price}>{price}</Text>
            
        </View>
    
        
    )

}
export default CardComponents;

const styles=StyleSheet.create({
    container:{
        margin:8,

    },
    title:{
        color:'#adaca8',
        paddingVertical:8,
    },
    image:{
        borderRadius:10,
        width:(width-64) /2,
        height:190,


    },
    price:{
        color:'#000',
        paddingBottom:8,
    },
    category:{
        color:'#000',
        paddingBottom:8,
    },

})