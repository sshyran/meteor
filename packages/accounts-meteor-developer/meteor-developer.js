Accounts.oauth.registerService("meteor-developer");

if (Meteor.isClient) {
  const loginWithMeteorDeveloperAccount = function (options, callback) {
    // support a callback without options
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback =
          Accounts.oauth.credentialRequestCompleteHandler(callback);
    MeteorDeveloperAccounts.requestCredential(options, credentialRequestCompleteCallback);
  };
  Accounts.registerClientLoginFunction('meteor-developer', loginWithMeteorDeveloperAccount);
  Meteor.loginWithMeteorDeveloperAccount = function () {
    return Accounts.applyLoginFunction('meteor-developer', arguments);
  };
} else {
  Accounts.addAutopublishFields({
    // publish all fields including access token, which can legitimately be used
    // from the client (if transmitted over ssl or on localhost).
    forLoggedInUser: ['services.meteor-developer'],
    forOtherUsers: [
      'services.meteor-developer.username',
      'services.meteor-developer.profile',
      'services.meteor-developer.id'
    ]
  });
}
