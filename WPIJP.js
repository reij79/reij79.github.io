(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "MEASURE",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "INDEX",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "SECTOR",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "INDUSTRY",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "REGION",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "TSEST",
            alias: "Adjustment Type",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "FREQUENCY",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "TIME_PERIOD",
            alias: "Time",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "obs",
            alias: "observation",
            dataType: tableau.dataTypeEnum.float
        }];

        var tableSchema = {
            id: "WPI",
            alias: "Wage Price Index",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };

    myConnector.getData = function(table, doneCallback) {

        

        var url = "http://stat.data.abs.gov.au/sdmx-json/data/LABOUR_PRICE_INDEX/2.THRPEB.1+2+7.-.1.10+20+30.Q/all?detail=Full&dimensionAtObservation=AllDimensions"

        $.ajax({
            url: 'http://stat.data.abs.gov.au/sdmx-json/data/LABOUR_PRICE_INDEX/2.THRPEB.1+2+7.-.1.10+20+30.Q/all?detail=Full&dimensionAtObservation=AllDimensions',
            dataType: 'json',
	    headers: {
    'Access-Control-Allow-Credentials' : true,
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'GET',
    'Access-Control-Allow-Headers':'application/json',
  },
            success: function(resp) {
		    
	    var tableData = [],
        MEASURE = "",
        INDEX = "",
        SECTOR = "",
        INDUSTRY = "",
        REGION = "",
        TSEST = "",
        FREQUENCY = "",
        TIME_PERIOD = "",
        obs = 0;    
		    
		    
            var feat = resp.dataSets[0].observations;
    
            // Iterate over the JSON object
            for (var i = 0, len = Object.keys(feat).length; i < len; i++) {
                
            var arrKey = Object.keys(feat)[i].split(':')
			
            MEASURE = resp.structure.dimensions.observation[0].values[arrKey[0]].name;
            INDEX = resp.structure.dimensions.observation[1].values[arrKey[1]].name;
            SECTOR = resp.structure.dimensions.observation[2].values[arrKey[2]].name;
            INDUSTRY = resp.structure.dimensions.observation[3].values[arrKey[3]].name;
            REGION = resp.structure.dimensions.observation[4].values[arrKey[4]].name;
            TSEST = resp.structure.dimensions.observation[5].values[arrKey[5]].name;
            FREQUENCY = resp.structure.dimensions.observation[6].values[arrKey[6]].name;
            TIME_PERIOD = resp.structure.dimensions.observation[7].values[arrKey[7]].name;
            obs = feat[Object.keys(feat)[i]][0]; 

                
            tableData.push({
                "MEASURE" : MEASURE,
                "INDEX" : INDEX,
                "SECTOR" : SECTOR,
                "INDUSTRY" : INDUSTRY,
                "REGION" : REGION,
                "TSEST" : TSEST,
                "FREQUENCY" : FREQUENCY,
                "TIME_PERIOD" : TIME_PERIOD,
                "obs" : obs
            });
        }

            table.appendRows(tableData);
            doneCallback();
	    },
        });
    };

    tableau.registerConnector(myConnector);
})();

$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Wage Price Index";
        tableau.submit();
    });
});
