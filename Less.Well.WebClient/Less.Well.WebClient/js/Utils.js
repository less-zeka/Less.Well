var randomThanks = ["Has scho notiert!", "Merci gau!", "Merci gäu!", "Super sach.",
    "Fröie mi scho mau ds probiere :-)", "Cool!", "Si dr einigi dankbar!"];

function getRandomThanks() {
    return randomThanks[Math.floor(Math.random() * randomThanks.length)];

}