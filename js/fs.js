const fieldSupervisors = [{
    name: "Craig Foster",
    email: "Craig.Foster@visionstream.com.au",
    mobile: "0428 280 035"
}, {
    name: "Frank Sultana",
    email: "Frank.Sultana@visionstream.com.au",
    mobile: "0428 745 428"
}, {
    name: "Mark Thompson",
    email: "Mark.Thompson@visionstream.com.au",
    mobile: " 0407 660 425"
}, {
    name: "Ross Camm",
    email: "ross.camm@ventia.com.au",
    mobile: "0447 063 505"
}, {
    name: "Michael Grundy",
    email: "Michael.Grundy@visionstream.com.au",
    mobile: "0421 380 209"
}, {
    name: "Mick Emblen",
    email: "Michael.Emblen@visionstream.com.au",
    mobile: "0458 410 587"
}, {
    name: "Anthony Bull",
    email: "Anthony.Bull@visionstream.com.au",
    mobile: "0417 767 930",
}, {
    name: "Gray Vogel",
    email: "0488 413 872",
    mobile: "gary.vogel@visionstream.com.au",
}, {
    name: "Billy Fraser",
    email: "billy.fraser@visionstream.com.au",
    mobile: "0437 220 799",
}, {
    name: "Dion Lindsay",
    email: "dion.lindsay1@visionstream.com.au",
    mobile: "048 608 473",
}, {
    name: "Christopher Koutkos",
    email: "Christopher.Koutkos@broadspectrum.com",
    mobile: "0447 787 289"
}, {
    name: "Daniel Morrison",
    email: "Daniel.Morrison@visionstream.com.au",
    mobile: "0419 419 743"
}, {
    name: "Steve Melios",
    email: "Steve.Melios@visionstream.com.au",
    mobile: "0428 957 585"
}, {
    name: "Justin Roberts",
    email: "Justin.Roberts@visionstream.com.au",
    mobile: "0408 975 122"
}]

$('#FSForm').submit(e => {
    e.preventDefault();
    $('.FS_result').empty();
    const searchText = $('#FS').val();
    let results = fieldSupervisors.filter(FS => FS.name.toLocaleLowerCase().includes(searchText.toLowerCase()))

    for (let result of results) {
        for (let key in result) {
            console.log(key);
            $('.FS_result').append(`<li><strong>${"FS " + key} : </strong>${result[key]}</li>`);
        }
        $('.FS_result').append(`<br>`)
    }


})
