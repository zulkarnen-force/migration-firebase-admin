const fs = require("fs")


function mergeMetaData(obj = {}) {
    const {metadata, ...data} = obj
    let temp = Object.assign(data, metadata)
    return temp
}


function isJsonFormat(jsonFormat) {
    return !(typeof jsonFormat == "object")
}


function saveToJsonFile(filename, data) {
    let filenameFormated = `${filename}${Date.now().toString()}.json`
    isJsonFormat(data) ? fs.writeFileSync(filenameFormated, data) : fs.writeFileSync(`${filenameFormated}`, JSON.stringify(data))
}

function changeKey(o = {}, oldKey, newKey) {
    const newObject = {};
    delete Object.assign(o, o, {[newKey]: o[oldKey] })[oldKey];
    return o
}

module.exports = {mergeMetaData, saveToJsonFile, changeKey}