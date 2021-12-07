import React, { useState } from 'react'
import { StyleSheet, 
    SafeAreaView, 
    Platform, 
    View, 
    Text, 
    TouchableOpacity, 
    Image, 
    TextInput, 
    FlatList, 
    Dimensions, } from 'react-native'
import COLORS from '../constants/colors'
import plants from '../constants/plants'

const width = Dimensions.get("screen").width/2 - 30;

const HomeScreen = ({navigation : {navigate}}) => {

    const categoryList = ["POPULAR", "ORGANIC", "INDOOR", "SYNTHETIC"];
    const [categoryIndex, setCategoryIndex] = useState(0);

    // HeaderBar
    const renderHeader = () => {
        return (
            <View style={styles.header}>
                <View>
                    <Text style={styles.welcometoText}>Welcome to</Text>
                    <Text style={styles.PlantAppText}>Plant App</Text>
                </View>
                <TouchableOpacity style={{ marginLeft: Platform.OS === 'android' ? 150 : 180}} onPress={() => alert('Shopping Cart Pressed!')}>
                    <Image source={require('../icons/icons8_add_shopping_cart_50px.png')} resizeMode="contain"
                    style={{
                        width: 40,
                        height: 40,
                        tintColor: COLORS.dark
                    }}/>
                </TouchableOpacity>
            </View>
        )
    }

    // SearchBar
    const renderSearchBar = () => {
        return (
            <View style={styles.searchContainerWrapper}>
                <View style={styles.searchContainer}>
                    <Image source={require('../icons/icons8_search_50px.png')}
                    resizeMode="contain"
                    style={{
                        width: 20,
                        height: 20,
                    }}/>
                    <TextInput placeholder="Search" style={{ padding: 10, flex: 1, fontWeight: 'bold', fontSize: 15}}/>
                </View>
                <View style={styles.sortBtn}>
                    <Image source={require('../icons/icons8_sorting_50px.png')}
                    resizeMode="contain"
                    style={{
                        width: 40,
                        height: 40,
                        tintColor: COLORS.white
                    }}/>
                </View>
            </View>
        )
    }

    //CategoryList
    const renderCategoryList = () => {
        return (
            <View style={styles.categoryContainer}>
                {categoryList.map((category, index) => (
                    <Text key={index} style={[ styles.categoryText, categoryIndex === index && styles.selectedCategoryText]} 
                    onPress={() => setCategoryIndex(index)}
                    >{category}</Text>
                ))}
            </View>
        )
    }

    //Card
    const Card = ({plant}) => {
        return (
            <TouchableOpacity onPress={() => navigate('Details', {plantId: plant.id})}>
                <View style={styles.cardStyle}>
                    <View style={{alignItems: 'flex-end'}}>
                        <View style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: plant.like ? 'rgba(245, 42, 42, 0.2)' : 'rgba(0, 0, 0, 0.2)'
                        }}>
                            <Image source={require('../icons/icons8_Favorite_48px.png')}
                            resizeMode="contain"
                            style={{
                                width: 18,
                                height: 18,
                                tintColor: plant.like ? COLORS.red : COLORS.dark
                            }}/>
                        </View>
                    </View>
                    <View style={styles.plantImage}>
                        <Image source={plant.img}
                        resizeMode="contain"
                        style={{
                            flex: 1
                        }}/>
                    </View>
                    <View style={{ flex: 1, marginTop: 20 }}>
                        <Text style={styles.plantName}>{plant.name}</Text>
                        <View style={styles.priceAddContainer}>
                            <Text style={{fontSize: 16, 
                                fontWeight: 'bold',
                                color: COLORS.dark}}>`${plant.price}`</Text>
                                <View style={styles.addSign}>
                                    <Text style={{ fontWeight: 'bold', color: COLORS.white, fontSize: 17}}>+</Text>
                                </View>
                        </View>                 
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    //PlantList
    const renderPlantsList = () => {
        return(
            <FlatList numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{ justifyContent: 'space-between'}}
            contentContainerStyle={Platform.OS === "ios" ? {marginHorizontal: 20} : {marginHorizontal: 0}}
            data={plants} 
            renderItem={({item}) => <Card plant={item}/>}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderSearchBar()}
            {renderCategoryList()}
            {renderPlantsList()}
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
      paddingHorizontal: 30,
      marginTop: Platform.OS === 'android' ? 30 : 0
    },
    header: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: 'center'
    },
    welcometoText: {
        fontSize: 20,
        marginLeft: Platform.OS === 'ios' ? 20 : null,
        fontWeight: "bold",
        color: COLORS.dark
    },
    PlantAppText: {
        fontSize: 34,
        fontWeight: "bold",
        color: COLORS.green,
        marginLeft: Platform.OS === 'ios' ? 20 : null
    },
    searchContainerWrapper: {
        marginTop: 30,
        marginHorizontal: Platform.OS === 'ios' ? 20 : null,
        flexDirection: 'row'
    },
    searchContainer: {
        flex: 1,
        backgroundColor: COLORS.light,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        borderRadius: 10
    },
    sortBtn: {
        marginLeft: 5,
        height: 50,
        width: 50,
        backgroundColor: COLORS.green,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    categoryContainer: {
        marginTop: 30,
        marginBottom: 20,
        marginHorizontal: Platform.OS === 'ios' ? 20 : null,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    categoryText: {
        fontWeight: 'bold',
        color: COLORS.dark
    },
    selectedCategoryText: {
        color: COLORS.green,
        borderBottomWidth: 2,
        borderColor: COLORS.green
    },
    cardStyle: {
        height: 225,
        backgroundColor: COLORS.light,
        width,
        marginHorizontal: 2,
        borderRadius: 20,
        marginBottom: 20,
        padding: 15,
    },
    plantImage: {
        alignItems: 'center',
        height: 100
    },
    plantName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.dark
    },
    priceAddContainer: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    addSign: {
        height: 25,
        width: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.green,
        borderRadius: 5
    }
  });