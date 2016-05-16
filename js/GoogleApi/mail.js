var WorkGadget = WorkGadget || {};
WorkGadget.gApi = WorkGadget.gApi || {};
WorkGadget.gApi.mail = WorkGadget.gApi.mail || {};

WorkGadget.gApi.mail.init = function () {
  WorkGadget.gApi.mail.send = function (tos, subject, body){

    var mail = [
        "From: =?utf-8?B?$dispName?=<$address>",
        "To: $to",
        "Cc: $cc",
        "Bcc: $bcc",
        "Subject: =?utf-8?B?$subject?=",
        "MIME-Version: 1.0",
        "Content-Type: text/plain; charset=UTF-8",
        "Content-Transfer-Encoding: 7bit",
        "",
        "$body"
      ].join("\n").trim();

    var user = WorkGadget.gApi.user;

    mail = mail
      .replace("$dispName", window.btoa(unescape(encodeURIComponent(user.dispName))))
      .replace("$address", user.address)
      .replace("$to", tos.To.replace(/\r?\n/g, ","))
      .replace("$cc", tos.Cc.replace(/\r?\n/g, ",") || "")
      .replace("$bcc", tos.Bcc.replace(/\r?\n/g, ",")  || "")
      .replace("$subject", window.btoa(unescape(encodeURIComponent(subject))))
      .replace("$body", body);

    var request = gapi.client.gmail.users.messages.send({
      'userId': 'me',
      'resource': {
        'raw': window.btoa(unescape(encodeURIComponent(mail))).replace(/\+/g, '-').replace(/\//g, '_')
      }
    });

    request.execute();
  }

  //TODO comment
  WorkGadget.gApi.mail.getMessageIDList = function (query) {

    var d = new $.Deferred()

    var getPageOfMessages = function(request) {
      request.execute(function(resp) {

          if (resp.resultSizeEstimate === 0) return;

          d.resolve(_.map(resp.messages, function(el){
              return el.id;
            })
          );

          var nextPageToken = resp.nextPageToken;

          if (nextPageToken) {
            request = gapi.client.gmail.users.messages.list({
                'userId': "me",
                'pageToken': nextPageToken,
                'q': query
            });
            getPageOfMessages(request);
          }
      });
    };

    var initialRequest = gapi.client.gmail.users.messages.list({
      'userId': "me",
      'q': query,
    });

    getPageOfMessages(initialRequest);

    return d;
  }

  WorkGadget.gApi.mail.getBody =  function(message) {
    function getHTMLPart(arr) {
      for(var x = 0; x <= arr.length; x++)
      {
        if(typeof arr[x].parts === 'undefined')
        {
          if(arr[x].mimeType === 'text/html')
          {
            return arr[x].body.data;
          }
        }
        else
        {
          return getHTMLPart(arr[x].parts);
        }
      }
      return '';
    }
    var encodedBody = '';
    if(typeof message.parts === 'undefined')
    {
      encodedBody = message.body.data;
    }
    else
    {
      encodedBody = getHTMLPart(message.parts);
    }
    encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
    return decodeURIComponent(escape(window.atob(encodedBody)));
  }

  WorkGadget.gApi.mail.getMessage = function (messageId) {

    var d = new $.Deferred()

    var request = gapi.client.gmail.users.messages.get({
      'userId': "me",
      'id': messageId
    });

    request.execute(function(resp){
      d.resolve(resp);
    });

    return d;
  }
}
