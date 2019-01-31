import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

    const data = Assets.getText('data/users.csv').split('\n');

    for (let line of data) {
      let username, role, email
      [username, role, email] = line.split(';')

      if (Meteor.users.find({$or: [{username: 'username'}, {emails: email}]}).count() > 0) {
        console.log `fixtures - skip creating user ${username}: username or email already exist`
      } else {
        console.log `fixtures - creating user: username: ${username} role: ${role} email: ${email}`
        Meteor.users.insert({username: username, emails: [email], profile: {name: username}})
      }
    }

})