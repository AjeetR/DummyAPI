const bcrypt = require('bcryptjs');

const pass = 'pass123'
const hash = bcrypt.hash(pass, 8)
.then((hash) => {
console.log('Hash : ',hash)

}).catch(err => {console.log(err)});

// const hash = '$2a$08$JZvaAOHlV44/vD9IAJO62O8zhIlikwGyw1zRzk1t5YxwNRDTtKb9i';
const comparePass = async (hash) => {
    const pass1 = 'pass123'
    try {
        const match = await bcrypt.compare(pass1, hash)
        return match;
    } catch (error) {
        return error
    }
}

comparePass(hash).then(match => {console.log('Match ', match)}).catch(err=>{console.log(err)})