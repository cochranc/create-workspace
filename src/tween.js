import gui from './mistgui-globals'

var expandFunctionNodes = function() {
    for (var i = 0; i < gui.funNames.length; i++) {
        var moveFunction = makeMenuTween(menuFunctions[i], menuCornerWidth + 2 * buttonWidth + functMenuXSpacing + i * (functMenuXSpacing + functionTotalSideLength), true)
        moveFunction.play();
    }
};

export default expandFunctionNodes;