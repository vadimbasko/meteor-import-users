import './users.html'

Template.adminUsers.onCreated(function () {
    this.autorun(() => {
        Meteor.subscribe('allUsers')
    })
})


Template.adminUsers.helpers({
  allUsers: function () {
      if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
          return Meteor.users.find()
      }
  }
})