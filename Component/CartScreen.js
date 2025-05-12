import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const CartScreen = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);


  const removeFromCart = async (indexToRemove) => {
    try {
      const updatedCart = cart.filter((_, index) => index !== indexToRemove);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart); // Update state after removing
    } catch (error) {
      console.log('Error removing item:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchCart = async () => {
        setLoading(true);
        try {
          const existingCart = await AsyncStorage.getItem('cart');
          const parsedCart = existingCart ? JSON.parse(existingCart) : [];
          setCart(parsedCart);
        } catch (error) {
          console.log('Error fetching cart:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchCart();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={{ marginTop: 10 }}>Loading cart...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty!</Text>
      ) : (
        cart.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
        
            <TouchableOpacity onPress={() => removeFromCart(index)} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))
        
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#f2f2f2',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginVertical: 10,
    width: 320,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'normal',
    textAlign: 'center',
    color: '#222',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  price: {
    fontSize: 15,
    color: '#007b00',
    fontWeight: '600',
    marginBottom: 4,
  },
  emptyCartText: {
    fontSize: 18,
    color: '#999',
    marginTop: 20,
  },

  removeButton: {
    marginTop: 8,
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderColor: '#ccc', // light gray border
    borderWidth: 1,       // make the border visible
  },
  
  removeButtonText: {
    color: '#333333',
    fontSize: 14,
  },
  
});

export default CartScreen;
