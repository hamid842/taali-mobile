import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function LoadingScreen() {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <LinearGradient
      colors={["#4f46e5", "#6366f1", "#a78bfa"]}
      className="flex-1 justify-center items-center"
    >
      {/* Rotating Icon */}
      <Animated.View style={{ transform: [{ rotate: spin }] }} className="mb-6">
        <View className="w-20 h-20 rounded-full border-4 border-white/60 justify-center items-center">
          <View className="w-10 h-10 bg-white rounded-full" />
        </View>
      </Animated.View>

      {/* Loading Text */}
      <Text className="text-white text-xl font-semibold tracking-wide">
        Loading...
      </Text>
    </LinearGradient>
  );
}
