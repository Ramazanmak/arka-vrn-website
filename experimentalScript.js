import showdown from "showdown";

const converter = new showdown.Converter()
let text = ''
async function fetchData(){
    const response = fetch('../task.md')
        .then(value => value.text())
        .then(text => {
            const answ = converter.makeHtml(text);
            return answ
        })
    return response;
}

fetchData().then(value => {
    text = value
});

