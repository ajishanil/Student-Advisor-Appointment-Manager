/**
 * This function is to archive a advisor in the database
 * Param:
 * id, id in advisor table
 * Ouput:
 * success: false or true
 * error: reason, if false
 * data: id in request, if true
*/


// Import the models as db for easily using models
const db = require('../models/Models');

// Set advisor archived(deleted)
setAdvisorArchivedById = async(req, res) =>{

    // Update advisor table
    try{
        await db.Advisor.update(
            {is_del: '1'}, // is_del == 1 means archived
            {where : {id: req.params.id}}, // Auto inncrement index in advisor table 
        )
    }catch(err){
        return res
        .status(400)
        .json({success: false, error: '[update error]: ' + err});
    };
    
    let advisor;
    try{
        advisor = await db.Advisor.findAll({
            where : {id: req.params.id},  // Auto inncrement index in advisor table 
            // Construct return data
            attributes: [
                ['id', 'id'], // Auto inncrement index in advisor table 
                ['is_del',  'arichived'] // Rename the result
            ], 
        })
    }catch(err){
        return res
        .status(400)
        .json({success: false, error: '[get advisor error]' + err});
    };
    
    // If cannot find advisor, that means archiving the advisor not working
    if(advisor.length == 0){
        return res
        .status(400)
        .json({success: false, error: 'id of advisor not found'});
    }
    
    // If finnd the advisor, return status with 200 and success: true, and {id, archived status}
    return res
    .status(200)
    .json({success: true, data: advisor});

}

// Export this function as module for import in another files easily
module.exports = setAdvisorArchivedById;