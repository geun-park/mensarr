import React, { useState } from 'react';
import { View, Image, StyleSheet, useWindowDimensions, TouchableWithoutFeedback } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
// import ResumableZoom from 'react-native-image-pan-zoom'; // Ensure correct import path

const Map = () => {
  const [pinPosition, setPinPosition] = useState<{ x: number; y: number } | null>(null);

  // Handle the press to place the pin
  const handlePress = (event: any) => {
    const { nativeEvent } = event;
    const { locationX, locationY } = nativeEvent;
    setPinPosition({ x: locationX, y: locationY });
  };

  const { width } = useWindowDimensions();

  // Assume the resolution of the image
  const resolution = [834, 1201];
  if (!resolution) {
    return null;
  }

  // Utility function to maintain aspect ratio
  const imageSize = getAspectRatioSize({
    aspectRatio: resolution[0] / resolution[1],
    width: width,
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Image zoom */}
      <ImageZoom
        cropWidth={width}
        cropHeight={width * (resolution[1] / resolution[0])}
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

// Styles for the pin
const styles = StyleSheet.create({
  pin: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 10,
  },
});

// Mocked aspect ratio helper function
function getAspectRatioSize({ aspectRatio, width }: { aspectRatio: number; width: number }) {
  return {
    width,
    height: width / aspectRatio,
  };
}

export default Map;