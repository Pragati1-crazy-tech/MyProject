import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;

  const addToCart = async () => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      const cartItems = cart ? JSON.parse(cart) : [];

      cartItems.push(product); // Add the selected product
      await AsyncStorage.setItem('cart', JSON.stringify(cartItems));

      alert('Product added to cart!');
    } catch (error) {
      console.log('Error adding to cart:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
         <Text style={styles.rating}>Rating: {product.rating.rate}</Text>
      <Text style={styles.description}>${product.description}</Text>

      <Button title="Add to Cart " onPress={addToCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: { padding: 20, paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f2f2f2', },
  image: { width: 200, height: 200, alignSelf: 'center'},
  title: { fontSize: 18, marginVertical: 10 },
  price: { fontSize: 18, color: 'green', marginBottom: 10 },
  rating :{ fontSize: 18, color: 'green', marginBottom: 10},
  description: { fontSize: 17, marginVertical: 6,},
});

export default ProductDetailScreen;
