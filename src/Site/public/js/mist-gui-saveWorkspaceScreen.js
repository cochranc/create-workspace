var popWsRectWidth = width * .4;
var popWsRectHeight = height * .25;
var popSaveWsGroupX = (width - popWsRectWidth) / 2;
var popSaveWsGroupY = (height - popWsRectHeight) / 2;

var popWsButtonShiftX = popTextShiftX;//((popWsRectWidth / 2) - (2 * popWsButtonWidth)) / 3;
var popWsButtonWidth = ((popWsRectWidth / 2) - (3 * popWsButtonShiftX)) / 2;
var popWsButtonHeight = popWsRectWidth * .06;



var saveWsGroup = new Konva.Group({
  x: popSaveWsGroupX,
  y: popSaveWsGroupY,
  visible: false
});
screenLayer.add(saveWsGroup);

var saveWsRect = new Konva.Rect({
  x: 0,
  y: 0,
  width: popWsRectWidth,
  height: popWsRectHeight,
  fill: popRectColor,
  stroke: 'black',
  strokeWidth: 1
});
saveWsGroup.add(saveWsRect);

var nameWsText = new Konva.Text({
  text: "Name:",
  x: popTextShiftX,
  y: popTextShiftX,
  fill: 'black',
  fontSize: 16,
  fontFamily: globalFont,
});
saveWsGroup.add(nameWsText);

var nameWsRect = new Konva.Rect ({
  x: popTextShiftX + nameTextShift,
  y: popTextShiftX * .85,
  width: popCanvasSide - nameTextShift,
  height: popTextHeight / 1.5,
  fill: 'white',
  stroke: 'black',
  strokeWidth: 1
});
saveWsGroup.add(nameWsRect);

var nameWsEditText = new Konva.Text({
  x: popTextShiftX + (nameTextShift * 1.1),
  y: popTextShiftX,
  text: 'Enter a Name',
  fontSize: 14,
  width: popCanvasSide - nameTextShift,
  height: popTextHeight / 1.5,
  fontFamily: globalFont,
  fill: 'black'
});
saveWsGroup.add(nameWsEditText);
nameWsEditText.setEditable(true);
nameWsEditText.matchingCharacters = /[a-zA-Z0-9\-]/;
nameWsEditText.defaultText = 'Enter a Name';
nameWsEditText.drawMethod = function(){
  screenLayer.draw()
};

var popWsErrorText = new Konva.Text({
  text: '',
  x: popTextShiftX,
  y: nameWsText.height() + (2 * popTextShiftX),
  width: popWsRectWidth - (2 * popTextShiftX),
  fill: errorColor,
  fontFamily: globalFont,
  fontSize: 14
});
saveWsGroup.add(popWsErrorText);

var popWsCancelButtonGroup = new Konva.Group({
  x: (popWsRectWidth / 2) + popWsButtonShiftX,
  y: popWsRectHeight - (popTextHeight * 1.25),
  name: 'cancel'
});
saveWsGroup.add(popWsCancelButtonGroup);

var popWsCancelButton = new Konva.Rect ({
  x: 0,
  y: 0,
  width: popWsButtonWidth,
  height: popWsButtonHeight,
  fill: popButtonColor,
  stroke: 'black',
  strokeWidth: 1,
  shadowColor: 'black',
  shadowEnabled: false
});
popWsCancelButtonGroup.add(popWsCancelButton);

var popWsCancelButtonText = new Konva.Text({
  text: "Cancel",
  x: 0,
  y: (popWsButtonHeight - 16) / 2,
  width: popWsButtonWidth,
  fill: 'black',
  fontSize: 16,
  fontFamily: globalFont,
  align: 'center'
});
popWsCancelButtonGroup.add(popWsCancelButtonText);

var popSaveWsButtonGroup = new Konva.Group({
  x: (popWsRectWidth / 2) + (2 * popWsButtonShiftX) + popWsButtonWidth,
  y: popWsRectHeight - (popTextHeight * 1.25),
  name: 'save'
});
saveWsGroup.add(popSaveWsButtonGroup);

var popSaveWsButton = new Konva.Rect ({
  x: 0,
  y: 0,
  width: popWsButtonWidth,
  height: popWsButtonHeight,
  fill: popButtonColor,
  stroke: 'black',
  strokeWidth: 1,
  shadowColor: 'black',
  shadowEnabled: false
});
popSaveWsButtonGroup.add(popSaveWsButton);

var popSaveWsButtonText = new Konva.Text({
  text: "Save",
  x: 0,
  y: (popWsButtonHeight - 16) / 2,
  width: popWsButtonWidth,
  fill: 'black',
  fontSize: 16,
  fontFamily: globalFont,
  align: 'center'
});
popSaveWsButtonGroup.add(popSaveWsButtonText);



var popWsYesButtonGroup = new Konva.Group ({
  x: (popWsRectWidth / 2) + popWsButtonShiftX,
  y: popWsRectHeight - (popTextHeight * 1.25),
  name: 'yes',
  visible: false
});
saveWsGroup.add(popWsYesButtonGroup);

popWsYesButtonGroup.add(new Konva.Rect ({
  x: 0,
  y: 0,
  width: popWsButtonWidth,
  height: popWsButtonHeight,
  fill: popButtonColor,
  stroke: 'black',
  strokeWidth: 1,
  shadowColor: 'black',
  shadowEnabled: false
}));

popWsYesButtonGroup.add(new Konva.Text({
  text: "Yes",
  x: 0,
  y: (popWsButtonHeight - 16) / 2,
  width: popWsButtonWidth,
  fill: 'black',
  fontSize: 16,
  fontFamily: globalFont,
  align: 'center'
}));

var popWsNoButtonGroup = new Konva.Group ({
  x: (popWsRectWidth / 2) + (2 * popWsButtonShiftX) + popWsButtonWidth,
  y: popWsRectHeight - (popTextHeight * 1.25),
  name: 'yes',
  visible: false
});
saveWsGroup.add(popWsNoButtonGroup);

popWsNoButtonGroup.add(new Konva.Rect ({
  x: 0,
  y: 0,
  width: popWsButtonWidth,
  height: popWsButtonHeight,
  fill: popButtonColor,
  stroke: 'black',
  strokeWidth: 1,
  shadowColor: 'black',
  shadowEnabled: false
}));

popWsNoButtonGroup.add(new Konva.Text({
  text: "No",
  x: 0,
  y: (popWsButtonHeight - 16) / 2,
  width: popWsButtonWidth,
  fill: 'black',
  fontSize: 16,
  fontFamily: globalFont,
  align: 'center'
}));

var attempts = 0;
popSaveWsButtonGroup.on('mouseup', function(){
  var newName = nameWsEditText.attrs.text;
  var response = wsExists(newName);
  if (response == 'true') {
    popWsErrorText.setAttr('text', '\'' + newName  + '\' is already a workspace.\n' +
      'Do you want to continue anyways?');
    popWsYesButtonGroup.setAttr('visible', true);
    popWsNoButtonGroup.setAttr('visible', true);
    popSaveWsButtonGroup.setAttr('visible', false);
    popWsCancelButtonGroup.setAttr('visible', false);
    nameWsEditText.setEditable(false);
  } // if user already has a workspace with newName
  else if (response == 'logged out') {
    popWsErrorText.setAttr('To save a workspace, please log in or sign up.');
  } // if user is not logged in
  else {
    saveWorkspace(newName, true);
    currentWorkspace = newName;
    cover.setAttr('visible', false);
    saveWsGroup.setAttr('visible', false);
    showThumbnails();
  } // else a valid workspace name
  screenLayer.draw();
});

popWsYesButtonGroup.on('mouseup', function(){
  var newName = nameWsEditText.attrs.text;
  saveWorkspace(newName, true);
  currentWorkspace = newName;
  popWsYesButtonGroup.setAttr('visible', false);
  popWsNoButtonGroup.setAttr('visible', false);
  popSaveWsButtonGroup.setAttr('visible', true);
  popWsCancelButtonGroup.setAttr('visible', true);
  nameWsEditText.setEditable(true);
  popWsErrorText.setAttr('text', '');
  cover.setAttr('visible', false);
  saveWsGroup.setAttr('visible', false);
  showThumbnails();
  screenLayer.draw();
});

popWsNoButtonGroup.on('mouseup', function(){
  popWsYesButtonGroup.setAttr('visible', false);
  popWsNoButtonGroup.setAttr('visible', false);
  popSaveWsButtonGroup.setAttr('visible', true);
  popWsCancelButtonGroup.setAttr('visible', true);
  popWsErrorText.setAttr('text', '');
  nameWsEditText.setAttr('text', 'Enter a Name');
  nameWsEditText.setEditable(true);
  screenLayer.draw();
});

popWsCancelButtonGroup.on('mouseup', function(){
  popWsYesButtonGroup.setAttr('visible', false);
  popSaveWsButtonGroup.setAttr('visible', true);
  popWsErrorText.setAttr('text', '');
  cover.setAttr('visible', false);
  saveWsGroup.setAttr('visible', false);
  nameWsEditText.setEditable(true);
  showThumbnails();
  screenLayer.draw();
});

var openSaveWsPopUp = function() {
  hideThumbnails();
  cover.setAttr('visible', true);
  saveWsGroup.setAttr('visible', true);
  if (currentWorkspace) {
    nameWsEditText.setAttr('text', currentWorkspace);
  } // if currentWorkspace exists
  screenLayer.draw();
};