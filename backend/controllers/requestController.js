const Request = require('../models/Request')

const createRequest = async (req, res) => {
    try {
        const { clientName } = req.body
        const newRequest = await new Request({ clientName })
        await newRequest.save()
        res.status(201).json(newRequest)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getRequests = async (req, res) => {
    try {
        const requests = await Request.find().sort({ createdAt: -1 })
        res.status(200).json(requests)
    } catch (error) {
        res.status(500).json({ message: error.message })
    } 
}

const updateRequestStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body

        const updated = await Request.findByIdAndUpdate(
            id, 
            {status},
            { new: true, runValidators: true }
        )

        if(!updated) {
            return res.status(404).json({ message: 'Request not found' })
        }
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {createRequest, getRequests, updateRequestStatus}