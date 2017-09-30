const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.createUser = functions.auth.user().onCreate(event => {
  admin.database().ref('/roles/' + event.data.uid).set('user');
});

exports.deleteUser = functions.auth.user().onDelete(event => {
  admin.database().ref('/roles/' + event.data.uid).remove();
});
