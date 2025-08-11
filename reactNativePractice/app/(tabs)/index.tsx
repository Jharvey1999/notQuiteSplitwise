import React, { useState } from 'react';
import { Text, Platform, View, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import { sharedStyles } from '@/components/styles/styles';
import { EventList } from '@/components/EventList';
import { events } from '@/storage/events_database';
import { Event } from '@/storage/events_database';
import { friendsList } from '@/storage/friendsList';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ProfileBar } from '@/util/profileUtil';
import { AddEvent } from '@/components/AddEvent';
import { createEvent } from '@/storage/events_database';
import { DeleteEvent } from '@/components/DeleteEvent';
import { EditEvent } from '@/components/EditEvent';
import { EditEventForm } from '@/components/EditEvent';
import { SummaryEvent } from '@/components/SummaryEvent';
import { LeftMenuColumn } from '@/components/LeftColumnMenu';
import { useProfile } from '@/components/ProfileContext'; 

export default function HomeScreen() {
	const [leftOpen, setLeftOpen] = useState(false);
	const [rightOpen, setRightOpen] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
	const [addEventVisible, setAddEventVisible] = useState(false);
	const [deleteEventVisible, setDeleteEventVisible] = useState(false);
	const [eventList, setEventList] = useState(events); 
	const [editEventFormVisible, setEditEventFormVisible] = useState(false);
	const [eventToEdit, setEventToEdit] = useState<Event | null>(null);
	const [selectEditEventVisible, setSelectEditEventVisible] = useState(false);
	const colorScheme = useColorScheme() ?? 'light';
	const [summaryVisible, setSummaryVisible] = useState(false);

	const router = useRouter();
	const { user } = useProfile(); // use current user

	// Zoom logic
	const scale = useSharedValue(1);

	const pinchGesture = Gesture.Pinch()
		.onUpdate((event) => {
			scale.value = Math.max(1, event.scale);
		});

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
	}));

	const handleRemoveEvent = (eventId: string) => {
		setEventList((prev) => prev.filter((event) => event.id !== eventId));
	};

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<GestureDetector gesture={pinchGesture}>
				<Animated.View style={[{ flex: 1 }, animatedStyle]}>
					<ParallaxScrollView
						headerBackgroundColor={{ light: '#30c035ff', dark: '#17851bff' }}
						headerImage={
							<View
								style={{
									paddingTop: 0,
									marginTop: 0,
									alignItems: 'center',
									justifyContent: 'flex-start',
								}}
							>
								{/* MAIN title (no translation) */}
								<Text
									style={{
										fontSize: Platform.OS === 'web' ? 58 : 30,
										color: colorScheme === 'dark' ? 'white' : 'black',
										textAlign: 'center',
										marginTop: 0,
									}}
								>
									Not Quite Splitwise
								</Text>
							</View>
						}
					>
						<View style={sharedStyles.row}>
							{/* Left Column Menu (shared) */}
							<LeftMenuColumn leftOpen={leftOpen} setLeftOpen={setLeftOpen} />

							{/* MAIN Column */}
							<View
								style={[
									sharedStyles.col2,
									{ flex: 2 },
									!leftOpen && { paddingLeft: 16 },
									!rightOpen && { paddingRight: 0 },
								]}
							>
                <ProfileBar
                  onProfilePress={() => {/* handle press */}}
                  onAddEvent={() => setAddEventVisible(true)}
                  onRemoveEvent={() => setDeleteEventVisible(true)} 
				  onEditEvent={() => setSelectEditEventVisible(true)}
				  selectedEvent={selectedEvent}
				  events={eventList}
				  onSummary={() => setSummaryVisible(true)}
                />

								{/* Event List */}
								<EventList
									events={eventList}
									selectedEvent={selectedEvent}
									setSelectedEvent={setSelectedEvent}
									onRemoveEvent={handleRemoveEvent}
								/>

								{/* Hamburger Button */}
								<TouchableOpacity
									style={[sharedStyles.tab, { left: 0 }]}
									onPress={() => setLeftOpen(!leftOpen)} // toggle logic so it works for expand and collapse
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
							</View>
						</View>
					</ParallaxScrollView>
					{/* Add the Event */}
					<AddEvent
						visible={addEventVisible}
						onClose={() => setAddEventVisible(false)}
						onAdd={eventData => {
							const newEvent = createEvent(
								(eventList.length + 1).toString(),
								eventData.date,
								eventData.name,
								eventData.contributions,
								user.id
							);
							setEventList(prev => [...prev, newEvent]);
							setAddEventVisible(false);
						}}
						currentUserId={user.id}
						friends={friendsList}
					/>
					<DeleteEvent
						visible={deleteEventVisible}
						events={eventList}
						onClose={() => setDeleteEventVisible(false)}
						onRemove={handleRemoveEvent}
					/>
					<EditEvent
						visible={selectEditEventVisible}
						events={eventList}
						onClose={() => setSelectEditEventVisible(false)}
						onSelect={(event: Event) => {
							setEventToEdit(event);
							setEditEventFormVisible(true);
							setSelectEditEventVisible(false);
						}}
					/>

					{/* Edit Event Form */}
					<EditEventForm
						visible={editEventFormVisible}
						event={eventToEdit}
						onClose={() => setEditEventFormVisible(false)}
						onSave={eventData => {
							if (!eventToEdit) return;
							setEventList(prev =>
								prev.map(ev =>
									ev.id === eventToEdit.id
										? { ...ev, ...eventData, id: ev.id }
										: ev
								)
							);
							setEditEventFormVisible(false);
							setEventToEdit(null);
						}}
						friends ={friendsList}
					/>
					<SummaryEvent
						visible={summaryVisible}
						events={eventList}
						currentUserId={user.id}
						onClose={() => setSummaryVisible(false)}
					/>
				</Animated.View>
			</GestureDetector>
		</GestureHandlerRootView>
	);
}



