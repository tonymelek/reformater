const FSs = {
    "NSW Metro South": {
        HFC: {
            name: "Craig Foster",
            email: "",
            mobile: ""
        },
        FTTN: {
            name: "Frank Sultana",
            email: "",
            mobile: ""
        },
        Default: [{
            name: "Mark Thompson",
            email: "",
            mobile: ""
        }]
    },
    "QLD Metro South": {
        HFC: {
            name: "Ross Camm",
            email: "",
            mobile: ""
        },
        FTTN: {
            name: "Michael Grundy",
            email: "",
            mobile: ""
        },
        Default: [{
            name: "Mick Emblen",
            email: "",
            mobile: ""
        }]
    }, "QLD Regional North": {
        Default: [{
            name: "Anthony Bull",
            email: "",
            mobile: "",
            orders: "NetA"
        }, {
            name: "Gray Vogel",
            email: "",
            mobile: "",
            orders: "NetO"
        }]
    }, "NSW Regional North": {
        Default: [{
            name: "Billy Fraser",
            email: "",
            mobile: "",
            area: "Central Coast & Inland"
        }, {
            name: "Dion Lindsay",
            email: "",
            mobile: "",
            area: "Coffs Harbour Region"
        }]
    },
    "VIC": {
        HFC: {
            name: "Christopher Koutkos",
            email: "",
            mobile: ""
        },
        FTTN: {
            name: "Daniel Morrison",
            email: "",
            mobile: ""
        },
        Default: [{
            name: "Steve Melios",
            email: "",
            mobile: ""
        }]
    },
    "TAS": {
        Default: [{
            name: "Justin Roberts",
            email: "",
            mobile: ""
        }]
    }

}
const results = function (FS, record) {
    $('#results').append(`<div class="card flex-grow-1  m-4"><div class="card-header text-center "><h4>${record.Region}</h4></div><div class="card-body">
<ul class="list-unstyled"><li><strong>Suburb: </strong>${record.Name} ${FS}</ul></div></div>`)
}
$.get('/FSA.json').then(data => {
    $('form').submit((e) => {
        e.preventDefault();

        $('#results').empty();
        for (let record of data) {
            if (record.FSA.toLowerCase().indexOf($('#FSA').val().toLowerCase()) !== -1) {
                let FS = '';
                for (let key in FSs) {
                    if (record.Region.includes(key)) {
                        if (FSs[key][$('#technology').val()] && $('#technology').val() !== 'Default') {
                            // console.log(FSs[key][$('#technology').val()]);
                            for (item in FSs[key][$('#technology').val()]) {
                                FS += `<li><strong>${"FS " + item} : </strong>${FSs[key][$('#technology').val()][item]}</li>`
                            }
                            results(FS, record)
                        }
                        else {
                            // console.log(FSs[key]["Default"]);
                            for (let i in FSs[key]["Default"]) {

                                for (item in FSs[key]["Default"][i]) {
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

