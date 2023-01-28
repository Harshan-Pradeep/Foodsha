import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, View, StyleSheet, Image, ScrollView, Text, TextInput, Pressable, Touchable, TouchableOpacity, RootTagContext } from "react-native";

const Register=()=>{
    const navigation=useNavigation();
    return(
        <SafeAreaView>
            <ScrollView>
            {/*adding logo*/ }
                <View style={styles.container}>
                    <Image style={styles.default} source={require('../sources/images/logo.jpg')} resizeMode={'stretch'} />
                </View>

                 {/*First name and last name*/ }
                <View style={styles.view1}>
                    <TextInput style={styles.inputStyle} placeholder="First Name" />
                    <TextInput style={styles.inputStyle} placeholder="Last Name" />    
                </View>

                 {/*Contact number and email*/ }
                <View style={styles.container}>
                    <TextInput style={styles.contactStyle} placeholder="Contact Number" keyboardType="numeric"/>
                    <TextInput style={styles.contactStyle} placeholder="Email Address" />
                </View>

                 {/*location*/ }
                <View style={styles.view1}>
                    <TextInput style={styles.locationStyle} placeholder="Province" />
                    <TextInput style={styles.locationStyle} placeholder="City" />   
                    <TextInput style={styles.locationStyle} placeholder="District" />
                </View>

                {/*Full Address*/ }
                <View style={styles.container}>
                    <TextInput style={styles.contactStyle} placeholder="Full Address" />
                </View>

                {/*Password*/ }
                <View style={styles.container}>
                    <TextInput style={styles.contactStyle} placeholder="Password" secureTextEntry={true} />
                </View>

                {/*Submit*/ }
                <View style={styles.container}>
                    <TouchableOpacity style={styles.registerButton}>
                        <Text style={{color:'#fff', fontSize:20}}>Submit</Text>
                    </TouchableOpacity>
                </View>

                {/*Login*/ }
                <View style={styles.container}>
                    <TouchableOpacity>
                        <Text style={{color:'#000', fontSize:20, padding:20}} onPress={()=>{navigation.navigate("Login")}}>Have you account?</Text>
                    </TouchableOpacity>
                </View>


            </ScrollView>
        </SafeAreaView>
            

    );
    
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems:'center',
      justifyContent:'center',  
    },
    default:{
        alignItems:'center',
        justifyContent:'center',
        width:150,
        height:150,
        borderRadius:1000,
        marginTop:10,
    },
    inputStyle:{
        flex:2,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor:'#000000',
        borderRadius:20,
        textAlign:"center",
    },
    registerButton:{
        width:300,
        height:50,
        borderRadius:40,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:'#19f00a',
        
    },
    view1:{
        flex:1,
        flexDirection:"row",
    },
    contactStyle:{
        width:330,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor:'#000000',
        borderRadius:20,
        textAlign:"center",
    },
    locationStyle:{
        flex:3,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor:'#000000',
        borderRadius:20,
        textAlign:"center",

    }
    
  });

export default Register;