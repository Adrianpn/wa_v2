import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Ministries = new Mongo.Collection('ministries');

if (Meteor.isServer) {
  Meteor.publish('ministries', () => {
    return Ministries.find();
  });
}

Meteor.methods({
  'ministries.insert'() {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Ministries.insert({
      ministryName: '',
      ministryGenre: '',
      ministryMembers: this.userId,
      updatedAt: moment().valueOf()
    });
  },
  'ministries.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Ministries.remove({ _id, userId: this.userId });
  },
  'ministries.removeSong'(_id, songItem) {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      new SimpleSchema({
        _id: {
          type: String,
          min: 1
        }
      }).validate({ _id });

      Ministries.update({ _id, userId: this.userId },
      { $pull: { serviceSong:  songItem  } });
  },
  'ministries.update'([name], value) {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      Ministries.update({ ministryMembers: this.userId},
      {
        $set: { [name]:value }

      });
    }
});
