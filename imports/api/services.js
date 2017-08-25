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
      'services.insert'(serviceDate, serviceSong) {
        if (!this.userId) {
          throw new Meteor.Error('not-authorized');
        }

        return Services.insert({
          serviceDate,
          userId: this.userId,
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
        { $pull: { serviceSong:  songItem  } });
  },
      'services.update'( _id, songItem ) {
        if (!this.userId) {
          throw new Meteor.Error('not-authorized');
        }

        Services.update({ _id },
          { $push: { serviceSong: songItem } });
  }
});
