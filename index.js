const express = require('express')
const app = express()

app.use(()=>{
    console.log('hello Oll!')
    console.log('hello Oli!')
})

app.listen(3000);