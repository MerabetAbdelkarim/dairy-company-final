const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const allRoutes = require('./routes/routes');
const ApiError = require('./utils/apiError');
const globalErrorhandling = require('./middlewares/errormiddleware')

app.use(express.json())
app.use(cors())

app.use('/', allRoutes)

app.all("*", (req, res, next) => {
    next(new ApiError(`Cant find this route : ${req.originalUrl}`, 400))
});

app.use(globalErrorhandling);

const PORT = process.env.PORT || port;

app.listen(PORT, () => {
    console.log('run ...')
})