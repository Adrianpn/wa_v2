import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Services = new Mongo.Collection('services');

if (Meteor.isServer) {
  Meteor.publish('services', () => {
    return Services.find();
  });
}

Meteor.methods({
      'services.insert'(serviceDate, ministryId) {
        if (!this.userId) {
          throw new Meteor.Error('not-authorized');
        }

        return Services.insert({
          serviceDate,
          userId: this.userId,
          ministryId: ministryId,
          updatedAt: moment().valueOf(),
          serviceSong: []
        });
  },
      'services.remove'(_id) {
        if (!this.userId) {
          throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
          _id: {
            type: String,
            min: 1
          }
        }).validate({ _id });

        Services.remove({ _id, userId: this.userId });
  },
      'services.removeSong'(_id, songItem) {
        if (!this.userId) {
          throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
          _id: {
            type: String,
            min: 1
          }
        }).validate({ _id });


        Services.update({ _id },
        { $pull: { serviceSong:  {songId: songItem}  } });
  },
      'services.update'( _id, songItem ) {
        if (!this.userId) {
          throw new Meteor.Error('not-authorized');
        }

        Services.update({ _id },
          { $push: { serviceSong: { _serviceSongId: new Mongo.ObjectID()._str, songId: songItem, songServiceKey: "A", songServiceSpeed: songItem} } });
  },
      'services.changeSongKey'( _id, _serviceSongId, key ) {
        if (!this.userId) {
          throw new Meteor.Error('not-authorized');
        }

        Services.update({ _id, "serviceSong._serviceSongId": _serviceSongId }, { $set: { "serviceSong.$.songServiceKey" : key } })
  }
});
