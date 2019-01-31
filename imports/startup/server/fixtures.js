import {Meteor} from 'meteor/meteor';

Meteor.startup(() => {

  //todo move to file with constants
  Roles.USER = 'user'
  Roles.ADMIN = 'admin'
  Roles.UNKNOWN = 'unknown'

  let data = Assets.getText('data/users.csv')
  if (data.length === 0) {
    console.log(`fixtures - create user: no data in users.csv, skip user import`);
    return
  }

  data.split('\n').forEach(line => {
    let name, role, email
    [name, role, email] = line.toLowerCase().split(';')

    //skip import if email not defined, or if such user already exist
    if (!email || Accounts.findUserByEmail(email)) {
      console.log(`fixtures - skip creating user ${name}: email ${email} already exist`)
      return
    }

    let userId = Accounts.createUser({
      email: email,
      profile: {name: name},
      password: 'unsecure'
    })
    console.log(`fixtures - created user: ${userId} ${name} ${email}`)

    let meteoRole;
    switch (role) {
      case Roles.USER:
        meteoRole = Roles.USER
        break
      case Roles.ADMIN:
        meteoRole = Roles.ADMIN
        break
      default :
        meteoRole = Roles.UNKNOWN
        console.log(`fixtures -roles: unknown role ${role} for user ${userId} ${name}, fallback to ${meteoRole} role`)
    }

    console.log(`fixtures - roles: set role ${meteoRole} to user ${userId} ${name}`)
    Roles.addUsersToRoles(userId, meteoRole)

  })

})