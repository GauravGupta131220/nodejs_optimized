var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, 'India2011.csv');

var myReadStream = fs.readFile(filePath, 'utf8', function(err, data) {
    //console.log(data);
    data = data.split("\n");
    var result = [];
    var headers = data[0].split(",");
    for (var i = 1; i < data.length; i++) {
        var obj = {};
        var currentline = data[i].split(",");
        for (var j = 0; j < headers.length; j++) {
            obj.state = currentline[1];
            obj.total = currentline[4];
            obj.age = currentline[5];
            obj.males = currentline[40];
            obj.females = currentline[41];
        }
        result.push(obj);
    }
    var graduatesData = [];
    var stateArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'];
    var maleGraduates = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var femaleGraduates = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < stateArray.length; j++) {
            if (result[i].total == 'Total') {
                if (result[i].age == 'All ages')
                    if (result[i].state == stateArray[j]) {

                        maleGraduates[j] += parseFloat(result[i].males);
                        femaleGraduates[j] += parseFloat(result[i].females);
                    }
            }
        }
    }
    for (let j = 0; j < stateArray.length; j++) {
        obj = {
            stateCode: stateArray[j],
            Males: maleGraduates[j],
            Females: femaleGraduates[j]
        }
        graduatesData.push(obj)
    }
    var outPath = path.join(__dirname, 'graduates.json');
    fs.writeFile(outPath, JSON.stringify(graduatesData, null, 2), 'utf8',
        function(err) {
            console.log(err);
        });
});