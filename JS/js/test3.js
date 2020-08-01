export var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {lastName, year };

export function f() {
    console.log('fff');
    console.log(this);
};
