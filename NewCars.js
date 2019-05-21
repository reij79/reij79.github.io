(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "MEASURE",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "VEHICLE",
            alias: "Vehicle Type",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "ASGS_2011",
            alias: "Region",
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
            id: "NEWMVSALES",
            alias: "NEWMVSALES",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };

    myConnector.getData = function(table, doneCallback) {

        var tableData = [],
        MEASURE = "",
        VEHICLE = "",
        ASGS_2011 = "",
        TSEST = "",
        FREQUENCY = "",
        TIME_PERIOD = "",
        obs = 0;


        $.getJSON("http://stat.data.abs.gov.au/sdmx-json/data/NEWMVSALES/1+2+3.900+100+200+500.0+1+2+3+4+5+6+7+8.10+20+30.M/all?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2017-07&endPeriod=2017-12", function(resp) {
            var feat = resp.dataSets[0].observations;
    
            // Iterate over the JSON object
            for (var i = 0, len = Object.keys(feat).length; i < len; i++) {
                
                var arrKey = Object.keys(feat)[i].split(':')
			
            MEASURE = resp.structure.dimensions.observation[0].values[arrKey[0]].name;
            VEHICLE = resp.structure.dimensions.observation[1].values[arrKey[1]].name;
            ASGS_2011 = resp.structure.dimensions.observation[2].values[arrKey[2]].name;
            TSEST = resp.structure.dimensions.observation[3].values[arrKey[3]].name;
            FREQUENCY = resp.structure.dimensions.observation[4].values[arrKey[4]].name;
            TIME_PERIOD = resp.structure.dimensions.observation[5].values[arrKey[5]].name;
            obs = feat[Object.keys(feat)[i]][0]; 

                
            tableData.push({
                "MEASURE" : MEASURE,
                "VEHICLE" : VEHICLE,
                "ASGS_2011" : ASGS_2011,
                "TSEST" : TSEST,
                "FREQUENCY" : FREQUENCY,
                "TIME_PERIOD" : TIME_PERIOD,
                "obs" : obs
            });
            
            }
    
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);
})();

$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "USGS Earthquake Feed";
        tableau.submit();
    });
});

