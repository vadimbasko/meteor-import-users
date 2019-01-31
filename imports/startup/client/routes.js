Router.route('/login', function () {

  let user = Meteor.user()
  console.log(`router - login: user is `, user)

  if (user) {

    if (Roles.userIsInRole(user, ['admin'])) {
      this.redirect('/admin/users')
      return
    }

    if (Roles.userIsInRole(user, ['user'])) {
      this.redirect('/profile')
      return
    }
  }

  this.render('login')

})

Router.route('/logout', function () {
  Meteor.logout(() => this.redirect('/login'))
})

Router.route('/admin/users')

Router.route('/profile')

Router.route('/(.*)', function () {
  this.redirect('/login')
})
