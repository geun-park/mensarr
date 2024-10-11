import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';
import { PanGestureHandler, PinchGestureHandler, GestureHandlerRootView, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

// Type Definitions
interface Table {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Divider {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'wall' | 'stairs';
}

interface LayoutData {
  tables: Table[];
  dividers: Divider[];
}

// Sample layout data
const layoutData: LayoutData = {
  tables: [
    { id: 1, x: 50, y: 100, width: 80, height: 80 },
    { id: 2, x: 150, y: 200, width: 80, height: 80 },
    { id: 3, x: 250, y: 150, width: 100, height: 100 },
  ],
  dividers: [
    { id: 'wall1', x: 0, y: 50, width: 300, height: 20, type: 'wall' },
    { id: 'stairs', x: 100, y: 300, width: 60, height: 60, type: 'stairs' },
  ],
};

const ZoomableLayout: React.FC = () => {
  const [layout, setLayout] = useState<LayoutData>(layoutData);

  // Shared values for zoom and pan
  const scale = useSharedValue<number>(1); // Default scale = 1
  const translateX = useSharedValue<number>(0);
  const translateY = useSharedValue<number>(0);

  // Pinch zoom handler
  const onPinch = (event: any) => {
    scale.value = withTiming(event.nativeEvent.scale, { duration: 100 });
  };

  // Pan gesture handler for moving the layout
  const onPan = (event: any) => {
    translateX.value = withSpring(event.nativeEvent.translationX);
    translateY.value = withSpring(event.nativeEvent.translationY);
  };

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const handleTablePress = (id: number) => {
    console.log(`Table ${id} clicked!`);
    // Handle table click logic here
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={onPan}>
        <Animated.View>
          <PinchGestureHandler onGestureEvent={onPinch}>
            <Animated.View style={[styles.layoutContainer, animatedStyle]}>
              {/* Background Image */}
              <Image source={{ uri: 'https://example.com/mensa-layout.png' }} style={styles.backgroundImage} />

              {/* Render Tables */}
              {layout.tables.map((table) => (
                <TouchableOpacity
                  key={table.id}
                  style={[styles.table, { top: table.y, left: table.x, width: table.width, height: table.height }]}
                  onPress={() => handleTablePress(table.id)}
                >
                  <Text style={styles.tableText}>Table {table.id}</Text>
                </TouchableOpacity>
              ))}

              {/* Render Dividers */}
              {layout.dividers.map((divider) => (
                <View
                  key={divider.id}
                  style={[
                    styles.divider,
                    {
                      top: divider.y,
                      left: divider.x,
                      width: divider.width,
                      height: divider.height,
                      backgroundColor: divider.type === 'wall' ? 'brown' : 'gray',
                    },
                  ]}
                >
                  <Text style={styles.dividerText}>{divider.type}</Text>
                </View>
              ))}
            </Animated.View>
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  layoutContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  backgroundImage: {
    width: width,
    height: height,
    position: 'absolute',
  },
  table: {
    position: 'absolute',
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  tableText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    position: 'absolute',
    backgroundColor: 'brown',
  },
  dividerText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
});

export default ZoomableLayout;
