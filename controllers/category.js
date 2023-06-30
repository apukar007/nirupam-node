const Category = require('../models/Category');

exports.getAll = async (req, res) => {
        
        try {
            const categories = await Category.find();
    
            res.status(200).json({
                categories
            })
            
        } catch (error) {
    
            res.json({ message: error.message });
        }
    }

exports.create = async (req, res) => {
    const { name } = req.body;

    console.log(name);
    try {
        const category = new Category({
            name
        });
        const result = await category.save();
        res.json({ message: "Create Category!" , result});

    } catch (error) {

        res.json({ message: error.message });
    }
    

    
}
