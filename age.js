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
            obj.state = currentline[3];
            obj.total = currentline[4];
            obj.age = currentline[5];
            obj.litterate = currentline[12];
        }
        result.push(obj);
    }

    var ageData = [];
    var ageArray = ['7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80plus'];
    var ageSum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < ageArray.length; j++) {
            if (result[i].total == 'Total') {
                if (result[i].age == ageArray[j])
                    ageSum[j] += parseFloat(result[i].litterate)
            }
        }
    }
    for (let j = 0; j < ageArray.length; j++) {
        obj = {
            age: ageArray[j],
            litterate: ageSum[j]
        }
        ageData.push(obj)
    }
    var outPath = path.join(__dirname, 'age_literate.json');
    fs.writeFile(outPath, JSON.stringify(ageData, null, 2), 'utf8',
        function(err) { console.log(err); });
});