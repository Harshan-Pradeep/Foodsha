import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Card = ({route}) => {
  return (
    <View>
      <View style={styles.cardBody}>
        <Image source={route.params.paramImg}   style={styles.cardImageStyle}/>

        <Text>{route.params.paramTitle}</Text>
        <Text>{route.params.paramPrice}</Text>
        <Text>{route.params.paramCategory}</Text>
        <Text>{route.params.paramDetail}</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity  style={styles.contactButton}>
            <Text style={{color:'#fff', fontSize:20}}>Contact</Text>
        </TouchableOpacity>
      </View>
  </View>
  )
}

export default Card

const styles = StyleSheet.create({
  cardBody:{
    marginTop:50,
    justifyContent:'center',
    alignItems:'center',
    margin:10,
    backgroundColor:'#E5D1FA',
    padding:5,
    borderRadius:10,
    
  },
  cardImageStyle:
   {
    margin:10,
    width:330, 
    height:280,
    borderRadius:10,

  },
  contactButton:{
    width:300,
    height:60,
    borderRadius:40,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:'#019267',


    
    
},


})
