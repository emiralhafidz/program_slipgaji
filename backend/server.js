const express = require('express')
const bodyParser = require('body-parser')
const guruRoutes = require('./routes/guruRoutes')
const karirRoutes = require('./routes/karirRoutes')
const detailRoutes = require('./routes/detailRoutes')
const cors = require('cors')
const app = express()
const port = 3000

app.use(bodyParser.json())
// Use CORS middleware
app.use(cors());

app.use("/guru", guruRoutes)
app.use("/karir", karirRoutes)
app.use("/detail", detailRoutes)


// app.get('/', (req, res)=>{
//     res.send({test: "berhasil"})
// })

app.listen(port, ()=>{
    console.log(`server bejalan di http://localhost:${port}`)
})