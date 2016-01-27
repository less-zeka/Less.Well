var randomThanks = ["Has scho notiert!", "Merci gau!", "Merci gäu!", "Super sach.",
    "Fröie mi scho mau ds probiere :-)", "Cool!", "Si dr einigi dankbar!"];

function getRandomThanks() {
    return randomThanks[Math.floor(Math.random() * randomThanks.length)];

}
$(function () {
    $(".nav li a").unbind("click");
    $(".nav li a").click(function (e) {
        $(".nav").find(".active").removeClass("active");
        $(this).parent().addClass("active");
    });

});

