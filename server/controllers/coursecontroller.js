const { recompileSchema } = require("../models/course");
const cloudinary = require('cloudinary')
const courseModel = require('../models/course')



// Configuration
    cloudinary.config({ 
        cloud_name: 'drpixfodx', 
        api_key: '264994132379483', 
        api_secret: 'kYt0irMjw2_-_vhPogUPw8ESCGQ' // Click 'View API Keys' above to copy your API secret
    });


class CourseController {
    static display = async (req, res) => {
    try {
      const data = await courseModel.find();
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  };
  static create = async (req, res) => {
    try {
      //console.log(req.files)
      const { title,description,price,duration } = req.body;
      const file = req.files.image

        const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: 'PnInfosys_slider'
     })
     
      //console.log(file)
      const data = await courseModel.create({
          title,
          description,
          price,
          duration,
          image: {
            public_id: imageUpload.public_id,
            url: imageUpload.secure_url
          }
       });
      res.json(data);
     //console.log(imageUpload)
    } catch (error) {
      console.log(error);
    }
  };
  static view = async (req, res) => {
    try {
      const id = req.params.id;
      const data = await courseModel.findById(id);
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  };
  static update = async (req, res) => {
    try {
      const id = req.params.id;
      //console.log(id)
      const { title, description, price, duration } = req.body;
      const data = await courseModel.findByIdAndUpdate(id,{
        title,
        description,
        price,
        duration
      });
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  };
  static delete = async (req, res) => {
    try {
      const id = req.params.id;
      //console.log(id)
      const { title, description, price, duration } = req.body;
      const data = await courseModel.findByIdAndDelete(id,{
        title,
        description,
        price,
        duration
      });
      res.json({
        msg: "deleted success"
      })
    } catch (error) {
      console.log(error);
    }
  };

}
module.exports = CourseController;

