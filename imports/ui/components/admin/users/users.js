import './users.html'

Template.adminUsers.onCreated(() => {
  Meteor.call('getUsers', (error, result) => {
    if (error) {
      alert(error.error);
    } else {
      console.log('call getUsers', result)
      Session.set('users', result)
    }
  });
})


Template.adminUsers.helpers({
  users: function () {
    return Session.get('users')
  }
})