import './profile.html'

Template.profile.helpers({
  userProfile: function () {
    return Object.assign({email: Meteor.user().emails[0].address}, Meteor.user().profile)
  }
})