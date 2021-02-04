var MODULE_NAME = "singularLib";

/******************************************************************************
 * Singular Library Functions
 * version: 1.0.1
 * updated: 2020.12.17
 * by: tm
 */

/******************************************************************************
 * functions to read and write sheet data
 *****************************************************************************/
/**
 * Returns the value in the active cell.
 *
 * @return {String} The value of the active cell.
 */
function getActiveValue() {
  // Retrieve and return the information requested by the sidebar.
  var cell = SpreadsheetApp.getActiveSheet().getActiveCell();
  return cell.getValue();
}

/**
 * Replaces the active cell value with the given value.
 *
 * @param {Number} value A reference number to replace with.
 */
function setActiveValue(value) {
  // Use data collected from sidebar to manipulate the sheet.
  var cell = SpreadsheetApp.getActiveSheet().getActiveCell();
  cell.setValue(value);
}

/**
 * replaces the value of specified cell with the given value
 *
 * @param {String} sheetName Name of sheet in spreadsheet.
 * @param {String} cellId Id of cell to modify.
 * @param {String} cellValue value to replace with.
 */
function setCellValue(sheetName, cellId, cellValue) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  sheet.getRange(cellId).setValue(cellValue);
}

/**
 * Returns the value in the active cell.
 *
 * @param {String} sheetName Name of sheet in spreadsheet.
 * @param {String} cellId Id of cell to modify.
 * @return {String} The value of the specified cell.
*/
function getCellValue(sheetName, cellID) {
  //  console.log("getCellValue - sheetName = " + sheetName + "; cellID = " + cellID);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var cellValue = sheet.getRange(cellID).getValue();
  return cellValue;
}

/**
 * Returns the displayed value in the active cell.
 *
 * @param {String} sheetName Name of sheet in spreadsheet.
 * @param {String} cellId Id of cell to modify.
 * @return {String} The value of the specified cell.
*/
function getCellDisplayValue(sheetName, cellID) {
  //  console.log("getCellDisplayValue - sheetName = " + sheetName + "; cellID = " + cellID);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var cellValue = sheet.getRange(cellID).getDisplayValue();
  return cellValue;
}

/**
 * Returns the values of a range of a sheet
 *
 * @param {String} sheetName Name of sheet in spreadsheet.
 * @param {String} dataRange range defined in A1 notation.
 * @return {Array} Array of values of the specified data range.
 */
function getRangeValues(sheetName, dataRange) {
  console.log("getRangeValues - sheetName =", sheetName, "; dataRange =", dataRange);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var data = sheet.getRange(dataRange);
  var values = data.getValues();
  // var nRows = data.getNumRows();
  // var nCols = data.getNumColumns();

  return values;
}

/**
 * Returns the display values of a range of a sheet
 *
 * @param {String} sheetName Name of sheet in spreadsheet.
 * @param {String} dataRange range defined in A1 notation.
 * @return {Array} Array of values of the specified data range.
 */
function getRangeDisplayValues(sheetName, dataRange) {
  console.log("getRangeDisplayValues - sheetName =", sheetName, "; dataRange =", dataRange);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var data = sheet.getRange(dataRange);
  var values = data.getDisplayValues();
  // var nRows = data.getNumRows();
  // var nCols = data.getNumColumns();

  return values;
}

/******************************************************************************
 * Log message to debug sheet
 *****************************************************************************/
/**
 * debug and log handling
 */
var sheetDebugName = "Debug";
function logMessage(msgType, logMessage) {
  var d = new Date();
  var timeStamp = d.toLocaleString();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetDebugName);
  // insert a row after row 2
  sheet.insertRowBefore(2);
  sheet.getRange("B2").setValue(timeStamp);
  sheet.getRange("C2").setValue(msgType);
  sheet.getRange("D2").setValue(logMessage);
  console.log(timeStamp, msgType, logMessage);
}

/******************************************************************************
 * Singular REST API specific functions
 *****************************************************************************/
/******************************************************************************
  * use HTTP call to send data to Singular
  * apiUrl [string]: Shared API URL from your control app
  * payload [JSON]: JSON object containing the payload for Singular
  */

//  var requestOptions = {
//   method: 'GET',
//   redirect: 'follow'
// };

// fetch("https://app.singular.live/apiv1/appinstances/36766/control", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

function singularRestGet(apiUrl) {
  // setup options
  var requestOptions = {
    'method': 'get',
    'redirect': 'follow',
    'headers': {
      'Authorization': 'none'
    }
  };
  
  var response = UrlFetchApp.fetch(apiUrl, requestOptions);
  console.log("singularRestGet - response =", response);
  return response;
}

/******************************************************************************
 * use HTTP call to send data to Singular Control nodes
 * apiUrl [string]: Shared API URL from your control app
 * authorization [string]: base64 encoded credentials
 * payload [JSON]: JSON object containing the payload for Singular
 */
function singularRestPut(apiUrl, authorization, payload) {
  // setup options
  var options = {
    'method': 'put',
    'contentType': 'application/json',
    'muteHttpExceptions': true,
    "headers": {
      "Authorization": authorization
    },
    // Convert the JSON object into a string.
    'payload': JSON.stringify(payload)
  };

  console.log("JSON.stringify(payload): " + JSON.stringify(payload));

  var response = UrlFetchApp.fetch(apiUrl, options);
//  Logger.log("singularRestPut - response =", response);
  console.log("singularRestPut - response =", response);
}

