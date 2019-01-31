import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

  let data = Assets.getText('data/users.csv')
  if (data.length === 0) {
    console.log(`fixtures - create user: no data in users.csv, skip user import`);
    return
  }

  data.split('\n').forEach(line => {
    let username, role, email
    [username, role, email] = line.toLowerCase().split(';')

    //skip import if username or email not defined, or if such user already exist
    if (!username || !email
      || Meteor.users.find({$or: [{username: username}, {emails: email}]}).count() > 0) {

      console.log(`fixtures - skip creating user ${username}: username or email already exist`)
      return
    }

    let userId = Meteor.users.insert({username: username, emails: [email], profile: {name: username}})
    console.log(`fixtures - created user: id: ${userId} username: ${username} email: ${email}`)

    let meteoRole;
    switch (role) {
      case 'admin':
        meteoRole = 'admin'
        break
      case 'user':
        meteoRole = 'user'
        break
      default :
        meteoRole = 'unknown'
        console.log(`fixtures -roles: unknown role ${role} for user ${username}, fallback to 'unknown' role`)
    }

    console.log(`fixtures - roles: set role ${meteoRole} to user ${username} with id ${userId}`)
    Roles.addUsersToRoles(userId, meteoRole)

  })

})