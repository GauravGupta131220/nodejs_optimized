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
            obj.total = currentline[4];
            obj.age = currentline[5];
            obj.withoutEducation = currentline[16];
            obj.belowPrimary = currentline[19];
            obj.primary = currentline[22];
            obj.middle = currentline[25];
            obj.MatricSecondary = currentline[28];
            obj.higherSecondary = currentline[31];
            obj.nonTechnicalDiploma = currentline[34];
            obj.technicalDiploma = currentline[37];
            obj.graduateAndAbove = currentline[41];
            obj.unclassified = currentline[44];
        }
        result.push(obj);
    }

    var educationData = [];
    var cateogaryArray = ['Educational level - Literate without educational level - Persons', 'Educational level - Below Primary - Persons', 'Educational level - Primary - Persons', 'Educational level - Middle - Persons', 'Educational level - Matric/Secondary - Persons', 'Educational level - Higher secondary/Intermediate/Pre-University/Senior secondary - Persons', 'Educational level - Non-technical diploma or certificate not equal to degree - Persons', 'Educational level - Technical diploma or certificate not equal to degree - Persons', 'Educational level - Graduate & above - Persons', 'Educational level - Unclassified - Persons'];
    var cateogarySum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < cateogaryArray.length; j++) {
            if ((result[i].total == 'Total') && (result[i].age == 'All ages')) {
                if (cateogaryArray[j] == 'Educational level - Literate without educational level - Persons') cateogarySum[j] += parseFloat(result[i].withoutEducation)
                if (cateogaryArray[j] == 'Educational level - Below Primary - Persons') cateogarySum[j] += parseFloat(result[i].belowPrimary)
                if (cateogaryArray[j] == 'Educational level - Primary - Persons') cateogarySum[j] += parseFloat(result[i].primary)
                if (cateogaryArray[j] == 'Educational level - Middle - Persons') cateogarySum[j] += parseFloat(result[i].middle)
                if (cateogaryArray[j] == 'Educational level - Matric/Secondary - Persons') cateogarySum[j] += parseFloat(result[i].MatricSecondary)
                if (cateogaryArray[j] == 'Educational level - Higher secondary/Intermediate/Pre-University/Senior secondary - Persons') cateogarySum[j] += parseFloat(result[i].higherSecondary)
                if (cateogaryArray[j] == 'Educational level - Non-technical diploma or certificate not equal to degree - Persons') cateogarySum[j] += parseFloat(result[i].nonTechnicalDiploma)
                if (cateogaryArray[j] == 'Educational level - Technical diploma or certificate not equal to degree - Persons') cateogarySum[j] += parseFloat(result[i].technicalDiploma)
                if (cateogaryArray[j] == 'Educational level - Graduate & above - Persons') cateogarySum[j] += parseFloat(result[i].graduateAndAbove)
                if (cateogaryArray[j] == 'Educational level - Unclassified - Persons') cateogarySum[j] += parseFloat(result[i].unclassified)
            }
        }
    }
    for (let j = 0; j < cateogaryArray.length; j++) {
        obj = {
            cateogary: cateogaryArray[j],
            cateogarySum: cateogarySum[j]
        }
        educationData.push(obj)
    }
    var outPath = path.join(__dirname, 'educationCateogary.json');
    fs.writeFile(outPath, JSON.stringify(educationData, null, 2), 'utf8',
        function(err) { console.log(err); });
});