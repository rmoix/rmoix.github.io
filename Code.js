//Les posem fora perquè puguin ser accessible a qualsevol funció
var apiUrl = "https://app.singular.live/apiv1/control/0DxCBkQk5tw4DKzzHD5YOc"; //copiada del control app -> manage access
var authorization = "none";

/******************************************************************************/

function onClickSendPlayerDetails() {
  var playerId = getCellValue("playout", "A3");
  var playerFirstname = getCellValue("playout", "B3");
  var playerSecondname = getCellValue("playout", "C3");
  // build payload and animate In subcomp
  var payload = [{
    "compositionName": "PILOT",
    "controlNode": {
      "payload": {
        "id": playerId,
        "firstName": playerFirstname,
        "secondName": playerSecondname
      }
    }
  }];

  singularRestPut(apiUrl, authorization, payload);
}
/***************************************************************************/

function onClickPlayerIn() {
  var payload = [{
    "compositionName": "PILOT",
    "animation": {
      "action": "play",
      "to": "In"
    }
  }];

  singularRestPut(apiUrl, authorization, payload);
}

function onClickPlayerOut() {
  var payload = [{
    "compositionName": "PILOT",
    "animation": {
      "action": "play",
      "to": "Out"
    }
  }];

  singularRestPut(apiUrl, authorization, payload);
}
