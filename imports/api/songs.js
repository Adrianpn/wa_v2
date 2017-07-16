import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Songs = new Mongo.Collection('songs');

if (Meteor.isServer) {
  Meteor.publish('songs', () => {
    return Songs.find();
  });
}

Meteor.methods({
  'songs.insert'(songName, songArtist) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Songs.insert({
      songName,
      songArtist,
      userId: this.userId,
      updatedAt: moment().valueOf()
    });
  },
  'songs.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Songs.remove({ _id, userId: this.userId });
  },
  'songs.update'(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      songName: {
        type: String,
        optional: true
      },
      songArtist: {
        type: String,
        optional: true
      }
    }).validate({
      _id,
      ...updates
    });

    Songs.update({
      _id,
      userId: this.userId
    }, {
      $set: {
        updatedAt: moment().valueOf(),
        ...updates
      }
    });

  }
});
