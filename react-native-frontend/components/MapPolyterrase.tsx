import React, { useState } from 'react';
import { View, Image, StyleSheet, useWindowDimensions, TouchableWithoutFeedback } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

const MapPolyterrase = () => {
  const [pinPosition, setPinPosition] = useState<{ x: number; y: number } | null>(null);
  const { width, height } = useWindowDimensions();

  // Handle the press to place the pin
  const handlePress = (event: any) => {
    const { nativeEvent } = event;
    const { locationX, locationY } = nativeEvent;
    setPinPosition({ x: locationX, y: locationY });
  };

  // Assume the resolution of the image
  const resolution = [834, 1201];  // The original resolution of the image

  // Utility function to maintain aspect ratio
  const imageSize = getAspectRatioSize({
    aspectRatio: resolution[0] / resolution[1],
    width,
  });

  return (
    <View style={styles.container}>
      {/* Image zoom */}
      <ImageZoom
        cropWidth={width}
        cropHeight={height}  // Make sure it uses full screen height
        imageWidth={imageSize.width}
        imageHeight={imageSize.height}
        panToMove={true}
        pinchToZoom={true}
      >
        <TouchableWithoutFeedback onPress={handlePress}>
          <View>
            {/* The image */}
            <Image
              source={require('../assets/images/polyterrase.jpg')}
              style={imageSize}
              resizeMethod={'scale'}
            />

            {/* Pin */}
            {pinPosition && (
              <View
                style={[
                  styles.pin,
                  { left: pinPosition.x - 10, top: pinPosition.y - 20 }, // Adjust pin position
                ]}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </ImageZoom>
    </View>
  );
};

// Styles for the pin and container
const styles = StyleSheet.create({
  container: {
    flex: 1,  // Ensure the map takes up the entire screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  pin: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 10,
  },
});

// Helper function for aspect ratio
function getAspectRatioSize({ aspectRatio, width }: { aspectRatio: number; width: number }) {
  return {
    width,
    height: width / aspectRatio,
  };
}

export default MapPolyterrase;
