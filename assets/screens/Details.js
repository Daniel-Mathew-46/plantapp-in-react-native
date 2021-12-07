import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, SafeAreaView, Image, Platform } from 'react-native'
import {back_arrow} from '../constants/icons.js'
import COLORS from '../constants/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import plants from '../constants/plants'

const Details = ({navigation : {goBack}, route}) => {

    const plantId = route.params?.plantId;

    const [plant, setPlant] = useState(null);

    const [count, setCount] = useState(1);

    useEffect(() => {
        setPlant(plants.filter(plant => plant.id === plantId)[0]);
    }, [])
    return (
        <SafeAreaView style = { styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => goBack()}>
                    <Image source={require('../icons/icons8_back_24px.png')}
                    style={{
                        width: 30,
                        height: 30,
                        tintColor: COLORS.dark
                    }}/>
                </TouchableOpacity>
                <TouchableOpacity 
                style={{ marginLeft: Platform.OS === 'android' ? 150 : 180}} 
                onPress={() => alert('Shopping Cart Pressed!')}
                >
                    <Image source={require('../icons/icons8_add_shopping_cart_50px.png')} resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30,
                        tintColor: COLORS.dark
                    }}/>
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <Image source={plant?.img}
                style={{
                    height: "100%",
                    width: "100%",
                }}
                resizeMode="contain"/>
            </View>
            <View style={styles.detailsContainer}>
                <View style={{
                    marginLeft: 20,
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }}>
                    <View style={styles.line}/>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Best Choice</Text>
                </View>
                <View style={styles.plantDetails}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', color: COLORS.dark}}>{plant?.name}</Text>
                    <View style={{
                        height: 40,
                        width: 70,
                        backgroundColor: COLORS.green,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 20
                    }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.white}}>$ {plant?.price}</Text>
                    </View>
                </View>
                <View style={styles.description}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.dark}}>About</Text>
                    <Text style={{ fontSize: 15, marginTop: 15}}>{plant?.about}</Text>
                </View>
                <View style={styles.bottomSection}>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.buttonMinus}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold'}}>-</Text>
                        </TouchableOpacity>
                        <Text style={{fontSize: 16, fontWeight: 'bold', color: COLORS.dark, marginHorizontal: 10}}>{count}</Text>
                        <TouchableOpacity style={styles.buttonPlus} >
                            <Text style={{ fontSize: 22, fontWeight: 'bold'}}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{
                        width: 90,
                        paddingVertical: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.green,
                        borderRadius: 25
                    }}
                    onPress={() => alert('Item added to purchases!')}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', color: COLORS.white}}>Buy</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Details

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginTop: Platform.OS === 'android' ? 30 : 0
    },
    header: {
        marginTop: 20,
        paddingHorizontal: 20,
        marginHorizontal: Platform.OS === 'ios' ? 0 : null,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    imageContainer: {
        marginTop: 10,
        flex: 0.45,
        alignItems: 'center',
        justifyContent: 'center'
    },
    detailsContainer: {
        flex: 0.55,
        backgroundColor: COLORS.light,
        borderRadius: 20,
        marginBottom: 10,
        marginTop: 10,
        marginHorizontal: 7,
        paddingTop: 20
    },
    line: {
        width: 25,
        height: 2,
        backgroundColor: COLORS.dark
    },
    plantDetails: {
        marginTop: 20,
        marginLeft: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    description: {
        marginLeft: 20,
        marginTop: 20,
        paddingRight: 20
    },
    bottomSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
        marginHorizontal: 20,
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonMinus: {
        width: 70,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: COLORS.green,
    },
    buttonPlus: {
        width: 70,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: COLORS.green,
    }
  });