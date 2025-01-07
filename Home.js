import React, {useState, useEffect } from "react"; // (Chatgpt ; useEffect)
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect (chatgpt)
import { StyleSheet, Text, View, SectionList, TouchableOpacity, Image,Button,StatusBar } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import {numbers} from './Data';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = ({navigation}) => {

    const [mydata, setMyData] = useState([]);

    const getData = async() => {
        let datastr = await AsyncStorage.getItem('alphadata');
        if(datastr){ // datastr!= null
            let jsondata = JSON.parse(datastr);
            setMyData(jsondata);
        }
        else{
            setMyData(numbers);
        }
    };

    // Fetch data when the screen gains focus
    useFocusEffect(
        React.useCallback(() => {
            getData(); // Fetch data every time Home gains focus
        }, [])
    );


    const renderItem = ({ item,index,section }) => {
        return (
            <TouchableOpacity
                style={styles.opacityStyle}
                onPress={() =>
                {
                    let datastr = JSON.stringify(mydata);
                    navigation.navigate('Edit',
                        {
                            datastring: datastr,
                            index: index,
                            type:section.title,
                            key:item.key,
                            name:item.name
                        });
                }
            }
            >
                {/* Name on the left */}
                <Text style={styles.textStyle}>{item.name}</Text>

                {/* Image on the right */}
                <Image
                    source={{ uri: "https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_" + item.key + "-2x.png" }}
                    style={styles.imageStyle}
                />
            </TouchableOpacity>
        );
    };

    const renderSectionHeader = ({ section: { title, bgColor,ico,colo,outline } }) => (

        <View style={{ backgroundColor: bgColor, padding:10 }}>

            <Text style={[styles.headerText, styles[outline], {color: colo }]}>

                <Icon name={ico} size={20} color={colo}  />

                {title}</Text>

        </View>
    );

    return (
        <View style={{ marginBottom: 20, marginTop: 50 }}>
            <Text style={styles.title}>Scarlet & Violet - 151 Expansion Pack</Text>

            <Button title="Add Pokemon button"
                    onPress={() => {navigation.navigate('Add', { datastring: JSON.stringify(numbers)})}}
                />


            <SectionList
                sections={mydata}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};


const styles = StyleSheet.create({
        headerText: {
            fontSize: 20,
            margin: 10,
            textAlign: "center",
            fontWeight: "bold",
        },
        opacityStyle: {
            flexDirection: 'row',  // Align name and image horizontally
            borderWidth: 1,
            padding: 10,
            marginVertical: 5,
            alignItems: 'center',  // Center the items vertically
        },
        textStyle: {
            fontSize: 15,
            marginRight: 10,  // Add space between name and image
            textAlign: "left",
            flex: 1,  // Ensure the text occupies available space
        },
        imageStyle: {
            width: 200,  // Adjust image size
            height: 300, // Adjust image size
            borderRadius: 5,
        },
        textOutline: {
            color: 'black', // Outline color
            fontWeight: 'bold',
            textShadowColor: 'black',
            textShadowOffset: {width: -1, height: 1}, // Shadow directions
            textShadowRadius: 1, // Spread of the shadow
        },

        title:{
            fontSize: 20,
            textAlign: "center",
            fontWeight: "bold",
            color: "#f3f3f4",
            padding:20,
            backgroundColor:"red"

        },
        textOutline2: {
            color: 'black', // Outline color
            fontWeight: 'bold',
            textShadowColor: 'black',
            textShadowOffset: {width: -1, height: 1}, // Shadow directions
            textShadowRadius: 1, // Spread of the shadow
        },
    }
);

export default Home;

