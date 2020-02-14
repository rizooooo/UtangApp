import React, { useState, useEffect } from 'react';
import { Button, FlatList, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Card from '../shared/card.component';
import { GLOBAL_STYLES } from '../styles/global.styles';
import { Routes } from '../core/enums/routes';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import { timeAgo } from '../core/utils/date.util';

const HomeScreen = ({ navigation }: any) => {
  const [reviews, setReviews] = useState([
    {
      title: 'Marivic',
      rating: 5,
      body: 'lorem ipsum',
      key: '1',
    },
    {
      title: 'Gotta Catch Them All (again)',
      rating: 4,
      body: 'lorem ipsum',
      key: '2',
    },
    {
      title: 'Not So "Final" Fantasy',
      rating: 3,
      body: 'lorem ipsum',
      key: '3',
    },
  ]);

  useEffect(() => {
    const loadReviews = async () => {
      let arr: any = [];
      const documentSnapshot = await firestore()
        .collection('reviews')
        .get();
      documentSnapshot.forEach(doc => {
        arr.push(doc.data());
      });
      console.log(arr);
    };

    loadReviews();
  }, []);
  return (
    <View style={GLOBAL_STYLES.container}>
      <Icon name="rocket" size={30} color="#900" />
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.Detail, item)}>
            <Card>
              <View style={styles.iconTextContainer}>
                <Icon style={styles.icon} name="user" size={15} color="#900" />
                <Text style={GLOBAL_STYLES.titleText}>{item.title}</Text>
              </View>
              <Text>{timeAgo(new Date('2020-02-14T04:15:29.000Z'))} ago</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  }
});

export default HomeScreen;
