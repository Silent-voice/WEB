//模块定义 myModule.js
var name = 'Byron';
function printName(){
    console.log(name);
}
function printFullName(firstName){
    console.log(firstName + name);
}


module.exports = {
    name : name,
    printName: printName,
    printFullName: printFullName
};
