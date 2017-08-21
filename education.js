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


    //console.log(result);

    var without_education = result.reduce((c, ele) => {

        if ((ele.total == 'Total') && (ele.age == 'All ages'))
            c = c + parseInt(ele.withoutEducation);
        return c;
    }, 0);

    var below_primary = result.reduce((c, ele) => {

        if ((ele.total == 'Total') && (ele.age == 'All ages'))
            c = c + parseInt(ele.belowPrimary);
        return c;
    }, 0);

    var primary = result.reduce((c, ele) => {

        if ((ele.total == 'Total') && (ele.age == 'All ages'))
            c = c + parseInt(ele.primary);
        return c;
    }, 0);

    var middle = result.reduce((c, ele) => {

        if ((ele.total == 'Total') && (ele.age == 'All ages'))
            c = c + parseInt(ele.middle);
        return c;
    }, 0);

    var matric_secondary = result.reduce((c, ele) => {

        if ((ele.total == 'Total') && (ele.age == 'All ages'))
            c = c + parseInt(ele.MatricSecondary);
        return c;
    }, 0);

    var higher_secondary = result.reduce((c, ele) => {

        if ((ele.total == 'Total') && (ele.age == 'All ages'))
            c = c + parseInt(ele.higherSecondary);
        return c;
    }, 0);

    var non_technical_diploma = result.reduce((c, ele) => {

        if ((ele.total == 'Total') && (ele.age == 'All ages'))
            c = c + parseInt(ele.nonTechnicalDiploma);
        return c;
    }, 0);

    var technical_diploma = result.reduce((c, ele) => {

        if ((ele.total == 'Total') && (ele.age == 'All ages'))
            c = c + parseInt(ele.technicalDiploma);
        return c;
    }, 0);

    var graduate_and_above = result.reduce((c, ele) => {

        if ((ele.total == 'Total') && (ele.age == 'All ages'))
            c = c + parseInt(ele.graduateAndAbove);
        return c;
    }, 0);

    var unclassified = result.reduce((c, ele) => {

        if ((ele.total == 'Total') && (ele.age == 'All ages'))
            c = c + parseInt(ele.unclassified);
        return c;
    }, 0);


    //console.log(JSON.stringify(without_education, null, 2));

    var myObj = {
        educationData: []
    };


    myObj.educationData.push({ withoutEducation: without_education });
    myObj.educationData.push({ belowPrimary: below_primary });
    myObj.educationData.push({ primary: primary });
    myObj.educationData.push({ middle: middle });
    myObj.educationData.push({ MatricSecondary: matric_secondary });
    myObj.educationData.push({ HigherSecondary: higher_secondary });
    myObj.educationData.push({ NonTechnicalDiploma: non_technical_diploma });
    myObj.educationData.push({ TechnicalDiploma: technical_diploma });
    myObj.educationData.push({ GraduateAndAbove: graduate_and_above });
    myObj.educationData.push({ Unclassified: unclassified });




    var withoutEducation = JSON.stringify(myObj, null, 2);
    var belowPrimEducation = JSON.stringify(myObj, null, 2);
    var primEducation = JSON.stringify(myObj, null, 2);
    var middleEducation = JSON.stringify(myObj, null, 2);
    var matricEducation = JSON.stringify(myObj, null, 2);
    var higherSecEducation = JSON.stringify(myObj, null, 2);
    var nonTechDipEducation = JSON.stringify(myObj, null, 2);
    var techDiplomaEducation = JSON.stringify(myObj, null, 2);
    var graduateandAboveEdu = JSON.stringify(myObj, null, 2);
    var unclassifiedEducation = JSON.stringify(myObj, null, 2);




    fs.writeFile('educationCateogary.json', withoutEducation);
    fs.writeFile('educationCateogary.json', belowPrimEducation);
    fs.writeFile('educationCateogary.json', primEducation);
    fs.writeFile('educationCateogary.json', middleEducation);
    fs.writeFile('educationCateogary.json', matricEducation);
    fs.writeFile('educationCateogary.json', higherSecEducation);
    fs.writeFile('educationCateogary.json', nonTechDipEducation);
    fs.writeFile('educationCateogary.json', techDiplomaEducation);
    fs.writeFile('educationCateogary.json', graduateandAboveEdu);
    fs.writeFile('educationCateogary.json', unclassifiedEducation);

});