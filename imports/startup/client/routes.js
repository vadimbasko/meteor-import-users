FlowRouter.wait();

Tracker.autorun(() => {
  // wait on roles to intialise so we can check is use is in proper role
  if (Roles.subscription.ready() && !FlowRouter._initialized) {
    FlowRouter.initialize()
  }
});

FlowRouter.route('/login', {

  action: function () {

    let user = Meteor.user()
    console.log(`router - login: user is `, user)

    if (user) {

      if (Roles.userIsInRole(user, ['admin'])) {
        FlowRouter.go('/admin/users')
        return
      }

      if (Roles.userIsInRole(user, ['user'])) {
        FlowRouter.go('/profile')
        return
      }
    }

    BlazeLayout.render('login');
  }

})

FlowRouter.route('/admin/users', {
  action: function() {
    if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
      BlazeLayout.render('adminUsers');
    } else {
      FlowRouter.go('/')
    }
  }
})

FlowRouter.route('/profile', {
  action: function() {
    if (Roles.userIsInRole(Meteor.user(), ['admin', 'user'])) {
      BlazeLayout.render('profile');
    } else {
      FlowRouter.go('/')
    }  }
})

FlowRouter.route('/logout', {
  action: function() {
    Meteor.logout(() => { FlowRouter.go('/login') })
  }
})

FlowRouter.route('/(.*)', {
  action: () => {
    FlowRouter.redirect('/login')
  }
})
