import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Alert,
  ImageBackground,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Crypto from 'expo-crypto';
import {
  Rubik_400Regular,
  Rubik_700Bold,
  useFonts,
} from '@expo-google-fonts/rubik';

import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import Button from './components/Button';
import { Colors } from './styles/colors';

const API_URL = 'https://dog.ceo/api/breeds/image/random';

const renderDogItem = ({ item }) => (
  <Image source={{ uri: item.url }} style={styles.dogImage} />
);

export default function App() {
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_700Bold,
  });

  const [dogs, setDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);

  if (!fontsLoaded)
    return <ActivityIndicator size="large" color={Colors.PRIMARY} />;

  const getDog = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL);
      // ...prevState: spread out the prev array of dog urls
      setDogs((prevState) => [
        ...prevState,
        { id: Crypto.randomUUID(), url: response.data.message },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      // console.log("this block will always run")
      setIsLoading(false);
    }
  };

  const scrollToEnd = () => flatListRef.current.scrollToEnd({ animated: true });

  const handleClearDogs = () => {
    Alert.alert('Clear Dogs', 'Are you sure you want to clear all dogs?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        style: 'destructive',
        onPress: () => setDogs([]),
      },
    ]);
  };

  return (
    <SafeAreaProvider>
      <LinearGradient
        style={{ flex: 1 }}
        colors={[Colors.PRIMARY_LIGHT_2, Colors.PRIMARY_LIGHT_1]}
      >
        <ImageBackground
          source={require('./assets/images/wallpaper.jpg')}
          style={{ flex: 1 }}
          imageStyle={{ opacity: 0.3 }}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
              <Text style={styles.appHeader}>🐶 Dogstagram</Text>
              <Text style={styles.welcomeText}>👋 Welcome! Get a dog!</Text>
              <View style={styles.buttonsContainer}>
                <Button onPress={getDog}>Get Dog</Button>
                <Button onPress={handleClearDogs}>Clear</Button>
              </View>
              <View style={styles.dogsContainer}>
                {/* <ScrollView
                showsVerticalScrollIndicator={false}
                ref={scrollViewRef}
                onContentSizeChange={() =>
                  scrollViewRef.current.scrollToEnd({ animated: true })
                }
              >
                {dogs.map((dog) => (
                  <Image
                    key={dog.id}
                    source={{ uri: dog.url }}
                    style={styles.dogImage}
                  />
                ))}
              </ScrollView> */}
                {/* {dogs.length === 0 && <Text>🥹 No dogs yet!</Text>} */}
                <FlatList
                  ref={flatListRef}
                  data={dogs}
                  // Tell FlatList which id to use (key)
                  keyExtractor={(dog) => dog.id}
                  renderItem={renderDogItem}
                  onContentSizeChange={scrollToEnd}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={<Text>🥹 No dogs yet!</Text>}
                />
              </View>
              {isLoading && (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="large" color={Colors.PRIMARY} />
                </View>
              )}
              <StatusBar style="auto" />
            </View>
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "stretch"
  },
  appHeader: {
    fontFamily: 'Rubik_700Bold',
    color: Colors.PRIMARY,
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 20,
    textAlign: 'center',
  },
  welcomeText: {
    fontFamily: 'Rubik_400Regular',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 20,
  },
  dogsContainer: {
    flex: 1,
    alignItems: 'center',
  },
  dogImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  loadingOverlay: {
    // provide all properties to make a component absolute fill its parent
    // shortcut for overlays, backgrounds
    // set position absolute top 0, right 0, bottom 0, left 0
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
});
