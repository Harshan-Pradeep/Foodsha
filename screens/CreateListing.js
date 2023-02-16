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
            userId:user.email,
    
          };
          todoref
            .add(data)
      
      }


    return(
        <SafeAreaView >
            <View style={styles.imageConatiner}>
            <TouchableOpacity onPress={()=>{navigation.goBack()}}>
              <Image style={styles.backImage} source={require('../sources/images/backArrow.png')} />
              
            </TouchableOpacity>
            <Image style={styles.homeImage} source={require('../sources/images/1.png')} />
            
             
             
            </View>
            <ScrollView  >
            {/*adding Image*/ }
                <View style={styles.imageContainerMain}>
                        <TouchableOpacity onPress={pickImage}><Image style={styles.addImage} source={require('../sources/images/addImage.png')} /></TouchableOpacity>
                        <View style={styles.imageContainer}>
                          {image && <Image source={{uri:image.uri}} style={{width:150, height:150, borderRadius:25}} />}
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
                <View style={styles.SelectContainer}>
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
                    <TouchableOpacity onPress={addField} style={styles.submitButton}>
                        <Text style={{color:'#FFF', fontSize:20}}>Submit</Text>
                    </TouchableOpacity>
                </View>

                


            </ScrollView>
        </SafeAreaView>
            

    );
    
}
const styles = StyleSheet.create({
    imageContainerMain: {
      flex: 1,
      alignItems:'center',
      justifyContent:'center',  
      marginTop:50,
      
    },
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',  
        marginTop:10,
        
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
        margin: 10,
        //borderWidth: 1,
        padding: 5,
        //borderColor:'#fe0000',
        borderRadius:20,
        textAlign:"center",
        width:330,
        alignItems:"center",
        justifyContent:"center",
        elevation:5,
        backgroundColor:'#FFF'
    },
    submitButton:{
        width:300,
        height:50,
        borderRadius:40,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:'#fe0000',
        elevation:5,
        marginBottom:120,
        
      
        
    },

    contactStyle:{
        width:330,
        marginBottom: 12,
        //borderWidth: 1,
        padding: 5,
        //borderColor:'#fe0000',
        borderRadius:20,
        textAlign:"center",
        elevation:5,
        backgroundColor:'#FFF'
    },
    textarea:{
        width:330,
        marginBottom: 12,
        //borderWidth: 1,
        padding: 10,
        //borderColor:'#fe0000',
        borderRadius:20,
        textAlign:"left",
        minHeight:150,
        elevation:5,
        backgroundColor:'#FFF',
    },

    buttonStyle:{
        color:'#000000',
        fontSize:18,
        fontWeight:"bold",
       
        
    },
    imageContainer:{
        marginBottom:10,
        alignItems:"center",
    },
    sectionTitle:{
        fontWeight:'500',
        fontSize:14,
        color:'#0317fc',
        marginBottom:16,
    },
    addImage:{
        width:80,
        height:80,
        marginTop:-55
    },
    SelectContainer:{
        width:330,
        justifyContent:"center",
        flex: 1,
        marginLeft:15,
        justifyContent:'center',  
        marginTop:10,
        marginBottom:10,
        borderColor:'00E7FF'


    },
    imageConatiner:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center',  
        flexDirection:"row",
        marginTop:80,
        marginBottom:5,
        marginLeft:-250,
        paddingBottom:20,
    
      },
      homeImage:{
        maxHeight:100,
        maxWidth:150,
        marginRight:450,
        marginTop:-30,
      
        
      },
      backImage:{
        width:35,
        height:30,
        marginLeft:560,
        marginTop:-30,
      },
  
  
  });

export default CreateListing;