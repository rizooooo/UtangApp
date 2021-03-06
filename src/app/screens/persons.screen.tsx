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
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import Card from '../shared/card.component';
import { GLOBAL_STYLES } from '../styles/global.styles';
import { Routes } from '../core/enums/routes';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import { timeAgo } from '../core/utils/date.util';
import { Fonts } from '../core/enums/font';
import FlatButton from '../shared/flat-button.component';

const PersonsScreen = ({ navigation }: any) => {
  const [modalVisible, setModal] = useState(false);
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const loadPersons = async () => {
      let arr: any = [];
      const documentSnapshot = await firestore()
        .collection('persons')
        .get();
      documentSnapshot.forEach(doc => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      arr = arr.sort((a: any, b: any) => {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) - new Date(a.date);
      });
      setPersons(arr);
    };

    loadPersons();
  }, [persons]);

  const addReview = async (values: any, action: any) => {
    try {
      const addPersonRef = await firestore().collection('persons');
      addPersonRef.add({ ...values, date: Date.now() });
      action.resetForm();
      setModal(false);
    } catch (error) {
      console.log(error);
      Alert.alert('ERROR');
      setModal(false);
    }
  };

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
          <Text style={styles.headerForm}>Add Person</Text>
          <Formik
            initialValues={{ name: '' }}
            onSubmit={(values, action) => {
              // action.resetForm();
              addReview(values, action);
            }}>
            {props => (
              <View>
                <TextInput
                  style={GLOBAL_STYLES.input}
                  placeholder={'Person Name'}
                  onChangeText={props.handleChange('name')}
                  value={props.values.name}
                />
                <FlatButton text={'Add'} onPress={props.handleSubmit as any} />
              </View>
            )}
          </Formik>
        </View>
      </Modal>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={persons}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.Detail, item)}>
            <Card number={12}>
              <Text style={GLOBAL_STYLES.titleText}>{item.name}</Text>
              <Text>Added {timeAgo(new Date(item.date))} ago</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerForm: {
    fontSize: 30,
    fontFamily: Fonts.NunitoBold,
  },
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

export default PersonsScreen;
