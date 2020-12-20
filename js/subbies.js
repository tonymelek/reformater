let contractors = {};
$('#selected-company').hide()
$('#subbies').submit(e => {
    e.preventDefault();
    $('#results').empty();
    $('#selected-company').hide();
    let companies = contractors[$("#state").val()][$("#technology").val()]
    for (company in companies) {
        $('#results').append(`<div data-company=${company.split(' ').join('_')} class="card company-card m-2"><div class="card-body d-flex justify-content-between"><h3>${company}</h3><h3 class="text-danger">${companies[company].length}</h3 ></div ></div > `)
    }
})
$(document).on('click', '.company-card', function () {
    $('#selected-company').show();
    $('#selected-company').empty();
    $('#selected-company').append(`<div class="card-header text-center"><h3>${$(this).data("company").split('_').join(' ')}</h3></div><div class="card-body d-flex flex-wrap" id="persons"></div>`)
    let persons = contractors[$("#state").val()][$("#technology").val()][$(this).data("company").split('_').join(' ')];

    for (person of persons) {
        let personDetails = ''
        for (key in person) {

            personDetails += `<li><strong>${key} : </strong>${person[key]}`
        }
        console.log(personDetails);
        $('#persons').append(`<div  class="card person m-2 p-2 flex-grow-1"><ul class="list-unstyled">${personDetails}<ul></div>`)

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