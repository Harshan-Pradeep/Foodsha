import React, {useState} from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import {firebase} from '../config';
import { SafeAreaView, View, StyleSheet, Image, ScrollView, Text, TextInput, Pressable, Touchable, TouchableOpacity, RootTagContext, Alert } from "react-native";

const CreateListing=()=>{
    let filename;
    
    const todoref=firebase.firestore().collection('listings');
    const navigation=useNavigation();

    const [image, setImage]=useState(null);
    const [uploading, setUploading]=useState(false);
    const [itemTitle, setItemTitle]=useState('');
    const [itemContact, setItemContact]=useState('');
    const [selected, setSelected] = useState();
    const [itemPrice, setItemPrice]=useState('');
    const [itemAddress, setItemAddress]=useState('');
    const [itemDescription, setItemDescription]=useState('');
    const [values, setValues]=useState({});

    //get current user id
    const user = firebase.auth().currentUser;


    //Dropdwon
    const data = [
        {key:'1', value:'Mobiles', disabled:true},
        {key:'2', value:'Donation'},
        {key:'3', value:'Discount'},
        {key:'5', value:'Request'},
      ]

      // Image pick
      const pickImage= async()=>{

        let result=await ImagePicker.launchImageLibraryAsync({
          mediaTypes:ImagePicker.MediaTypeOptions.All,
          allowsEditing:true,
          aspect:[4,3],
          quality:1,
        });
    
        const source={uri:result.assets[0].uri};
        setImage(source);
    
      };

      // Upload data to databse
      const addField=async()=>{
        //const uploadImage=async()=>{
          setUploading(true);
          const response=await fetch(image.uri)
          const blob = await response.blob();
          filename=image.uri.substring(image.uri.lastIndexOf('/')+1);
          var ref=firebase.storage().ref().child(filename).put(blob);
      
          try {
            await ref;
          }catch(e){
            console.log(e);
          }
          setUploading(false);
          Alert.alert(
            'Photo Uploaded..!!'
          )
          setImage(null);
        //};
        // check if we have new field data
          const timestamp=firebase.firestore.FieldValue.serverTimestamp();
          const data = {
           
            imageFile:image,
            timestam:timestamp,
            Title:itemTitle,
            Contact:itemContact,
            Category:selected,
            Price:itemPrice,
            Address:itemAddress,
            Description:itemDescription,
           // userId:user.email,
    
          };
          todoref
            .add(data)
      
      }


    return(
        <SafeAreaView>
            <ScrollView>
            {/*adding Image*/ }
                <View style={styles.container}>
                    <Text style={styles.sectionTitle}>Upload Photos</Text>
                        <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
                        <Text style={styles.buttonText}>Pick an Image</Text>
                        </TouchableOpacity>
                        <View style={styles.imageContainer}>
                        {image && <Image source={{uri:image.uri}} style={{width:300, height:300}} />}
                        <TouchableOpacity style={styles.uploadButton} >
                            <Text style={styles.buttonStyle}>Upload Image</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                 {/*title*/ }
                <View style={styles.view1}>
                    <TextInput style={styles.inputStyle} placeholder="Title" onChangeText={(itemTitle)=>setItemTitle(itemTitle)} autoCorrect={false} />
                    
                </View>

                 {/*Contact number */ }
                <View style={styles.container}>
                    <TextInput style={styles.contactStyle} placeholder="Contact Number" onChangeText={(itemContact)=>setItemContact(itemContact)}  autoCorrect={false} keyboardType="numeric"/>
                </View>

                {/* Item type */}
                <View style={styles.container}>
                    <SelectList
                        style={styles.selectList}
                        setSelected={(val) => setSelected(val)} 
                        data={data} 
                        save="value"
                    />
                </View>
                

                {/*Price */ }
                <View style={styles.container}>
                    <TextInput style={styles.contactStyle} placeholder="Price" onChangeText={(itemPrice)=>setItemPrice(itemPrice)}  autoCorrect={false} keyboardType="numeric"/>
                </View>

                {/*Full Address*/ }
                <View style={styles.container}>
                    <TextInput style={styles.contactStyle} placeholder="Full Address" onChangeText={(itemAddress)=>setItemAddress(itemAddress)} autoCapitalize="none" autoCorrect={false} />
                </View>
                {/*Description*/ }
                <View style={styles.container}>
                    <TextInput style={styles.textarea} placeholder=" Description" onChangeText={(itemDescription)=>setItemDescription(itemDescription)} autoCapitalize="none" autoCorrect={false} />
                </View>

                
                {/*Submit*/ }
                <View style={styles.container}>
                    <TouchableOpacity onPress={addField} style={styles.registerButton}>
                        <Text style={{color:'#fff', fontSize:20}}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigation.navigate("CommonListins")}}><Text>Discount </Text></TouchableOpacity>
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

    },
    textarea:{
        width:330,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor:'#000000',
        borderRadius:20,
        textAlign:"left",
        minHeight:150,
    },
    selectButton:{
        borderRadius:5,
        width:150,
        height:50,
        backgroundColor:'#428af5',
        alignItems:"center",
        justifyContent:"center",
    },
    uploadButton:{
        borderRadius:5,
        width:150,
        height:50,
        backgroundColor:'#428af5',
        alignItems:"center",
        justifyContent:"center",
    },
    buttonStyle:{
        color:'#000000',
        fontSize:18,
        fontWeight:"bold",
    },
    imageContainer:{
        marginTop:30,
        marginBottom:50,
        alignItems:"center",
    },
    sectionTitle:{
        fontWeight:'500',
        fontSize:14,
        color:'#0317fc',
        marginBottom:16,
    },
  
  
  });

export default CreateListing;