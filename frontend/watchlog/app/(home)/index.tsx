import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  useWindowDimensions,
  ScrollView,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const { height } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState<number | null>(null);
  const [movieTitle, setMovieTitle] = useState<string | null>(null);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [plot, setPlot] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInterstellar() {
      try {
        const res = await fetch('http://localhost:3000/searchMovie', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            searchType: '0', // 0 for title search
            movieInfo: { Title: 'Interstellar' }
          }),
        });
        const data = await res.json();
        console.log('Poster URL:', data.Poster);
				setMovieTitle(data.Title);
        setPosterUrl(data.Poster);
        setPlot(data.Plot);
      } catch (err) {
        console.error("Failed to fetch movie", err);
      }
    }
  
    fetchInterstellar();
  }, []);

  const openModal = (index: number) => {
    setSelectedPoster(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPoster(null);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.container, { minHeight: height }]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>WATCH LOG</Text>
          <View style={styles.nav}>
            {/* <Text style={styles.navLink}>Your Lists</Text>
            <Text style={styles.navLink}>Recommendations</Text>
            <Text style={styles.navLink}>New</Text>
            <Pressable style={styles.searchBtn}>
              <Text style={styles.searchText}>Search</Text>
            </Pressable> */}
            <Pressable style={styles.tabBtns} > <Text style={styles.secondaryBtnText}>Your Lists</Text> </Pressable>
            <button style={styles.navLink} > Recommendations </button>
	    <Link href= "/(tabs)/groups" asChild>
              <Pressable>
              <Text style={styles.navLink}>Your Groups</Text>
              </Pressable>
            </Link>
            <button style={styles.navLink} > Search </button>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.main}>
          <View style={styles.left}>
            <Text style={styles.recTitle}>{movieTitle ? movieTitle : 'Loading title...'}</Text>
            <Text style={styles.recDescription}>
              {plot ? plot : 'Loading plot...'}
            </Text>

            <View style={styles.buttons}>
              <Pressable style={styles.primaryBtn}>
                <Text style={styles.primaryBtnText}>Add to list</Text>
              </Pressable>
              <Pressable style={styles.secondaryBtn}>
                <Text style={styles.secondaryBtnText}>Not interested</Text>
              </Pressable>
            </View>
          </View>

          {/* Placeholder image */}
          <View style={styles.imageBox}>
    {posterUrl ? (
      <Image source={{ uri: posterUrl }} style={styles.image} />
    ) : (
      <Text>Loading poster...</Text>
    )}
  </View>
        </View>

        {/* scrollable movie wheel */}
        <View style={styles.posterWheel}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Array.from({ length: 10 }).map((_, i) => (
              <Pressable
                key={i}
                style={styles.posterContainer}
                onPress={() => openModal(i + 1)}
              >
                <Image
                  source={{ uri: `https://picsum.photos/120/180?random=${i}` }}
                  style={styles.posterImage}
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Modal to show expanded poster */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image
              source={{
                uri: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
              }}
              style={styles.modalImage}
            />
            <Text style={styles.modalTitle}>Movie Title {selectedPoster}</Text>
            <Text style={styles.modalDescription}>
              This is a short description for movie number {selectedPoster}. 
            </Text>
            <Pressable onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    maxWidth: 1200,
    marginBottom: 40,
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
    borderColor: '#888',
    borderWidth: 1,
    paddingHorizontal: 6,
    marginBottom: 8,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  navLink: {
    marginRight: 20,
    fontSize: 16,
    fontWeight: '600',
  },
  tabBtns: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'transparent', 
    borderRadius: '12px', 
    border: '1px solid black', 
    marginRight: 5,
    fontSize: 16,
    fontWeight: '600',
    cursor: "pointer"
  }, 
  searchBtn: {
    backgroundColor: '#333',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  searchText: {
    color: 'white',
  },
  main: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 1200,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 24,
  },
  left: {
    flex: 1,
    minWidth: 300,
    maxWidth: 600,
  },
  recTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  recDescription: {
    fontSize: 16,
    color: '#444',
    marginBottom: 24,
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryBtn: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  primaryBtnText: {
    color: 'white',
    fontWeight: '600',
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: '#888',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  secondaryBtnText: {
    color: '#444',
    fontWeight: '500',
  },
  imageBox: {
    flex: 1,
    minWidth: 300,
    maxWidth: 600,
    aspectRatio: 1.5,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  posterWheel: {
    marginTop: 40,
    width: '100%',
    maxWidth: 1200,
  },
  posterImage: {
    width: 180,       // was 120
    height: 200,      // was 180
    borderRadius: 10,
    backgroundColor: '#ccc',
  },
  posterContainer: {
    marginRight: 16,  // extra spacing for breathing room
    borderRadius: 10,
    overflow: 'hidden',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    width: '90%', 
    maxWidth: 700,
  },
  modalImage: {
    width: '90%',
    height: 500,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  modalDescription: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },  
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  closeButton: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
