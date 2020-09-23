let t3_module = require('./test3');

function f(){
    console.log(t3_module.name);
    console.log(t3_module.d.name);
    t3_module.name = 'test1';
    t3_module.d.name = 'test1';
}

module.exports = {
    f : f
};