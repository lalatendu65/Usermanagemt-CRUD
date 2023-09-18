const express = require("express");
const usermodel = require("../model/usermodel");

const Userroute=express.Router()



Userroute.post("/add",async(req,res)=>{
    const { first_name, last_name, designation,email, state, city } = req.body;

    const newuser = new usermodel({
      first_name: first_name,
      last_name: last_name,
      designation: designation,
      email: email,
      state: state,
      city: city
    });

    try{
        await newuser.save()
        res.status(200).json(newuser)

    }catch(error){
        res.status(400)
    }
   



});
Userroute.get("/all",async(req,res)=>{
    try{
        const user=await usermodel.find({})
    res.status(200).json(user)
}catch(error){
    res.status(400).json({message:error.message})
}


})

Userroute.get("/:id",async(req,res)=>{
    const id=req.params.id 
    

    try{
       const edituser= await usermodel.findById(id);
        res.status(201).json(edituser)

    }catch(error){
        res.status(400).json({ message: error.message });
    }
});

Userroute.put("/:id",async(req,res)=>{
  const { first_name, last_name, email, designation, state, city } = req.body;

  try {
    await usermodel.updateOne(
      { _id: req.params.id },
      { first_name, last_name, email, designation, state, city }
    );
    res.status(201).json(req.body);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

Userroute.delete("/:id",async(req,res)=>{
    try{
         await usermodel.deleteOne({_id:req.params.id})
         res.status(200).json({message:"user deleted sucessfully"})

    }catch(error){
         res.status(400).json({ message: error.message });
    }
})

module.exports=Userroute