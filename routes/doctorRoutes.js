const express= require('express')
const {Appointment} = require("../model/doctorModel")

const appointmentRoute= express.Router()



appointmentRoute.post('/appointments', async (req, res) => {
    const { name, imageUrl, specialization, experience, location, date, slots, fee } = req.body;
    try {
        const appointment = new Appointment({
            name,
            imageUrl,
            specialization,
            experience,
            location,
            date,
            slots,
            fee
        });
        await appointment.save();
        res.status(201).json({ message: 'Appointment created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});
appointmentRoute.get("/",async(req,res)=>{

		const user= await Appointment.find()
		res.send(user)
	
	
})

appointmentRoute.get('/appointments', async (req, res) => {
    try {
        let query = Appointment.find();

        // Filter by specialization
        if (req.query.specialization) {
            query = query.where('specialization', req.query.specialization);
        }

        // Sort by date
        if (req.query.sort === 'date') {
            query = query.sort('date');
        }

        // Search by doctor name
        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search, 'i');
            query = query.or([
                { name: searchRegex },
                { specialization: searchRegex }
            ]);
        }

        const appointments = await query.exec();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});

// ... (other routes and server listening code)


module.exports= {appointmentRoute}