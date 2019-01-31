Meteor app exports list of users from private/data/users.csv.
After export users with different roles can access different parts of site.

Installation

* Install meteor as described https://www.meteor.com/install
* Clone app repo 
```
git clone git@github.com:vadimbasko/meteor-import-users.git
```
* Start app
```
cd meteor-import-users
meteor npm install
meteor
```

Users will be imported on server startup from private/data/users.csv

After server started you can login to app via imported user at http://localhost:3000/login

Credentials 
* for admin role - login: 'bilbo@example.com' password: 'unsecure'
* for user role - login 'sam@example.com' password: 'unsecure'
Or any other user from users.csv.

After login for 'user' role available pages are
* http://localhost:3000/profile

For 'admin' role available pages are
* http://localhost:3000/profile
* http://localhost:3000/admin/users

Also you can logout by navigation at http://localhost:3000/logout 
