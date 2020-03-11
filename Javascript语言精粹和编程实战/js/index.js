var consoleObj = typeof consoleObj === 'object' ? consoleObj : {};
// log = console.log 
function runCode(e) {
    let code = e.target.value, resStr = "", resDom = domClass('.runtime-result')[0];
    consoleObj = {};
    try {
        new Function(`${code}`)();

        for (let key in consoleObj) {
            resStr += `${consoleObj[key]}\n`
        }
        resDom.textContent = resStr;
    } catch (err) {
        resDom.textContent = err;
    }

}


function trimAll(str) {
    return str.replace(/\s+/g, "");
}

function domClass(cls) {
    return document.querySelectorAll(cls)
}

console.log = function (str) {
    consoleObj[new Date().getTime() + Math.random() * 10] = str;
}