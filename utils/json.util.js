function readToObject(filename) {
    let file = fs.readFileSync(`${filename}.json`, {encoding:"utf-8"})
    return JSON.parse(file)
  }
  