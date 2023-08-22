const express = require('express')
const {connection}= require('./db')
const {userRouter} =require('./routes/user')
const {appointmentRoute} =require("./routes/doctorRoutes")
const cors= require('cors');

const app= express()
app.use(cors())
app.use(express.json());

app.use("/register",userRouter)
app.use("/add",appointmentRoute)

app.listen(4000,async()=>{
	try{
		await connection
	}catch(err){
		console.log(err.message)
	}
	console.log('server is running at port 4000')
})