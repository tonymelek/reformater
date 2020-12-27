let contractors = {};
let wors;
let state, technology, workOrderDetails;
$('#selected-company').hide()
$('#subbies').submit(e => {
    e.preventDefault();
    workOrderDetails = null;
    $('#results').empty();
    $('#selected-company').hide();
    state = $("#state").val();
    technology = $("#technology").val()
    let companies = contractors[$("#state").val()][$("#technology").val()]
    for (company in companies) {
        $('#results').append(`<div data-company=${company.split(' ').join('_')} class="card company-card m-2 flex-grow-1"><div class="card-body d-flex justify-content-between"><h3>${company}</h3><h3 class="text-danger">${companies[company].length}</h3 ></div ></div > `)
    }
})
$(document).on('click', '.company-card', function () {
    $('#selected-company').show();
    $('#selected-company').empty();
    $('#selected-company').append(`<div class="card-header text-center"><h3>${$(this).data("company").split('_').join(' ')}</h3></div><div class="card-body d-flex flex-wrap" id="persons"></div>`)

    let persons = contractors[state][technology][$(this).data("company").split('_').join(' ')];
    console.log(persons);
    for (person of persons) {
        let personDetails = ''
        let buttons = ''
        let emailBody, emailSubject;
        if (workOrderDetails) {
            let fault = `Fault Details:${workOrderDetails["Fault Details"]}`
            emailBody = `Hi ,%0D%0A${fault.replaceAll('&', 'and')}%0D%0AEarliest_start_date:${workOrderDetails["Earliest_start_date"]}%0D%0ALatest_end_date:${workOrderDetails["Latest_end_date"]}`
            emailSubject = `${workOrderDetails["wo_name"]} || ${workOrderDetails["Service Area Module"]} || ${workOrderDetails["Technology"]} || ${workOrderDetails["wo_name"]}`
        }
        for (key in person) {
            personDetails += `<li><strong>${key} : </strong>${person[key]}`
            switch (key) {
                case "Email":
                    buttons += `<a class="btn btn-primary" href="mailto:${person[key]}?cc=someoneelse@theirsite.com, another@thatsite.com, me@mysite.com&bcc=lastperson@theirsite.com&subject=${emailSubject}&body=${emailBody}">Send E-mail</a>`
                    break;
                case "Mobile":
                    buttons += `<a class="btn btn-warning" href="mailto:someone@yoursite.com?cc=someoneelse@theirsite.com, another@thatsite.com, me@mysite.com&bcc=lastperson@theirsite.com&subject=Big News&body=Body-goes-here">Send Text</a>`
                    break;
                default:
                    break;
            }
        }

        $('#persons').append(`<div  class="card person m-2 p-2 flex-grow-1"><ul class="list-unstyled">${personDetails}</ul><div class="d-flex justify-content-between position-bottom">${buttons}</div></div>`)
    }
})



$.get('HFC.json').then(subbies => {
    for (subbie of subbies) {
        if (contractors[subbie["State"]]) {

        } else {
            contractors[subbie["State"]] = {}
        }

        if (contractors[subbie["State"]][subbie["Technology"]]) {
        } else {
            contractors[subbie["State"]][subbie["Technology"]] = {}
        }

        if (contractors[subbie["State"]][subbie["Technology"]][subbie["Company"]]) {
            contractors[subbie["State"]][subbie["Technology"]][subbie["Company"]].push({ Name: `${subbie["First Name"]} ${subbie["Last Name"]} `, Mobile: subbie["Mobile"], Email: subbie["e-mail"], Comment: subbie["Comment"] === "" ? "-" : subbie["Comment"], Role: subbie["Role"] })
        } else {
            contractors[subbie["State"]][subbie["Technology"]][subbie["Company"]] = []
            contractors[subbie["State"]][subbie["Technology"]][subbie["Company"]].push({ Name: `${subbie["First Name"]} ${subbie["Last Name"]} `, Mobile: subbie["Mobile"], Email: subbie["e-mail"], Comment: subbie["Comment"] === "" ? "-" : subbie["Comment"], Role: subbie["Role"] })

        }
    }

})
if (!localStorage.getItem("work_orders")) {

    $.ajax({
        url: "http://apex.corp.ventia.com.au/apex/utility/reporting/v4/novus/custom_fields",
        headers: {
            "API_KEY": "638A3D96B918FD4CB3BCC9FFAD1D9884C57BB180BD5C722162058E9F31D88009211C8D3597371C4AD3D02BFAA9ACF8379D5FEF74CF6E303FEDB85AD6B4C3164940297D41ABCC55BCC87BBDD604956559"
        }
    }).then(result => {
        wors = result.items;
        localStorage.setItem("work_orders", "stored")
        for (wor of wors) {
            localStorage.setItem(wor.wo_name, JSON.stringify(wor))
        }
    })
}
let FSA = [];
$.get('FSA.json').then(data => {

    for (item of data) {
        const temp = item.FSA;
        FSA[temp] = item
    }

})

$('#work-order').submit(e => {
    e.preventDefault();
    workOrderDetails = JSON.parse(localStorage.getItem($('#WOR').val()));
    state = FSA[workOrderDetails["Service Area Module"].slice(0, 4)]["Region"].slice(0, 3);
    technology = workOrderDetails["Technology"]
    $('#results').empty();
    $('#selected-company').hide();
    let companies = contractors[state][technology]
    for (company in companies) {
        $('#results').append(`<div data-company=${company.split(' ').join('_')} class="card company-card m-2 flex-grow-1"><div class="card-body d-flex justify-content-between"><h3>${company}</h3><h3 class="text-danger">${companies[company].length}</h3 ></div ></div > `)
    }
})