import User from "../model/userModel.js";

export const create = async (req, res) => {
  try {
    const userData = new User(req.body);

    // Body empty ho to

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ msg: "Request body is empty" });
    }

    const savedData = await userData.save();
    res.status(200).json({msg:"User created sucessfully"});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getAll = async (req, res) => {
  try {
    const userData = await User.find();

    if (!userData || userData.length === 0) {
      return res.status(404).json({ msg: "No users found" });
    }

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 
export const getone = async(req,res)=>{
    try {
  const id = req.params.id;
  const userExist =  await User.findById(id);
  if(!userExist){
    return res.status(404).json({msg: "user not found "})
  }
  res.status(200).json(userExist);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const update = async (req, res) => {
  try {
    const id = req.params.id;  

    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });  
    }

    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({msg: "User updated succesfully"}); 

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser =  async(req,res)=>{
    try {
        const id = req.params.id;
        const userExist =  await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg:"user not found"});
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({msg:"user deleted sucessfully"});
        
    } catch (error) {
           res.status(500).json({ error: error.message });
    }
}

