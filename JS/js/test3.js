let name = 'test3';
let d = {
    name : 'test3'
};

function printName(){
    console.log(name);
}
function printFullName(firstName){
    console.log(firstName + name);
}
module.exports = {
    name : name,
    d : d,
    printName: printName,
    printFullName: printFullName
};