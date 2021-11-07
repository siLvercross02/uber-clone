import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { setOrigin, setDestination } from '../slices/navSlice';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GOOGLE_MAPS_APIKEY } from '@env';
import NavFavorites from '../components/NavFavorites';

const HomeScreen = () => {
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
           <View style={tw`p-5`}>
                <Image 
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'contain'
                    }}
                    source={{
                        uri: 'https://links.papareact.com/gzs',
                    }}
                />

                <GooglePlacesAutocomplete
                    styles={{
                        container: {
                            flex: 0,
                        },
                        textInput: {
                            fontSize: 18,
                        },
                    }}
                    placeholder='Where From?'
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                    minLength={2}
                    enablePoweredByContainer={false}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en'
                    }}
                    onPress={(data, details = null) => {
                        dispatch(
                            setOrigin({
                                location: details.geometry.location,
                                description: data.description, 
                            })
                        );

                        dispatch(setDestination(null));
                    }}
                />
                 
                <NavOptions />
                <NavFavorites />
           </View>  
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
