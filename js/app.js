const FSs = {
    "NSW Metro South": {
        HFC: {
            name: "Craig Foster",
            email: "Craig.Foster@visionstream.com.au",
            mobile: "0428 280 035"
        },
        FTTN: {
            name: "Frank Sultana",
            email: "Frank.Sultana@visionstream.com.au",
            mobile: "0428 745 428"
        },
        Default: [{
            name: "Mark Thompson",
            email: "Mark.Thompson@visionstream.com.au",
            mobile: " 0407 660 425"
        }]
    },
    "QLD Metro South": {
        HFC: {
            name: "Ross Camm",
            email: "ross.camm@ventia.com.au",
            mobile: "0447 063 505"
        },
        FTTN: {
            name: "Michael Grundy",
            email: "Michael.Grundy@visionstream.com.au",
            mobile: "0421 380 209"
        },
        Default: [{
            name: "Mick Emblen",
            email: "Michael.Emblen@visionstream.com.au",
            mobile: "0458 410 587"
        }]
    }, "QLD Regional North": {
        Default: [{
            name: "Anthony Bull",
            email: "Anthony.Bull@visionstream.com.au",
            mobile: "0417 767 930",
            orders: "NetA"
        }, {
            name: "Gray Vogel",
            email: "0488 413 872",
            mobile: "gary.vogel@visionstream.com.au",
            orders: "NetO"
        }]
    }, "NSW Regional North": {
        Default: [{
            name: "Billy Fraser",
            email: "billy.fraser@visionstream.com.au",
            mobile: "0437 220 799",
            area: "Central Coast & Inland"
        }, {
            name: "Dion Lindsay",
            email: "dion.lindsay1@visionstream.com.au",
            mobile: "048 608 473",
            area: "Coffs Harbour Region"
        }]
    },
    "VIC": {
        HFC: {
            name: "Christopher Koutkos",
            email: "Christopher.Koutkos@broadspectrum.com",
            mobile: "0447 787 289"
        },
        FTTN: {
            name: "Daniel Morrison",
            email: "Daniel.Morrison@visionstream.com.au",
            mobile: "0419 419 743"
        },
        Default: [{
            name: "Steve Melios",
            email: "Steve.Melios@visionstream.com.au",
            mobile: "0428 957 585"
        }]
    },
    "TAS": {
        Default: [{
            name: "Justin Roberts",
            email: "Justin.Roberts@visionstream.com.au",
            mobile: "0408 975 122"
        }]
    }

}
const results = function (FS, record) {
    $('#results').append(`<div class="card flex-grow-1  m-4"><div class="card-header text-center "><h4>${record.Region}</h4></div><div class="card-body">
<ul class="list-unstyled"><li><strong>Suburb: </strong>${record.Name} ${FS}</ul></div></div>`)
}
// console.log(location);
$.get('FSA.json').then(data => {
    $('#FSAForm').submit((e) => {
        e.preventDefault();
        $('#results').empty();
        if (!$('#FSA').val()) {
            return $('#results').append('<h2 class="text-danger text-center w-100 pt-3">Please enter an FSA to search</h2>')
        }

        for (let record of data) {
            if (record.FSA.toLowerCase().indexOf($('#FSA').val().toLowerCase()) !== -1) {
                let FS = '';
                for (let key in FSs) {
                    if (record.Region.includes(key)) {
                        if (FSs[key][$('#technology').val()] && $('#technology').val() !== 'Default') {
                            // console.log(FSs[key][$('#technology').val()]);
                            for (item in FSs[key][$('#technology').val()]) {
                                console.log(item);
                                if (item === "email") {
                                    FS += `<li><strong>${"FS " + item} : </strong><a href=mailto:${FSs[key][$('#technology').val()][item]}>${FSs[key][$('#technology').val()][item]}</a></li>`
                                    continue;
                                }
                                FS += `<li><strong>${"FS " + item} : </strong>${FSs[key][$('#technology').val()][item]}</li>`
                            }
                            results(FS, record)
                        }
                        else {
                            // console.log(FSs[key]["Default"]);
                            for (let i in FSs[key]["Default"]) {

                                for (item in FSs[key]["Default"][i]) {
                                    if (item === "email") {
                                        FS += `<li><strong>${"FS " + item} : </strong><a href=mailto:${FSs[key]["Default"][i][item]}>${FSs[key]["Default"][i][item]}</a></li>`
                                        continue;
                                    }
                                    FS += `<li><strong>${"FS " + item} : </strong>${FSs[key]["Default"][i][item]}</li>`
                                }
                                results(FS, record)
                                FS = ''
                            }

                        }
                        break;
                    }
                }


                return;
            }
        }
        return $('#results').append('<h2 class="text-danger text-center w-100 pt-3">FSA not Found</h2>')
    })
})

