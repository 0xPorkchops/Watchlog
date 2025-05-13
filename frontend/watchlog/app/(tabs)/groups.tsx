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
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data for groups
const mockGroups = [
  {
    id: 1,
    name: 'Ghibli enjoyers',
    members: 7,
    thumbnail: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
    recentlyWatched: [
      { title: 'Spirited Away', poster: 'https://via.placeholder.com/100/771796' },
      { title: 'My Neighbor Totoro', poster: 'https://via.placeholder.com/100/24f355' },
      { title: 'Princess Mononoke', poster: 'https://via.placeholder.com/100/ff5733' },
    ],
    memberNames: [
      'Duyen',
      'Farhana',
      'Mantra',
      'Samir',
      'Peter',
      'Cameron',
      'Phoenix'
    ],
  },
  {
    id: 2,
    name: 'kdrama enjoyers',
    members: 5,
    thumbnail: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
    recentlyWatched: [
      { title: 'Sky Castle', poster: 'https://via.placeholder.com/100/333333' },
      { title: 'Reply 1988', poster: 'https://via.placeholder.com/100/555555' },
    ],
    memberNames: [
      'Duyen',
      'Farhana',
      'Mantra',
      'Peter',
      'Samir'
    ],
  },
];

export default function GroupScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<typeof mockGroups[0] | null>(null);

  const openModal = (group: typeof mockGroups[0]) => {
    setSelectedGroup(group);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedGroup(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Your Groups</Text>
        
        {/* List of Groups */}
        {mockGroups.map((group) => (
          <Pressable
            key={group.id}
            style={styles.groupCard}
            onPress={() => openModal(group)}
          >
            <Image
              source={{ uri: group.thumbnail }}
              style={styles.thumbnail}
            />
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>{group.name}</Text>
              <Text style={styles.memberCount}>{group.members} members</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* Modal for Group Details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedGroup && (
              <>
                {/* Group Header */}
                <Image
                  source={{ uri: selectedGroup.thumbnail }}
                  style={styles.modalThumbnail}
                />
                <Text style={styles.modalGroupName}>{selectedGroup.name}</Text>
                <Text style={styles.modalMemberCount}>
                  {selectedGroup.members} members
                </Text>

                {/* Recently Watched Section */}
                <Text style={styles.sectionTitle}>Recently Watched</Text>
                <FlatList
                  horizontal
                  data={selectedGroup.recentlyWatched}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.recentlyWatchedItem}>
                      <Image
                        source={{ uri: item.poster }}
                        style={styles.recentlyWatchedPoster}
                      />
                      <Text style={styles.recentlyWatchedTitle}>{item.title}</Text>
                    </View>
                  )}
                  contentContainerStyle={styles.recentlyWatchedList}
                />

                {/* Members Section */}
                <Text style={styles.sectionTitle}>Members</Text>
                <View style={styles.membersContainer}>
                  {selectedGroup.memberNames.map((member, index) => (
                    <Text key={index} style={styles.memberName}>
                      {member}
                    </Text>
                  ))}
                </View>

                {/* Close Button */}
                <Pressable style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fbfbfe', 
    },
    scrollContainer: {
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#040316', 
    },
    groupCard: {
      flexDirection: 'row',
      backgroundColor: '#fefcf1', 
      borderRadius: 10,
      padding: 12,
      marginBottom: 12,
      alignItems: 'center',
      shadowColor: '#040316', 
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
      borderWidth: 1,
      borderColor: '#bde4ef', 
    },
    thumbnail: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 12,
      borderColor: '#f5c024', 
      borderWidth: 2,
    },
    groupInfo: {
      flex: 1,
    },
    groupName: {
      fontSize: 16,
      fontWeight: '600',
      color: '#040316', 
    },
    memberCount: {
      fontSize: 14,
      color: '#666',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(4, 3, 22, 0.7)', 
    },
    modalContent: {
      backgroundColor: '#fefcf1', 
      borderRadius: 12,
      padding: 20,
      width: '90%',
      maxWidth: 400,
      maxHeight: '80%',
      borderColor: '#f5c024', 
      borderWidth: 2,
    },
    modalThumbnail: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 16,
      alignSelf: 'center',
      borderColor: '#f5c024', 
      borderWidth: 3,
    },
    modalGroupName: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'center',
      color: '#040316', 
    },
    modalMemberCount: {
      fontSize: 16,
      color: '#666',
      marginBottom: 20,
      textAlign: 'center',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginTop: 16,
      marginBottom: 8,
      color: '#040316', 
      borderBottomColor: '#bde4ef', 
      borderBottomWidth: 2,
      paddingBottom: 4,
    },
    recentlyWatchedList: {
      paddingBottom: 10,
    },
    recentlyWatchedItem: {
      marginRight: 12,
      alignItems: 'center',
      backgroundColor: '#bde4ef', 
      borderRadius: 8,
      padding: 8,
    },
    recentlyWatchedPoster: {
      width: 80,
      height: 120,
      marginBottom: 4,
    },
    recentlyWatchedTitle: {
      fontSize: 12,
      textAlign: 'center',
      maxWidth: 80,
      color: '#040316', 
    },
    membersContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 16,
    },
    memberName: {
      backgroundColor: '#bde4ef', 
      padding: 6,
      borderRadius: 6,
      margin: 4,
      fontSize: 14,
      color: '#040316', 
    },
    closeButton: {
      backgroundColor: '#f5c024', 
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 16,
    },
    closeButtonText: {
      color: '#040316', 
      fontWeight: '600',
    },
  });