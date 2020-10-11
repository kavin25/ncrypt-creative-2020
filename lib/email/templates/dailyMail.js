const template = require("./template");
const data = require("../../../data/repos");

const content = () => {
    `
    ${data}
    ${data.forEach(repo => {
        return (`<p>Title: ${repo.name} \n Link: ${repo.url}</p>`)
    })}
    `
}

module.exports = () => {
    template({
        title: "ExunCrypt Daily Mail",
        content: content
    })
}