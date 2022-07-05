var data = require('../data/employee_contact.json');
require('dotenv').config()

// var resp  = data.find(i => i.employeeId === 3)

// console.log(resp);
// console.log(data.some(j => j.employeeId == 9));
// var index = data.find(i => i.address.some(j => j.city == 'Bidar'));
// console.log(index)

console.log(process.env.SALT_VALUE)

// var a = data.reduce(function(result,currentObject){
        
//             if(currentObject.address.some(function(el,i){
                
//                     return el.city == "Hubbli";
                
//             })){
//                 return currentObject;
//             }
        
// },[])


// var a = data.reduce(currentValue => {currentValue.employeeId})

// console.log(a);