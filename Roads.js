    
(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
    var cols = [{
        id: "station_id",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "name",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "road_functional_hierarchy",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "lane_count",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "road_classification_type",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "road_classification_admin",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "lga",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "suburb",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "post_code",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "wgs84_latitude",
        alias: "latitude",
        dataType: tableau.dataTypeEnum.geometry
    }, {
        id: "wgs84_longitude",
        alias: "longitude",
        dataType: tableau.dataTypeEnum.geometry
    }];

    var tableSchema = {
        id: "road_traffic_counts_station_reference",
        alias: "Station Reference",
        columns: cols
    };

    schemaCallback([tableSchema]);
    };


    myConnector.getData = function(table, doneCallback) {
        var url = "https://api.transport.nsw.gov.au/v1/roads/spatial?format=geojson&q=select%20*%20from%20road_traffic_counts_station_reference"

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function(resp) {
            var feat = resp.features,
            tableData = [];

        // Iterate over the JSON object
        for (var i = 0, len = feat.length; i < len; i++) {
            tableData.push({
                "station_id": feat[i].properties.station_id,
                "name": feat[i].properties.name,
                "road_functional_hierarchy": feat[i].properties.road_functional_hierarchy,
                "lane_count": feat[i].properties.lane_count,
                "road_classification_type": feat[i].properties.road_classification_type,
                "road_classification_admin": feat[i].properties.road_classification_admin,
                "lga": feat[i].properties.lga,
                "suburb": feat[i].properties.suburb,
                "post_code": feat[i].properties.post_code,
                "wgs84_latitude": feat[i].properties.wgs84_latitude,
                "wgs84_longitude": feat[i].properties.wgs84_longitude
            });
        }

        table.appendRows(tableData);
        doneCallback();
    },
        beforeSend: setHeader
    });

    function setHeader(xhr) {
        xhr.setRequestHeader('Authorization', 'apikey o10JorpdwvgF9yVK6TZVmLnahdB4UtNz1dO1');
        }

};



    tableau.registerConnector(myConnector);
})();

$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "road_traffic_counts_station_reference";
        tableau.submit();
    });
});