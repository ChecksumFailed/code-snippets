var emailScriptHelper = Class.create();
emailScriptHelper.prototype = {
    initialize: function() {},

    varsToHTMLTable: function(variables) {
        if (variables == 'undefined') {
            return;
        }

        var helperOptions = {'useLable': true,'useDisplayValue': true};
        var variableObj = new VariableHelper().getVariables(variables);
        var variableArr = [];
        
        for (var v in variableObj) {
            variableArr.push({'Variable': v,'Value': variableObj[v]}) ;
        }

        return this.ObjArrayToHTMLTable(variableArr);
        
    },
    
    ObjArrayToHTMLTable: function(objArr,cssStyle,isChild) {
        if (typeof objArr === 'undefined') {
            return '';
        }

        try {
            var objKeys = [];
            for (var key in objArr[0]) {
                objKeys.push(key);
            }

            if (objKeys.length == 0) {
                return '';
            }

            var headerColor = gs.getProperty('css.$navpage-header-bg');
            var cssStyle = cssStyle && cssStyle != '' ? cssStyle : 'table.ObjArray {border: 1px solid black;table-layout:auto;word-wrap:break-word;width:" + (isChild ? '100%' : '95%') + "; } table.ObjArray th, table.ObjArray td {border: 1px solid black} table.ObjArray th { background-color: " + headerColor +  ";color:white}   table.ObjArray th, table.ObjArray td { padding:.5em;}';
            var tblString = '<style>' + cssStyle + ' </style>';
            tblString += '<table class="ObjArray' + isChild ? 'Child' ? '' + '"><thead><tr><th>' + objKeys.join("</th><th>") + "</th>" + '</tr></thead><tbody>'; //Build header from object keys
            var rowClass;

            for (var i = 0; i < objArr.length; i++) {
                rowClass = i % 2 == 0 ? "evenRow" : "oddRow";
                tblString += '<tr class="' + rowClass + '">';
                for (var j = 0; j < objKeys.length; j++) {
                    var tdVal = objArr[i][objKeys[j]];
                    tdVal = tdVal.constructor.name == 'Array' ? this.ObjArrayToHTMLTable(tdVal,true) : tdVal;
                    tblString += "<td>" + tdVal.toString() + "</td>";
                }
                tblString += "</tr>";
            }
            tblString += "</tbody></table>";
            return tblString;
        } catch (ex) {
            return "Error: " + ex.message;
        }
    },
    type: 'emailScriptHelper'
};
