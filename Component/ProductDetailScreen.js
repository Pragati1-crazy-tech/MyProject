import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.rating}>Rating: {product.rating.rate} ⭐</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    width: 220,
    height: 220,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 15,
    fontFamily: 'sans-serif',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: '#28a745',
    fontWeight: '600',
    marginBottom: 6,
  },
  rating: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#444',
    textAlign: 'justify',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
});

export default ProductDetailScreen;
