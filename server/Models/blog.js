const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({

   images:[
    {
      type: String,  
    }
  ],

   title: {
    type: String,
    default: ''
  },

  description: {
    type: String,
    default: ''
  }, 
   
},{timestamps: true});

const blogModel = mongoose.model('blog', blogSchema);
module.exports= blogModel;
