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
import Card from '../shared/card.component';
import { GLOBAL_STYLES } from '../styles/global.styles';
import { Routes } from '../core/enums/routes';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import { timeAgo } from '../core/utils/date.util';
import { Fonts } from '../core/enums/font';
import FlatButton from '../shared/flat-button.component';
import Dropdown from '../shared/dropdown.component';
import Label from '../shared/label.component';
import { Formik } from 'formik';

const HomeScreen = ({ navigation }: any) => {
  const [modalVisible, setModal] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [persons, setPersons] = useState([]);
  const [person, setPerson] = useState(null);
  useEffect(() => {
    const loadExpenses = async () => {
      let arr: any = [];
      const documentSnapshot = await firestore()
        .collection('expenses')
        .get();
      documentSnapshot.forEach(doc => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      arr = arr.sort((a: any, b: any) => {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) - new Date(a.date);
      });
      setExpenses(arr);
    };

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
    loadExpenses();
  }, [expenses]);

  const addExpense = async (values: any, action: any) => {
    try {
      const addExpensesRef = await firestore().collection('expenses');
      addExpensesRef.add({ ...values, date: Date.now() });
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
          <Text style={styles.headerForm}>Add Expense</Text>
          <Formik
            initialValues={{ title: '', amount: '', person: '' }}
            onSubmit={(values, action) => {
              addExpense(values, action);
              // action.resetForm();
              // addReview(values, action);
            }}>
            {props => (
              <View>
                <Label text={'Title of Expense: '} />
                <TextInput
                  onChangeText={props.handleChange('title')}
                  value={props.values.title}
                  style={GLOBAL_STYLES.input}
                  placeholder={'Title'}
                />
                <Label text={'Amount: '} />
                <TextInput
                  keyboardType={'phone-pad'}
                  onChangeText={props.handleChange('amount')}
                  value={props.values.amount}
                  style={GLOBAL_STYLES.input}
                  placeholder={'Amount'}
                />
                <Dropdown
                  items={persons}
                  label={'Select Person'}
                  onValueChange={props.handleChange('person')}
                  selectedValue={props.values.person}
                />
                <FlatButton text={'Add'} onPress={props.handleSubmit as any} />
              </View>
            )}
          </Formik>
        </View>
      </Modal>
      <FlatList
        data={expenses}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.Detail, item)}>
            <Card number={item.amount}>
              <View style={styles.iconTextContainer}>
                <Icon style={styles.icon} name="user" size={15} color="#900" />
                <Text>{item.title}</Text>
              </View>
              <Text>{item.person}</Text>
              <Text>{timeAgo(new Date(item.date))} ago</Text>
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

export default HomeScreen;
