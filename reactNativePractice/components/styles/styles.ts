import { StyleSheet, Platform } from 'react-native';
import { HEADER_HEIGHT } from './constants';
import { useColorScheme } from '@/hooks/useColorScheme';


export const sharedStyles = StyleSheet.create({
  title: {
    fontSize: Platform.OS === 'web' ? 36 : 32,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Platform.OS === 'web' ? 24 : 16,
  },
  universalHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
    marginTop: 0,
    backgroundColor: '#30c035ff', // default light, override for dark in component
    width: '100%',
    height: HEADER_HEIGHT,
  },
  universalHeaderText: {
    fontSize: Platform.OS === 'web' ? 58 : 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 0,
    color: 'white', // default light, override for dark in component
  },
  tab: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 40 : 32,
    left: 0,
    width: Platform.OS === 'web' ? 52 : -40,
    height: Platform.OS === 'web' ? 52 : 25,
    justifyContent: 'center', // misalignment adjustment goes here
    alignItems: 'center',
    borderRadius: Platform.OS === 'web' ? 26 : 22,
    zIndex: 100,
    opacity: 1,
    transform: [{ translateY: Platform.OS === 'web' ? -26 : -60}],
  },
  tabText: {
    fontWeight: 'bold',
    fontSize: Platform.OS === 'web' ? 20 : 16,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    flex: 1,
    position: 'relative',
  },
  col1: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 10,
    flex: 1,
  },
  col2: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingHorizontal: Platform.OS === 'web' ? 16 : 8,
  },
  col3: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 0,
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // Use marginRight on children for spacing instead of gap
  },
  stepContainer: {
    marginBottom: 8,
  },
  expandHamburgerButton: {
    fontWeight: 'bold',
    padding: 0,
    fontSize: Platform.OS === 'web' ? 28 : 22,
  },
  leftContent: {
    padding: Platform.OS === 'web' ? 20 : 12,
  },
  leftTabButton: {
    paddingVertical: Platform.OS === 'web' ? 14 : 10,
    paddingHorizontal: Platform.OS === 'web' ? 22 : 16,
    borderRadius: 6,
    marginBottom: 8,
    // backgroundColor: set dynamically in component!
  },
  leftTabText: {
    fontWeight: 'bold',
    fontSize: Platform.OS === 'web' ? 18 : 16,
  },
  friendItem: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  friendText: {
    fontSize: Platform.OS === 'web' ? 17 : 15,
  },
  parallaxContainer: {
    flex: 1,
  },
  parallaxHeader: {
    height: HEADER_HEIGHT, // You may need to export HEADER_HEIGHT from ParallaxScrollView or define it here
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
    paddingBottom: Platform.OS === 'web' ? 16 : 8,
  },
  parallaxContent: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
  rightColumn: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 320,
    backgroundColor: '#fff',
    zIndex: 20,
    padding: 24,
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
    boxShadow: Platform.OS === 'web' ? '0 2px 8px rgba(0,0,0,0.1)' : undefined,
    elevation: Platform.OS === 'android' ? 8 : 0,
  },
  rightColumnShared: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 320,
    backgroundColor: '#f9f9f9',
    zIndex: 30,
    padding: 24,
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
    boxShadow: Platform.OS === 'web' ? '0 2px 12px rgba(0,0,0,0.1)' : undefined,
    elevation: Platform.OS === 'android' ? 12 : 0,
  },
  collapseButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 30,
    padding: 4,
  },
  collapseButtonShared: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 40,
    padding: 4,
  },
  deleteCheckbox: {
    width: 32,
    height: 32,
    borderWidth: 2,
    borderRadius: 6,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // default, override in component if selected
  },
  profilePortraitContainer: {
    alignItems: 'center',
    paddingTop: 48,
    position: 'absolute', 
    top: 0,               
    left: 0,
    right: 0,
    zIndex: 100,          // zIndex = layer priority
  },
  profileFieldLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileTextInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 8,
    borderRadius: 4,
  },
  profileTextInputPassword: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 24,
    padding: 8,
    borderRadius: 4,
  },
  profileSaveButton: {
    backgroundColor: '#30c035',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  
  tapToEditLabel: {
    fontSize: 10,
    color: '#737773ff',
  },
});

export const friendsScreenStyles = StyleSheet.create({
  friendName: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 16,
  },
  sharedEventItem: {
    marginBottom: 12,
  },
  sharedEventTitle: {
    fontWeight: 'bold',
  },
  addFriendButton: {
    backgroundColor: '#30c035',
    paddingVertical: 4,     // height
    paddingHorizontal: 8,   // width
    borderRadius: 6, 
    marginLeft: 12, 
  },
  addFriendButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,         
  },
});

export const profileBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  portrait: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  portraitPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#222',
  },
  button: {
    backgroundColor: '#30c035ff',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dropdown: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 6,
    minWidth: 120,
    zIndex: 10,
    boxShadow: Platform.OS === 'web' ? '0 2px 6px rgba(0,0,0,0.1)' : undefined,
    elevation: Platform.OS === 'android' ? 4 : 0,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  dropdownText: {
    color: '#222',
    fontSize: 16,
  },
  profileSaveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});