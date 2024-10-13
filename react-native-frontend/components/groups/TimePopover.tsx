// import React, { useState } from 'react';
// import { View, Text, Modal, Pressable, StyleSheet, Button } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';

// interface Props {
//   isVisible: boolean;
//   onClose: () => void;
//   onTimeSelected: (time: Date) => void;
// }

// const TimeSelector: React.FC<Props> = ({ isVisible, onClose, onTimeSelected }) => {
//   const [selectedTime, setSelectedTime] = useState<Date>(new Date());
//   const [showPicker, setShowPicker] = useState<boolean>(false);

//   const handleConfirm = () => {
//     onTimeSelected(selectedTime);
//     onClose();
//   };

//   return (
//     <Modal animationType="slide" transparent={true} visible={isVisible}>
//       <View style={styles.modalContent}>
//         <View style={styles.titleContainer}>
//           <Text style={styles.title}>Select Time</Text>
//           <Pressable onPress={onClose}>
//             <Text style={styles.closeButton}>Close</Text>
//           </Pressable>
//         </View>
//         <View style={styles.pickerContainer}>
//           <Button title="Show Time Picker" onPress={() => setShowPicker(true)} />
//           {showPicker && (
//             <DateTimePicker
//               value={selectedTime}
//               mode="time"
//               display="default"
//               onChange={(event, date) => {
//                 setShowPicker(false);
//                 if (date) {
//                   setSelectedTime(date);
//                 }
//               }}
//             />
//           )}
//         </View>
//         <Pressable style={styles.confirmButton} onPress={handleConfirm}>
//           <Text style={styles.confirmButtonText}>Confirm</Text>
//         </Pressable>
//       </View>
//     </Modal>
//   );
// };

// export default TimeSelector;

// const styles = StyleSheet.create({
//   modalContent: {
//     height: '30%',
//     width: '100%',
//     backgroundColor: '#fff',
//     borderTopRightRadius: 18,
//     borderTopLeftRadius: 18,
//     position: 'absolute',
//     bottom: 0,
//     padding: 20,
//   },
//   titleContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   closeButton: {
//     fontSize: 16,
//     color: 'red',
//   },
//   pickerContainer: {
//     marginVertical: 20,
//   },
//   confirmButton: {
//     backgroundColor: '#007BFF',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   confirmButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });