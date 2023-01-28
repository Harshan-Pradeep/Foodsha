import React from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";

const Card=()=>{
    return(
        <View>
            <ScrollView style={{marginTop:50}} horizontal={true}>

                <View style={styles.cardContainer}>
                    <Image source={require('../sources/images/logo.jpg')}  style={styles.cardImageStyle} resizeMode={"stretch"}/>
                    <View style={styles.cardViewStyle}>
                        <Text style={styles.cardTextStyle}>Item name </Text>
                        <Text style={styles.cardTextStyle}>Price</Text>
                    </View>    
                </View>
                <View style={styles.cardContainer}>
                    <Image source={require('../sources/images/logo.jpg')}  style={styles.cardImageStyle} resizeMode={"stretch"}/>
                    <View style={styles.cardViewStyle}>
                        <Text style={styles.cardTextStyle}>Item name </Text>
                        <Text style={styles.cardTextStyle}>Price</Text>
                    </View>    
                </View>
                <View style={styles.cardContainer}>
                    <Image source={require('../sources/images/logo.jpg')}  style={styles.cardImageStyle} resizeMode={"stretch"}/>
                    <View style={styles.cardViewStyle}>
                        <Text style={styles.cardTextStyle}>Item name </Text>
                        <Text style={styles.cardTextStyle}>Price</Text>
                    </View>    
                </View>

                
            </ScrollView>
            
        </View>
        


    );
    

}

const styles=StyleSheet.create({
    cardContainer:{
        flex:1,
        flexDirection:"column",
        width:150,
        height:150,
        backgroundColor:'#000',
        marginLeft:10,
        borderRadius:20
        

    },
    cardImageStyle:{
        width:150,
        height:100,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,


    },
    cardTextStyle:{
        color:'#fff'
        

    },
    cardViewStyle:{
        flex:1,
        flexDirection:"row",
        marginLeft:10
    },
    scrollViewStyle:{}
})
export default Card;