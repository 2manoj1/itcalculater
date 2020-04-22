import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Picker } from 'native-base';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';
const lacs = 100000;
const Two_Half_lacs = 2.5 * lacs;

const AGE = [
  { label: "Below 60 Years", value: "BELOW_60" },
  { label: "60-80 Years", value: "BETWEEN_60_80" },
  { label: "Above 80 Years", value: "ABOVE_80" },
]

const getTax = (totalTaxableIncome, age) => {
  const exempt = age === "BELOW_60" ? Two_Half_lacs : age === "BETWEEN_60_80" ? 3 * lacs : 5 * lacs;
  let sumTax = 0;
  
  if (totalTaxableIncome > exempt) {
    if(totalTaxableIncome > 10 * lacs) {
     sumTax = 112500 + ((totalTaxableIncome - 10*lacs) * 30 /100)
    }
    else if(totalTaxableIncome > 5*lacs && totalTaxableIncome<= 10*lacs) 
    {
      sumTax = 12500 + ((totalTaxableIncome - 5*lacs) * 20 /100)
    }
    else {
      sumTax = (totalTaxableIncome - exempt) * 5/100;
    }
  }
  return sumTax;
}


const getRebate = (taxValue) => taxValue <= 12500 ? taxValue : 0;

const getCess = (taxValue) => taxValue * 4 / 100;


export default function HomeScreen() {
  const [selectedAge, setSelectedAge] = React.useState("BELOW_60");
  const [formData, setFormData] = React.useState({
    gross: '1000000',
    sd: '50000',
    homeloan: '0',
    other: '0'
  });
  const onHandleChange = (propName, value) => {
    setFormData({ ...formData, [propName]: value.replace(/[^0-9]/g, '') });
  }
  const taxable_income = formData.gross - formData.sd - formData.homeloan - formData.other;
  const tax = getTax(taxable_income, selectedAge);
  const rebate = getRebate(tax);
  const afterRebateTax = tax - rebate;
  const cess = afterRebateTax > 0 ? getCess(tax) : 0;
  const totalTaxAfterCess = afterRebateTax + cess;
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Picker
          note
          mode="dropdown"
          selectedValue={selectedAge}
          onValueChange={(itemValue) => setSelectedAge(itemValue)}
        >
          {AGE.map((age) => <Picker.Item key={age.value} {...age} />)}
        </Picker>
        <Form>
          <Item floatingLabel>
            <Label>Gross Salary</Label>
            <Input
              onChangeText={text => onHandleChange('gross', text)}
              value={formData?.gross} />
          </Item>
          <Item floatingLabel>
            <Label>Standard Deduction</Label>
            <Input
              onChangeText={text => onHandleChange('sd', text)}
              value={formData?.sd} />
          </Item>
          <Item floatingLabel>
            <Label>Home loan interest - (24(b))</Label>
            <Input
              onChangeText={text => onHandleChange('homeloan', text)}
              value={formData?.homeloan} />
          </Item>
          <Item floatingLabel>
            <Label>{`Other Deduction (80CCD(2),80JJAA etc)`}</Label>
            <Input
              onChangeText={text => onHandleChange('other', text)}
              value={formData?.other} />
          </Item>
        </Form>
        <Text>Total Taxable Income: {taxable_income}</Text>
        <Text>Before Rebate and Cess Tax: {tax}</Text>
        <Text>Rebate u/s 87A: {rebate}</Text>
        <Text>Cess (4%) : {cess}</Text>
        <Text>Total Tax Pay (tax - rabate + cess): {totalTaxAfterCess}</Text>
        <Text>Note* ->All tax calculations are excluding Surcharge</Text>
      </ScrollView>


    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
