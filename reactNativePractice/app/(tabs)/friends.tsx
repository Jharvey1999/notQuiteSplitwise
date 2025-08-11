import React, { useState } from 'react';
import { Text, Platform, View, TouchableOpacity, ScrollView } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { sharedStyles, friendsScreenStyles } from '@/components/styles/styles';
import { LeftMenuColumn } from '@/components/LeftColumnMenu';
import { friendsList } from '@/storage/friendsList';
import { calculateRelationship } from '@/util/calcRelationship';
import { getSharedEvents } from '@/util/sharedEvents';
import { events } from '@/storage/events_database';
import { EventList } from '@/components/EventList';
import { UniversalHeader } from '@/components/UniversalHeader';
import { AddFriend } from '@/components/AddFriend';
import { addFriend } from '@/util/addFriends';
import { deleteFriend } from '@/util/deleteFriend';
import { useProfile } from '@/components/ProfileContext'; 
import { useTranslation } from '@/components/hooks/useTranslation';

export default function FriendsScreen() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<typeof friendsList[0] | null>(null);
  const [selectedSharedEvent, setSelectedSharedEvent] = useState<string | null>(null);
  const colorScheme = useColorScheme() ?? 'light';
  const [showSharedEvents, setShowSharedEvents] = useState(false);
  const [addFriendVisible, setAddFriendVisible] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [friendsToDelete, setFriendsToDelete] = useState<string[]>([]);
  const { user } = useProfile(); 
  const { t } = useTranslation();

  const sharedEvents = selectedFriend
    ? getSharedEvents(events, user.id, selectedFriend.id)
    : [];

  const userId = user.id; // set current user ID
  const friendId = selectedFriend?.id ?? '';
  const { youOwe, youAreOwed } = selectedFriend
    ? calculateRelationship(events, userId, friendId)
    : { youOwe: 0, youAreOwed: 0 };

  // Update addFriend handler to open the slider
  function handleAddFriend(friendData: { name: string }) {
    addFriend(friendData.name);
    setAddFriendVisible(false);
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#30c035ff', dark: '#17851bff' }}
      headerImage={<UniversalHeader title={t.friends} />}
    >
      <View style={sharedStyles.row}>
        {/* Left Column Menu (shared) */}
        <LeftMenuColumn leftOpen={leftOpen} setLeftOpen={setLeftOpen} />

        {/* Center Column */}
        <View
          style={[
            sharedStyles.col2,
            { flex: 2 },
            !leftOpen && { paddingLeft: 25 },
            !rightOpen && { paddingRight: 0 },
          ]}
        >
          {/* Left HAMBURGER Expand Tab */}
      {!leftOpen && !rightOpen && (
        <TouchableOpacity
          style={[sharedStyles.tab, { left: 0 , zIndex: 999 }]} // temp zIndex to try and get hamburger menu to show
          onPress={() => setLeftOpen(true)}
          activeOpacity={0.8}
        >
          <Text
            style={[
              sharedStyles.expandHamburgerButton,
              { color: colorScheme === 'dark' ? 'white' : 'black' },
            ]}
          >
            {'\u2261'}
          </Text>
        </TouchableOpacity>
      )}
      {leftOpen && (
        <TouchableOpacity
          style={[sharedStyles.tab, { left: 0, zIndex: 20 }]}
          onPress={() => setLeftOpen(false)}
          activeOpacity={0.8}
        >
          <Text
            style={[
              sharedStyles.expandHamburgerButton,
              { color: colorScheme === 'dark' ? 'white' : 'black' },
            ]}
          >
            {'\u2261'}
          </Text>
        </TouchableOpacity>
      )}

          {/* Main Content */}
          {/* Friends Header */}
          <ThemedView style={[sharedStyles.titleContainer, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
            <ThemedText type="title">{t.friends}</ThemedText>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* Add Friend Button */}
              <TouchableOpacity
                style={friendsScreenStyles.addFriendButton}
                onPress={() => setAddFriendVisible(true)}
              >
                <Text style={friendsScreenStyles.addFriendButtonText}>{t.addFriend}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[friendsScreenStyles.addFriendButton, { backgroundColor: 'red', marginLeft: 8 }]}
                onPress={() => {
                  if (deleteMode && friendsToDelete.length > 0) {
                    friendsToDelete.forEach(id => deleteFriend(id));
                    setFriendsToDelete([]);
                  }
                  setDeleteMode(!deleteMode);
                }}
              >
                <Text style={[friendsScreenStyles.addFriendButtonText, { color: 'white' }]}>{t.removeFriend}</Text>
              </TouchableOpacity>
            </View>
          </ThemedView>

          {/* Friends List */}
          <ThemedView style={sharedStyles.stepContainer}>
            {friendsList.map(friend => {
              const selected = friendsToDelete.includes(friend.id);
              return (
                <View key={friend.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity
                    style={[
                      sharedStyles.leftTabButton,
                      {
                        backgroundColor: colorScheme === 'dark' ? '#222' : '#ccc',
                        marginBottom: 10,
                        flex: 1,
                      },
                    ]}
                    onPress={() => {
                      if (!deleteMode) {
                        setSelectedFriend(friend);
                        setRightOpen(true);
                      }
                    }}
                    disabled={deleteMode}
                  >
                    <ThemedText style={{ color: colorScheme === 'dark' ? 'white' : 'black' }}>
                      {friend.name}
                    </ThemedText>
                  </TouchableOpacity>
                  {deleteMode && (
                    <TouchableOpacity
                      style={[
                        sharedStyles.deleteCheckbox,
                        {
                          borderColor: selected ? 'red' : '#ccc',
                          backgroundColor: selected ? '#ffeaea' : 'white',
                        },
                      ]}
                      onPress={() => {
                        setFriendsToDelete(selected
                          ? friendsToDelete.filter(id => id !== friend.id)
                          : [...friendsToDelete, friend.id]
                        );
                      }}
                    >
                      {selected && (
                        <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>✗</Text>
                      )}
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </ThemedView>
        </View>

        {/* Add Friend Slider Column */}
        {addFriendVisible && (
          <AddFriend
            visible={addFriendVisible}
            onClose={() => setAddFriendVisible(false)}
            onAdd={handleAddFriend}
          />
        )}

        {/* Right Expand/Collapse Tab */}
        {rightOpen && (
          <View
            style={sharedStyles.rightColumn}
          >
            {/* Right Collapse Button */}
            <TouchableOpacity
              style={sharedStyles.collapseButton}
              onPress={() => setRightOpen(false)}
            >
              <Text style={{ fontSize: 24 }}>{'\u25B6'}</Text>
            </TouchableOpacity>
            <Text style={friendsScreenStyles.friendName}>
              {selectedFriend?.name}
            </Text>
            {/* Relationship details */}
            <Text>
              {t.sharedEvents}: {sharedEvents.length}{' '}
              <Text
                style={{ color: 'blue', textDecorationLine: 'underline' }}
                onPress={() => setShowSharedEvents(true)}
              >
                {t.show}
              </Text>
            </Text>
            <Text style={{ color: 'red' }}>{t.youOwe} {selectedFriend?.name}: ${youOwe.toFixed(2)}</Text>
            <Text style={{ color: 'green' }}>{selectedFriend?.name} {t.owesYou}: ${youAreOwed.toFixed(2)}</Text>
          </View>
        )}
      </View>
      {showSharedEvents && (
        <View style={sharedStyles.rightColumnShared}>
          <TouchableOpacity
            style={sharedStyles.collapseButtonShared}
            onPress={() => setShowSharedEvents(false)}
          >
            <Text style={{ fontSize: 24 }}>{'\u25B6'}</Text>
          </TouchableOpacity>
          <Text style={friendsScreenStyles.friendName}>
            {t.sharedEvents} {t.with} {selectedFriend?.name}
          </Text>
          <ScrollView>
            <EventList
              events={sharedEvents}
              selectedEvent={selectedSharedEvent}
              setSelectedEvent={setSelectedSharedEvent}
            />
          </ScrollView>
        </View>
      )}

      
    </ParallaxScrollView>
  );
}