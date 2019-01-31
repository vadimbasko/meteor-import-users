import './login.html'

Template.login.events({

  'submit form': function(event){
    event.preventDefault();
    let email = $('[name=email]').val();
    let password = $('[name=password]').val();

    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        console.log(`Error login ${email}`, err)
        alert(err.reason)
      } else {
        console.log(`login success`, Meteor.user())
        FlowRouter.go('/')
      }
    });
  }

});