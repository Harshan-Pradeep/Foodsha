import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Card = ({route}) => {
  return (
    <View>
      <View>
      <Image source={route.params.paramImg}   style={styles.cardImageStyle}/>

      <Text>{route.params.paramTitle}</Text>
      <Text>{route.params.paramPrice}</Text>
      <Text>{route.params.paramCategory}</Text>
      <Text>{route.params.paramDetail}</Text>
    </View>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({cardImageStyle: {width:'100%', height:180,},})
