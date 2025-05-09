import React, { useState } from 'react';
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

export default function HomeScreen() {
  const { height } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState<number | null>(null);

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
            <Text style={styles.navLink}>Your Lists</Text>
            <Text style={styles.navLink}>Recommendations</Text>
            <Text style={styles.navLink}>Top Ten</Text>
            <Text style={styles.navLink}>New</Text>
            <Pressable style={styles.searchBtn}>
              <Text style={styles.searchText}>Search</Text>
            </Pressable>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.main}>
          <View style={styles.left}>
            <Text style={styles.recTitle}>(Top movie/show rec title here)</Text>
            <Text style={styles.recDescription}>
              (this section will have the algorithm’s best recommendation for the user, and the title
              of the rec goes above while a brief description goes here)
              {'\n'}(here is a list of possible tags or genres)
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

          {/* placeholder image */}
          <View style={styles.imageBox}>
            <Image
              source={{ uri: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg' }}
              style={styles.image}
            />
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
                  source={{ uri: `https://via.placeholder.com/120x180?text=Movie+${i + 1}` }}
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
    backgroundColor: '#fbfbfe', // white
    alignItems: 'center',
  },
  header: {
    width: '100%',
    maxWidth: 1200,
    marginBottom: 40,
    backgroundColor: '#fefcf1', // pastel yellow
    padding: 16,
    borderRadius: 8,
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
    borderColor: '#fefcf1',
    borderWidth: 1,
    paddingHorizontal: 6,
    marginBottom: 8,
    color: '#f5c024', // yellow
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
    color: '#040316', // color for tabs
  },
  searchBtn: {
    backgroundColor: '#f5c024', // Accent color for search button
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  searchText: {
    color: '#040316',
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
    color: '#040316', // Text color for recommendation title
  },
  recDescription: {
    fontSize: 16,
    color: '#040316',
    marginBottom: 24,
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryBtn: {
    backgroundColor: '#f5c024', // Accent color for primary button
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,            
    borderColor: '#f5c024',        
  },
  primaryBtnText: {
    color: '#040316',
    fontWeight: '600',
  },
  secondaryBtn: {
    backgroundColor: '#bde4ef', // Secondary color for secondary button border
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#bde4ef',
  },
  secondaryBtnText: {
    color: '#040316', // Text color for secondary button
    fontWeight: '500',
  },
  imageBox: {
    flex: 1,
    minWidth: 300,
    maxWidth: 600,
    aspectRatio: 1.5,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  posterWheel: {
    marginTop: 40,
    width: '100%',
    maxWidth: 1200,
  },
  posterImage: {
    width: 180,
    height: 200,
    borderRadius: 10,
    backgroundColor: '#bde4ef',
  },
  posterContainer: {
    marginRight: 16,
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
    backgroundColor: '#fff',
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
    color: '#040316', 
  },
  closeButton: {
    backgroundColor: '#040316',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
