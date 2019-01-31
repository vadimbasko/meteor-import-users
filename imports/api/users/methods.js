import {Meteor} from 'meteor/meteor';

Meteor.methods({
  getUsers: function () {
    let users = Meteor.users.find({}, {}).fetch()
    for (let user of users) {
      user.email = user.emails[0].address
    }
    return users
  }

});
