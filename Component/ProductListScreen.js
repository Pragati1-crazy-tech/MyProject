import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
 
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://fakestoreapi.com/products');
  
      const data = await res.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      setError(error.message);
      console.log('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
   useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={{ marginTop: 10 }}>Loading products...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {products.length > 0 ? (
        products.map(product => (
          <TouchableOpacity
            key={product.id}
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { product })}
          >
            <Image
              source={{ uri: product.image }}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <Text style={styles.rating}>Rating: {product.rating.rate}</Text>
            
          </TouchableOpacity>
        ))
      ) : (
        <Text>No products available</Text>
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
  },
  price: {
    fontSize: 15,
    color: '#007b00',
    fontWeight: '600',
    marginBottom: 4,
  },
  rating: {
    fontSize: 13,
    color: '#999',
  },
});

export default ProductListScreen;
