import React, { Component } from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import socket from 'socket.io-client';

import styles from './styles';

import { Tweet } from '../../components';

import api from '../../services/api';

export default class Timeline extends Component {
  state = {
    tweets: [],
  };

  async componentDidMount() {
    this.subscribeToEvents();

    const response = await api.get('tweets');

    this.setState({ tweets: response.data });
  };

  subscribeToEvents = () => {
    const io = socket('http://10.0.3.2:3000');

    io.on('tweet', data => {
      this.setState({ tweets: [data, ...this.state.tweets] });
    });
    io.on('like', data => {
      this.setState({ tweets: this.state.tweets.map(tweet => 
        tweet._id === data._id ? data : tweet 
      ) });
    });
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Início',
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('New')}>
        <MIcon style={{ marginRight: 20 }} name='add-circle-outline' size={24} color='#4bb0ee' />
      </TouchableOpacity>
    ),
    headerLeft: (
      <FAIcon style={{ marginLeft: 20 }} name='twitter' size={24} color='#4bb0ee' />
    ),
  });

  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          data={this.state.tweets}
          keyExtractor={tweet => tweet._id}
          renderItem={({ item }) => <Tweet tweet={item} />}
        />
      </View>
    );
  }
}
