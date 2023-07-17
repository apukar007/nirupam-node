const Role = require('../models/Role');

exports.getAll = async (req, res) => {
    try {
        const roles = await Role.find();

        res.status(200).json({
            roles
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

exports.create = async (req, res) => {
    const { name } = req.body;
    try {
        const role = new Role({
            name
        });

        const result = await role.save();

        res.status(200).json({
            message: "Role created!",
            result
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

exports.update = async (req, res) => {
    const { id, name } = req.body;
    try {
        const role = await Role.findById(id);

        if(!role) {
            throw new Error("Role not found!");
        }

        role.name = name;

        const result = await role.save();

        res.status(200).json({
            message: "Role updated!",
            result
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

exports.delete = async (req, res) => {
    const { id } = req.body;
    try {
        const role = await Role.findById(id);

        if(!role) {
            throw new Error("Role not found!");
        }

        const result = await role.remove();

        res.status(200).json({
            message: "Role deleted!",
            result
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}
