import React, { useState } from 'react'
import 'intl';
import 'intl/locale-data/jsonp/en';
import { useSelector } from 'react-redux'
import { FlatList, ScrollView, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import tw from 'tailwind-react-native-classnames'
import { selectTravelTimeInformation } from '../slices/navSlice'
import {IntlProvider, FormattedNumber} from 'react-intl'

const data = [
    {
        id: "Uber-X-123",
        title: 'UberX',
        multiplier: 1,
        image: "https://links.papareact.com/3pn",
    },
    {
        id: "Uber-X-456",
        title: 'Uber XL',
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8",
    },
    {
        id: "Uber-LUX-789",
        title: 'Uber LUX',
        multiplier: 1.75,
        image: "https://links.papareact.com/7pf",
    },
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptionCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformmation = useSelector(selectTravelTimeInformation)
    console.log(travelTimeInformmation)

    return (

        <ScrollView stlye={tw`bg-white flex-grow`}>
            <View >
                <TouchableOpacity onPress={() => navigation.navigate('NavigateCard')} style={tw`absolute top-3 left-5 p-3 rounded-full`}>
                    <Icon 
                        name="chevron-left" type="fontawesome"
                    />
                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl`}>Select a Ride - {travelTimeInformmation?.distance.text}</Text>
            </View>

            <FlatList 
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item: { id, title, multiplier, image }, item }) => (
                    <TouchableOpacity style={tw`flex-row items-center justify-between px-10 ${id === selected?.id && "bg-gray-200"}`} onPress={() => setSelected(item)}>
                        <Image 
                            style={{
                                width: 80,
                                height: 80,
                                resizeMode: 'contain'
                            }}
                            source={{ uri: image }}
                        />
                        <View style={tw`-ml-6`}>
                            <Text style={tw`text-xl font-semibold`}>{title}</Text>
                            <Text>{travelTimeInformmation?.duration.text} Travel Time</Text>
                        </View>
                            <IntlProvider locale="en" defaultLocale="en">
                                <Text style={tw`text-xl`}>
                                    {/* {
                                        new Intl
                                        new Intl.NumberFormat('en-gb', {
                                            style: 'currency',
                                            currency: 'GBP',
                                        }).format(
                                            (travelTimeInformmation?.duration.value * SURGE_CHARGE_RATE * multiplier) / 100 
                                        )
                                    } */}
                                    <FormattedNumber 
                                        style="currency" 
                                        currency="GBP"
                                        value={(travelTimeInformmation?.duration.value * SURGE_CHARGE_RATE * multiplier) / 100 }
                                    />
                                </Text>
                            </IntlProvider>
                    </TouchableOpacity>
                )}
            />

            <View>
                <TouchableOpacity style={tw`bg-black py-3 m-3`} disabled={!selected}>
                    <Text style={tw`text-center text-white text-xl ${!selected && "bg-gray-300"}`}>Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default RideOptionCard

const styles = StyleSheet.create({})
