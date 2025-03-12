const { User, Role } = require('../models'); // Automatically imports from index.js



// GET all users with their roles
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Role, as: 'role' }]
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}


// Create user

exports.Usercreate= async (req, res) => {
    try {
      const { username, email, password, roleId } = req.body;
      const user = await User.create({ username, email, password, roleId });
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }



  // Get single user with their role
  exports.SingleUser=async (req, res) => {
    try {
      const user = await User.findOne({
        where: { id: req.params.id },
        include: [{ model: Role, as: 'role' }]
      });
  
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }



  // Delete user role
 
exports. Deleteuser=async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }


  // Update user role
 

  exports.UpdateUsers = async (req, res) => {
    try {
      const userId = req.params.id;
      let { username, email, roleId } = req.body;
  
      // console.log("Received ID:", userId);
      // console.log("Received Role ID:", roleId);
  
      // Ensure userId is a valid number
      if (!userId || isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
  
      // Ensure roleId is a valid number
      if (roleId && typeof roleId === "object") {
        roleId = roleId.id; // Extract role ID from the object
      }
  
      // Find the user by primary key
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Validate and find role
      if (roleId) {
        const role = await Role.findByPk(roleId);
        if (!role) {
          return res.status(400).json({ error: "Invalid role ID" });
        }
      }
  
      // Update user details
      await user.update({ username, email, roleId });
  
      res.json({ message: "User updated successfully", user });
  
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  
  