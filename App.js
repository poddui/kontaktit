import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const[contact, setContact] = useState([]);

  const getAll = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if( status === 'granted'){
      const {data} = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers] }
        );
      if(data.length > 0 ) {
        setContact(data);
      }
    }
  }

  const listSeparator = () => {
    return(
      <View
        style={{
          height: 1,
          width: "100%", 
          backgroundColor: "#CED0CE",
        }}
      />
    )
  }

  return (
    <View style={styles.container}>
          <FlatList
            style={styles.wholeList}
            keyExtractor={(item) => String(item.id)}
            renderItem={({item}) => {
              return(
                <View style={styles.list}>
                  <Text style={styles.listText}>{item.name}, {item.phoneNumbers[0]?.number}</Text>
                </View>
              );
            }}
            ItemSeparatorComponent={listSeparator}
            data={contact}
          />
      <Button
        title="Get Contacts"
        onPress={getAll}>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  list: {
    marginTop: 5,
    padding: 30,
  },
  listText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 400,
  },    
  wholeList: {
    marginTop: 25
  },
});

