Meteor.publish('allUsers', () => {
    return Meteor.users.find()
})