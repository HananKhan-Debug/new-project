const express = require('express')
const { sequelize } = require('./models'); // Import Sequelize connection
const userRouter = require('./routers/userRouter');
const cors = require('cors')
const app = express()

app.use(cors())




app.use(express.json())
app.use("/users",userRouter)
app.use("/:id",userRouter)
app.use("/",userRouter)
app.use("/:id",userRouter)
app.use('/:id', userRouter);


app.get('/', function (req, res) {
  res.send('Hello World')
})





sequelize.sync({ alter: true }) // Sync models with DB
  .then(() => console.log('Database & tables synced'))
  .catch(err => console.error('Error syncing database:', err));


app.listen(4003,()=>{
    console.log('Server is running on port 4003')
})