import './profile.html'

Template.profile.helpers({
  userProfile: function () {
    return Meteor.user().profile
  }
})