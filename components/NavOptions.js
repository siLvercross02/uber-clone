import React from 'react'
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import { selectOrigin } from '../slices/navSlice'
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';

const data = [
    {
        id: '123',
        title: 'Got a ride',
        image: 'https://links.papareact.com/3pn',
        screen: 'MapScreen',
    },
    {
        id: '456',
        title: 'Order Food',
        image: 'https://links.papareact.com/28w',
        screen: 'MapScreen',
    }
]

const NavOptions = () => {
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);

    return (
        <FlatList 
            data={data}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity 
                    style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`} 
                    onPress={() => navigation.navigate(item.screen)}
                    disabled={!origin}
                >
                    <View style={tw`${!origin && 'opacity-20'}`}>
                        <Image 
                            style={{width: 120, height: 120, resizeMode: 'contain'}}
                            source={{uri: item.image}}
                        />
                        <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                        <Icon 
                            style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                            type="antdesign"
                            name="arrowright"
                            color="white"
                        />
                    </View>
                </TouchableOpacity>
            )}
        />
    )
}

export default NavOptions

const styles = StyleSheet.create({})
