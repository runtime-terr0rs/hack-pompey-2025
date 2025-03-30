const express = require('express');
const router  = express.Router();

const minLong = -1.098168117322442;
const maxLong = -1.1058605911238388;

const maxLat = 50.813282949416910;
const minLat = 50.810556255296085;

const { readShipData, getRandomFloat, updateShipData} = require('../utilities/dataUtils');
router.use(express.json()); 
let startup = true;

// router.get('/v1/tracker/valUserSearch/:param1/:param2', async (req, res) => {
//     const param1 = req.params.param1;
//     const param2 = req.params.param2;
//     let data = await getUserDataCurrent([param1, param2]);
    
//     switch(data) {
//         case 404:
//             return res.status(404).send("404 User not found");
//         case 451:
//             return res.status(451).send("451 Uavailable for legal reasons");
//         case 500:
//             return res.status(500).send("500 Internal server error");
//     }
    
//     res.json(data);

//     //to do: Change from puppet to axios
    
// });

router.get('/track', (req, res) => {
    console.log('Visited /api/track');
    res.send('Tracking data');
});

router.get('/ship_info', (req, res) => {
    data = readShipData();
    let smallArray = [];

    if (startup == true) {
        for (let i = 0; i <= 2; i++) {
            obj = data.ships[i]
            obj.long = getRandomFloat(minLong, maxLong);
            obj.lat = getRandomFloat(minLat, maxLat);
            obj.bearing = 180;
            
            smallArray.push(obj);   
        }
        startup = false;
    } else {
        for (let i = 0; i <= 2; i++) {
            obj = data.ships[i]
            if (obj.long >= minLong) {
                obj.bearing = 0;
            } else if (obj.long <= maxLong) {
                obj.bearing = 180
            }
            if (obj.bearing == 180) {
                obj.long = obj.long + 0.00002
            } else if ( obj.bearing == 0) {
                obj.long = obj.long - 0.00002
            }
            smallArray.push(obj);   
        }
    }

   updateShipData(data); 
   console.log(smallArray[0])
   res.json({ships: smallArray})
})

module.exports = router;
