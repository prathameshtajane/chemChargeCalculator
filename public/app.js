(function () {
    angular
        .module("chemChargeApp", [])
        .controller("IndexController", IndexController);

    function IndexController($http) {
        var vm = this;

        vm.addAppliance=addAppliance;
        vm.removeAppliance=removeAppliance;
        vm.calculateBSize=calculateBSize;
        vm.appliancesList = [];
        requestProceedFlag=false;

        function addAppliance(inputAppliance) {
            if(inputAppliance != undefined){
                if(inputAppliance.numOfUnits != undefined &&
                    inputAppliance.bckpRequired != undefined &&
                    inputAppliance.applianceName != undefined) {
                    var newAppliance = {
                        applianceName: inputAppliance.applianceName,
                        numOfUnits: inputAppliance.numOfUnits,
                        bckpRequired: inputAppliance.bckpRequired
                    };
                    vm.appliancesList.push(newAppliance);
                    requestProceedFlag=true;}else{
                    alert("Please select appliance before adding!");
                }
            }else{
                alert("Please select Appliances,Number of Units,Backup Required before adding!");
            }
        }

        function removeAppliance(inputAppliance){
            var index = vm.appliancesList.indexOf(inputAppliance);
            vm.appliancesList.splice(index, 1);
        }

        function calculateBSize(){
            if(requestProceedFlag && vm.appliancesList.length>0){
                $http.post("/api/calculate", vm.appliancesList)
                    .then(
                        function (result) {
                            console.log("Battery Size : "+result.data.BatterySize);
                            console.log("Inverter Size :"+result.data.inverterSize);
                        },
                        function (err) {
                            console.log("Received error from server");
                            console.log(err);
                        }
                    );
            }else{
                alert("Please press 'Add' button before proceeding with calculations");
            }
        }
    }
})();
