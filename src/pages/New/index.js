import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import styles from './styles';

export default class New extends Component {
  state = {
    newTweet: '',
  };

  static navigationOptions = { header: null };

  goBack = () => {
    this.props.navigation.pop();
  };

  handleNewTweet = async () => {
    const content = this.state.newTweet;
    const author = await AsyncStorage.getItem('@GoTwitter:username');

    await api.post('tweets', { content, author });

    this.goBack();
  };

  handleInputChange = newTweet => {
    this.setState({ newTweet });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.goBack}>
            <MIcon name='close' size={24} color='#4bb0ee' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.handleNewTweet}>
            <Text style={styles.buttonText}>Tweetar</Text>
          </TouchableOpacity>
        </View>
        <TextInput 
          style={styles.input}
          multiline
          placeholder='O que está acontecendo?'
          value={this.state.newTweet}
          onChangeText={this.handleInputChange}
          placeholderTextColor='#999'
          returnKeyType='send'
          onSubmitEditing={this.handleNewTweet}
        />
      </View>
    );
  }
}
