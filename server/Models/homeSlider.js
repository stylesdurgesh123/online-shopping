const mongoose = require('mongoose');

const HomeSliderSchema = new mongoose.Schema({
  images:[
        {
     type: String,
     required: true
      }
     ],
  
   dateCreated: {
   type: Date,
   default: Date.now,
 }
},{
  timestamps: true
});

const homeSliderModel = mongoose.model('homeSlider', HomeSliderSchema);
module.exports= homeSliderModel;
