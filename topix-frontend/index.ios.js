import React, {Component} from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  NavigatorIOS,
  ListView,
  Alert,
  AsyncStorage
} from 'react-native'

// This is the root view
var Topix = React.createClass({
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Messages,
          title: "Topix"
        }}
        style={{flex: 1}}
      />
    );
  }
});

var Messages = React.createClass({
  getInitialState: function(messages) {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var state = { dataSource: ds.cloneWithRows([]) }
    //HELP WHAT DO I FETCH HERE? HOW DO I FETCH THE STUFF FROM THE SERVER?
    // fetch('https://hohoho-backend.herokuapp.com/messages', {
    fetch('http://localhost:3000/getMessage', {
        method: 'GET',
        headers: {
           "Content-Type": "application/json"
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
            this.setState({
               dataSource: ds.cloneWithRows(responseJson)
            });
      })
      .catch((err) => {
        console.error(err)
      });
    return state;
  },
  render() {
    return <View style={styles.containerFull}>
      <ListView
      dataSource={this.state.dataSource}
      renderRow={ (aMessage) => {
        console.log(aMessage)
        return <View style={styles.containerMessage}>
       <Text>From: {aMessage.from}</Text>
        <Text>Text: {aMessage.text} 
            Timestamp: {aMessage.timestamp}
        </Text>
       </View>}
      }
      />
    </View>
  }
})



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  containerFull: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    margin: 10,
    padding: 10
  },
  containerMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    padding: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textBig: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    alignSelf: 'stretch', 
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  },
  buttonRed: {
    backgroundColor: '#FF585B', 
  },
  buttonBlue: {
    backgroundColor: '#0074D9',
  },
  buttonGreen: {
    backgroundColor: '#2ECC40'
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  },
  user: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

AppRegistry.registerComponent('Topix', () => Topix );