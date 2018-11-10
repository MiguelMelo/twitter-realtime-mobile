import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { StackActions, NavigationActions } from 'react-navigation';

import styles from './styles';

export default class Login extends Component {
  state = {
    username: '',
  };

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@GoTwitter:username');

    if (username) this.navigateToTimeline();
  };

  static navigationOptions = { header: null }; 

  handleInputChange = username => {
    this.setState({ username });
  };

  handleLogin = async () => {
    const { username } = this.state;

    if (!username.length) return;

    await AsyncStorage.setItem('@GoTwitter:username', username);

    this.navigateToTimeline();
  };

  navigateToTimeline = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Timeline' })
      ],
    });

    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.content}>
          <View>
            <FAIcon name='twitter' size={64} color='#4bb0ee' />
          </View>
          <TextInput 
            style={styles.input} 
            placeholder='Nome de usuário'
            value={this.state.username}
            onChangeText={this.handleInputChange}
            returnKeyType='send'
            onSubmitEditing={this.handleLogin}
          />
          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
