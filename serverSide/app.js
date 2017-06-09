module.exports = function(app)
{
    app.post("/api/calculate", calculateBatterySize);

    var PropertiesReader = require('properties-reader');
    var properties = PropertiesReader('./properties/properties.ini');

    function calculateBatterySize(req,res) {
        var applianceList = req.body;
        var propertiesCount = properties.length;
        var totalWattage=0;
        var tempTotalWattage=0;
        var Wh=0;
        var tempWh=0;
        var calculations={};

        for (i = 0; i < applianceList.length; i++){
            tempTotalWattage=properties.get(applianceList[i].applianceName)*applianceList[i].numOfUnits;
            tempWh=tempTotalWattage*applianceList[i].bckpRequired;
            totalWattage=totalWattage+tempTotalWattage;
            Wh=Wh+tempWh;
        }
        console.log("totalWattage");
        console.log(totalWattage);
        console.log("Wh");
        console.log(Wh);
        calculations.inverterSize=Math.ceil(totalWattage/0.7);
        calculations.BatterySize=Math.ceil(Wh/12);
        res.json(calculations);
    }
};
