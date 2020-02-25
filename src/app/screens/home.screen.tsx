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
  Switch,
  ActivityIndicator,
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
import Spinner from '../shared/spinner.component';

const HomeScreen = ({ navigation }: any) => {
  const [modalVisible, setModal] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [persons, setPersons] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(false);
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

      // Assoicate User to expense
      setExpenses(arr);
    };

    const loadPersons = async () => {
      let usersArr: any = {};
      let personsArr: any = [];
      const documentSnapshot = await firestore()
        .collection('persons')
        .get();
      documentSnapshot.forEach(doc => {
        usersArr[doc.id] = { ...doc.data() };
        // console.log(arr, 'PERONS');
        personsArr.push({ ...doc.data(), id: doc.id });
      });
      setUsers(usersArr);
      setPersons(personsArr);
    };

    const populateFields = async () => {
      if (!loading) {
        setLoading(true);
      }

      return await Promise.all(
        [loadPersons(), loadExpenses()].map(handleRejection),
      );
    };

    const handleRejection = p => {
      return p.catch(err => ({ error: err }));
    };

    // loadPersons();
    // loadExpenses();
    populateFields().then(results => setLoading(false));
  }, []);

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

  const showPerson = (personid: string) => {
    return users[personid];
  };

  return (
    <View style={GLOBAL_STYLES.container}>
      <Text style={styles.headerForm}>Expenses</Text>
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
            initialValues={{
              title: '',
              amount: 0,
              person: null,
            }}
            enableReinitialize={true}
            onSubmit={(values, action) => {
              let formValues = values;
              if (!formValues.person) {
                formValues.person = persons[0].id;
              }

              console.log(formValues);
              addExpense(formValues, action);
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
                  onChangeText={(value: string | number) =>
                    props.setFieldValue('amount', Number(value))
                  }
                  value={props.values.amount}
                  style={GLOBAL_STYLES.input}
                  placeholder={'Amount'}
                />
                <Dropdown
                  items={persons}
                  label={'Select Person'}
                  onValueChange={itemValue =>
                    props.setFieldValue('person', itemValue)
                  }
                  selectedValue={props.values.person}
                />
                <FlatButton text={'Add'} onPress={props.handleSubmit as any} />
              </View>
            )}
          </Formik>
        </View>
      </Modal>
      {loading ? (
        <Spinner />
      ) : (
        <FlatList
          data={expenses}
          renderItem={({ item }) => (
            // <TouchableOpacity
            //   onPress={() => navigation.navigate(Routes.Detail, item)}>
            // </TouchableOpacity>
            <Card number={item.amount}>
              <View style={styles.iconTextContainer}>
                <Icon style={styles.icon} name="coins" size={15} color="#900" />
                <Text
                  style={{
                    fontFamily: Fonts.NunitoSemiBold,
                    fontSize: 18,
                    textTransform: 'uppercase',
                    textDecorationLine: 'line-through',
                  }}>
                  {item.title}
                </Text>
              </View>
              <View style={styles.iconTextContainer}>
                <Icon style={styles.icon} name="user" size={20} color="#900" />
                <Text
                  style={{ fontFamily: Fonts.NunitoSemiBold, fontSize: 18 }}>
                  {showPerson(item.person).name}
                </Text>
              </View>
              <Text>Added {timeAgo(new Date(item.date))} ago</Text>
            </Card>
          )}
        />
      )}
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
    marginVertical: 3,
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
