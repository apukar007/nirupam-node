const User = require("../models/User");

exports.getAll = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      users,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.register = async (req, res) => {

    console.log(req.body);
    const { fullname, username, email, password, role } = req.body;
    try {
        const user = new User({
            fullname,
            username,
            password,
            email,
            role
        });

        // generate token
        //const token = await user.generateAuthToken();
        // add token to user
        //user.tokens = user.tokens.concat({ token });
    
        const result = await user.save();

        res.status(200).json({
            message: "User created!",
            result
        });
    } catch (error) {   
        res.status(400).json({
            message: error.message
        });
    }
};

exports.login = async (req, res) => {

    // get user input
    const { email, password } = req.body;
    try {
        const user = await User.findByCredentials(email, password);

        const token = await user.generateAuthToken();

        // Update existing token
        //user.tokens = user.tokens.concat({ token });
        //await user.save();

        res.status(200).json({
            user,
            token
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

exports.logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token;
        });

        await req.user.save();

        res.status(200).json({
            message: "Logout success!"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.logoutAll = async (req, res) => {
    try {
        req.user.tokens.splice(0, req.user.tokens.length);

        await req.user.save();

        res.status(200).json({
            message: "Logout all success!"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.update = async (req, res) => {
  const { id, name, email, password } = req.body;

  const UpdateUser = await User.findOneAndUpdate(
    { _id: id },
    { name, email, password },
    { new: true }
  );

  res.status(200).json({
    message: "Update User!",
    UpdateUser,
  });

  try {
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  const {id} = req.params;
  try {
    const DeleteUser = await User.findOneAndDelete({ _id: id });

    res.status(200).json({
      message: "Delete User!",
      DeleteUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
