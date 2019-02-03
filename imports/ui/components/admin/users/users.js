import './users.html'

Template.adminUsers.onCreated(() => {
})


Template.adminUsers.helpers({
  users: function () {
      return Meteor.users.find()
  }
})