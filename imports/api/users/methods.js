import {Meteor} from 'meteor/meteor';

Meteor.methods({
  getUsers: function () {
    let user = Meteor.user()
    if (!Roles.userIsInRole(user, ['admin'])) {
      console.warn(`user ${user._id} without admin privelege trying to get user list`)
      return null
    }

    let users = Meteor.users.find({}, {}).fetch()
    for (let user of users) {
      user.email = user.emails[0].address
    }
    return users
  }

});
