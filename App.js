import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Confetti from "react-native-confetti"; // 🎉 Import Confetti Rain

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const confettiRef = useRef(null); // 🎉 Reference for Confetti

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handlePress = (value) => {
    if (value === "=") {
      try {
        setResult(eval(input).toString());

        if (confettiRef.current) {
          confettiRef.current.startConfetti(); // 🎉 Start confetti rain
        }

        setTimeout(() => {
          if (confettiRef.current) {
            confettiRef.current.stopConfetti(); // 🚫 Stop confetti after 6 seconds
          }
        }, 6000);
      } catch (error) {
        setResult("Error");
      }
    } else if (value === "C") {
      setInput("");
      setResult("");
    } else if (value === "⌫") {
      if (input.length > 0) {
        setInput((prev) => prev.slice(0, -1));
      }
    } else if (value === "%") {
      setInput((prev) => (parseFloat(prev) / 100).toString());
    } else if (value === "√") {
      setInput((prev) => Math.sqrt(parseFloat(prev)).toString());
    } else {
      setInput((prev) => prev + value);
    }
  };

  const buttons = [
    "C", "⌫", "√", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "%", "="
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: darkMode ? "#222" : "#f5f5f5",
    },
    result: {
      fontSize: 40,
      marginBottom: 10,
      color: darkMode ? "#fff" : "#000",
    },
    input: {
      fontSize: 30,
      marginBottom: 20,
      color: darkMode ? "#bbb" : "gray",
    },
    buttonContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      width: "80%",
    },
    button: {
      width: "22%",
      height: 80,
      margin: 5,
      backgroundColor: darkMode ? "#444" : "#3498db",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
    },
    buttonText: {
      fontSize: 30,
      color: "#fff",
    },
    themeButton: {
      position: "absolute",
      top: 50,
      right: 20,
      padding: 10,
      backgroundColor: darkMode ? "#fff" : "#000",
      borderRadius: 10,
    },
    themeButtonText: {
      color: darkMode ? "#000" : "#fff",
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      {/* Theme Toggle Button */}
      <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
        <Text style={styles.themeButtonText}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.result}>{result}</Text>
      <Text style={styles.input}>{input}</Text>

      <View style={styles.buttonContainer}>
        {buttons.map((btn) => (
          <TouchableOpacity
            key={btn}
            style={styles.button}
            onPress={() => handlePress(btn)}
          >
            <Text style={styles.buttonText}>{btn}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 🎉 Confetti Rain Effect */}
      <Confetti ref={confettiRef} />
    </View>
  );
}
