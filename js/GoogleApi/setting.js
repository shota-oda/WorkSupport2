var WorkGadget = WorkGadget || {};
WorkGadget.gApi = WorkGadget.gApi || {};

(function () {
  'use strict';
  var self = WorkGadget.gApi

  var clientId = '328832966473-0fsrg90kk2tejcdaebnl8fhdm1sr544l.apps.googleusercontent.com';
  var apiKey = 'AIzaSyDy0yhlVkweavvUpPcEHLxgV-9AqHp-lTg';

  var scopes = [
      "https://www.googleapis.com/auth/userinfo.profile"
    , "https://www.googleapis.com/auth/userinfo.email"
    , "https://www.googleapis.com/auth/gmail.compose"     //Manage drafts and send emails
    , "https://www.googleapis.com/auth/gmail.readonly"    //View email message and settings
    , "https://www.googleapis.com/auth/calendar.readonly" //View Calendar
  ];

  self.init = function () {
    gapi.client.setApiKey(apiKey);
    self.checkAuth = function (im,fn) {
      gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: im}, function(result){
          fn((result && !result.error));
      });
    }
  }

  self.status = {
      isAuthorized: false
    , isLibraryReady: false
    , isSubLibraryReady: false
  }

  self.loadSubClients = function () {

    var d_plus = new $.Deferred();
    var d_mail = new $.Deferred();
    var d_cal = new $.Deferred();

    gapi.client.load('plus', 'v1').then(function(){d_plus.resolve()}, function(){d_plus.reject()});
    gapi.client.load('gmail', 'v1').then(function(){d_mail.resolve()}, function(){d_mail.reject()});
    gapi.client.load('calendar', 'v3').then(function(){d_cal.resolve()}, function(){d_cal.reject()});

    return $.when(d_plus, d_mail, d_cal);
  }

})();





