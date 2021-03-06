import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';

import api from '../../services/api';

import styles from './styles';

export default class Tweet extends Component {
  handleLike = async () => {
    const { _id } = this.props.tweet;

    await api.post(`likes/${_id}`);
  };

  render() {
    const { tweet } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.author}>{tweet.author}</Text>
        <Text style={styles.content}>{tweet.content}</Text>
        <TouchableOpacity style={styles.likeButton} onPress={this.handleLike}>
          <IIcon name='ios-heart-empty' size={20} color='#999' />
          <Text style={styles.likeText}>{tweet.likes}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
