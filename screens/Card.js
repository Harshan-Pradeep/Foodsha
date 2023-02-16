import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Card = ({route}) => {
  const navigation=useNavigation();
  return (
    <View>
      <View style={styles.imageConatiner}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Image  style={styles.backImage} source={require('../sources/images/backArrow.png')} />
          </TouchableOpacity>
          
          <Image style={styles.homeImage} source={require('../sources/images/1.png')} />     
        </View>
        <View>
          <Text style={styles.categoryText}>{route.params.paramCategory}</Text>
        </View>
      
      <View style={styles.cardBodyImage}>
        <Image source={route.params.paramImg}   style={styles.cardImageStyle}/>
      </View>
      <View style={styles.cardBodyContent}>

        <View style={{flexDirection:'row'}}>
          <Text style={styles.item}>Food Name</Text>
          <Text style={{ fontSize:18 , marginLeft:28, marginBottom:10, marginRight:90 }}>{route.params.paramTitle}</Text>
        </View>

        <View style={{flexDirection:'row'}}>
          <Text style={styles.item}>Category</Text>
          <Text style={{ fontSize:18 , marginLeft:50, marginBottom:10, marginRight:90}}>{route.params.paramCategory}</Text>
        </View>

        <View style={{flexDirection:'row'}}>
          <Text style={styles.item}>Price</Text>
          <Text style={{ fontSize:18 , marginLeft:79, marginBottom:10, marginRight:90}}>{route.params.paramPrice}</Text>
        </View>
         
        <View style={{flexDirection:'row'}}>
          <Text style={styles.item}>Description</Text>
          <Text style={{ fontSize:18 , marginLeft:30, marginBottom:10, marginRight:90}}>{route.params.paramDetail}</Text>
        </View>

        <View style={{flexDirection:'row'}}>
          <Text style={styles.item}>Contact</Text>
          <Text style={{ fontSize:18 , marginLeft:56, marginBottom:10, marginRight:90}}>{route.params.paramContact}</Text>
        </View>

        <View style={{flexDirection:'row'}}>
          <Text style={styles.item}>Address</Text>
          <Text style={{ fontSize:18 , marginLeft:56, marginBottom:10, marginRight:90}}>{route.params.paramAddress}</Text>
        </View>

      </View>

  </View>
  )
}

export default Card

const styles = StyleSheet.create({
  cardBodyImage:{
    marginTop:50,
    justifyContent:'center',
    alignItems:'center',
    margin:10,
    marginLeft:10,
    elevation:5,
    borderRadius:25,
    
    
    
    
    
  },
  cardImageStyle:
   {
    margin:10,
    width:340,
    height:231,
    borderRadius:25,
    marginTop:-40,


  },
  contactButton:{
    width:300,
    height:60,
    borderRadius:40,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:'#019267',


    
    
},
cardBodyContent:{
  marginTop:20,
  justifyContent:'center',
  margin:10,
  padding:5,
  borderRadius:10,
  
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
  marginRight:350,
  marginLeft:-110

},
backImage:{
  width:40,
  height:30,
  marginLeft:205,

},
categoryText:{
  fontWeight:'600',
  marginTop:10,
  fontSize:25,
  marginLeft:12,


},
itemText:{
  fontSize:18,


},
item:{
  fontSize:18,
  marginLeft:3,

},


})
