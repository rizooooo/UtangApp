import React, { useState, useEffect } from 'react';
import {
  Button,
  FlatList,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Modal,
  TextInput,
  Picker,
} from 'react-native';
import Card from '../shared/card.component';
import { GLOBAL_STYLES } from '../styles/global.styles';
import { Routes } from '../core/enums/routes';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import { timeAgo } from '../core/utils/date.util';
import { Fonts } from '../core/enums/font';
import FlatButton from '../shared/flat-button.component';

const HomeScreen = ({ navigation }: any) => {
  const [modalVisible, setModal] = useState(false);
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
      <Icon
        onPress={() => setModal(true)}
        style={styles.addIcon}
        name="plus"
        size={30}
        color="#900"
      />
      <Modal visible={modalVisible} animationType={'slide'}>
        <View style={GLOBAL_STYLES.container}>
          <Icon
            onPress={() => setModal(false)}
            style={styles.addIcon}
            name="times"
            size={30}
            color="#900"
          />
          <Text style={{ fontSize: 30, fontFamily: Fonts.NunitoBold }}>
            Add Expense
          </Text>
          <TextInput style={GLOBAL_STYLES.input} placeholder={'Title'} />
          <TextInput style={GLOBAL_STYLES.input} placeholder={'Amount'} />
          <TextInput style={GLOBAL_STYLES.input} placeholder={'Person'} />
          <View style={GLOBAL_STYLES.picker}>
            <Picker>
              {[...Array(30).keys()].map(e => (
                <Picker.Item label="Java" value="java" />
              ))}
            </Picker>
          </View>
          <FlatButton text={'Add'} />
        </View>
      </Modal>
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
  },
  addIcon: {
    marginBottom: 10,
    alignSelf: 'center',
  },
});

export default HomeScreen;
