'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.hrledger.cv.AddEmployment} addEmployment
 * @transaction
 */
function onAddEmployment(addEmployment) {

  	if(!addEmployment.profile.employments) addEmployment.profile.employments = [];
    addEmployment.profile.employments.push(addEmployment.employment);
    return getAssetRegistry('org.hrledger.cv.Profile')
        .then(function (assetRegistry) {

            // persist the state of the commodity
            return assetRegistry.update(addEmployment.profile);
        }).then(function() {
            // emit the event
            var notifyCompany = factory.newEvent(namespace, 'NotifyCompany');
            notifyCompany.company = addEmployment.employment.company;
            notifyCompany.oldStatus = oldStatus;
            emit(updateEmploymentEvent);
        });
}


/**
 * Sample transaction
 * @param {org.hrledger.cv.AddEducation} addEducation
 * @transaction
 */
function onAddEducation(addEducation) {
	
  if(!addEducation.profile.educations) addEducation.profile.educations = [];
    addEducation.profile.educations.push(addEducation.education);
    return getAssetRegistry('org.hrledger.cv.Profile')
        .then(function (assetRegistry) {

            // persist the state of the commodity
            return assetRegistry.update(addEducation.profile);
        });
    
}



/**
 * Sample transaction
 * @param {org.hrledger.cv.AddSkill} addSkill
 * @transaction
 */
function onAddSkill(addSkill) {
	
  if(!addSkill.profile.skills) addSkill.profile.skills = [];
    addSkill.profile.skills.push(addSkill.skill);
    return getAssetRegistry('org.hrledger.cv.Profile')
        .then(function (assetRegistry) {

            // persist the state of the commodity
            return assetRegistry.update(addSkill.profile);
        });
    
}



/**
 * Sample transaction
 * @param {org.hrledger.cv.RemoveEmployment} removeEmployment
 * @transaction
 */
function onRemoveEmployment(removeEmployment) {

  	if(!removeEmployment.profile.employments) removeEmployment.profile.employments = [];
  	var i = removeEmployment.profile.employments.indexOf(removeEmployment.employment);
    if(i != -1) {
        removeEmployment.profile.employments.splice(i, 1);
    }
   
    return getAssetRegistry('org.hrledger.cv.Profile')
        .then(function (assetRegistry) {

            // persist the state of the commodity
            return assetRegistry.update(removeEmployment.profile);
        });
    
}


/**
 * Sample transaction
 * @param {org.hrledger.cv.RemoveEducation} removeEducation
 * @transaction
 */
function onRemoveEducation(removeEducation) {
	
  if(!removeEducation.profile.educations) removeEducation.profile.educations = [];
  var i = removeEducation.profile.educations.indexOf(removeEducation.education);
    if(i != -1) {
        removeEducation.profile.educations.splice(i, 1);
    }
   
    return getAssetRegistry('org.hrledger.cv.Profile')
        .then(function (assetRegistry) {

            // persist the state of the commodity
            return assetRegistry.update(removeEducation.profile);
        });
    
}



/**
 * Sample transaction
 * @param {org.hrledger.cv.RemoveSkill} removeSkill
 * @transaction
 */
function onRemoveSkill(removeSkill) {
	
  if(!removeSkill.profile.skills) removeSkill.profile.skills = [];
  var i = removeSkill.profile.skills.indexOf(removeSkill.skill);
    if(i != -1) {
        removeSkill.profile.skills.splice(i, 1);
    }
   
    return getAssetRegistry('org.hrledger.cv.Profile')
        .then(function (assetRegistry) {

            // persist the state of the commodity
            return assetRegistry.update(removeSkill.profile);
        });
    
}





/**
 * Sample transaction
 * @param {org.hrledger.cv.UpdateEmployment} updateEmployment
 * @transaction
 */
function onUpdateEmployment(updateEmployment) {
    
    var namespace = "org.hrledger.cv";
	var factory = getFactory();
    if(updateEmployment.company.instanceOf("org.hrledger.cv.HRAgency") || updateEmployment.company.companyId == updateEmployment.employment.company.companyId)
    {
        var oldStatus = updateEmployment.employment.status;
        
        updateEmployment.employment.validatedBy = updateEmployment.company;
        updateEmployment.employment.status = updateEmployment.employmentStatus

        
        return getAssetRegistry('org.hrledger.cv.Employment')
            .then(function (assetRegistry) {

                // persist the state of the commodity
                return assetRegistry.update(updateEmployment.employment);
        }).then(function() {
            // emit the event
            var updateEmploymentEvent = factory.newEvent(namespace, 'UpdateEmploymentEvent');
            updateEmploymentEvent.employment = updateEmployment.employment;
            updateEmploymentEvent.oldStatus = oldStatus;
            emit(updateEmploymentEvent);
        });
    }
    else
    {
        throw new Error("Wrong type");
    }
    
    
    
}



/*

transaction RateSkill {
  --> Skill skill
  --> Company company
  o Double rate
}

*/

/**
 * Sample transaction
 * @param {org.hrledger.cv.RateSkill} rateSkill
 * @transaction
 */
function onRateSkill(rateSkill) {
    
    var namespace = "org.hrledger.cv";
	var factory = getFactory();
    
    if(rateSkill.skill.grades!=null) rateSkill.skill.grades = [];
    if(rateSkill.skill.companies!=null) rateSkill.skill.companies = []
    rateSkill.skill.grades.push(rateSkill.rate);
    rateSkill.skill.companies.push(rateSkill.company);

    
    return getAssetRegistry('org.hrledger.cv.Skill')
        .then(function (assetRegistry) {

            // persist the state of the commodity
            return assetRegistry.update(rateSkill.skill);
    }).then(function() {
        // emit the event
        var rateSkillEvent = factory.newEvent(namespace, 'RateSkillEvent');
        rateSkillEvent.skill = rateSkill.skill;

        var sum = 0;
        for(var i=0; rateSkill.skill.grades.length > i;i++) sum = rateSkill.skill.grades[i];
        var average = sum / rateSkill.skill.grades.length; 

        rateSkillEvent.average = average;
        
        emit(rateSkillEvent);
    });

    
    
    
}








/**
 * Sample transaction
 * @param {org.hrledger.cv.UpdateEducation} updateEducation
 * @transaction
 */
function onUpdateEducation(updateEducation) {
    
    var namespace = "org.hrledger.cv";
	var factory = getFactory();

    var oldStatus = updateEducation.education.status;

    updateEducation.education.validatedBy = updateEducation.company;
    updateEducation.education.status = updateEducation.educationStatus


    return getAssetRegistry('org.hrledger.cv.Education')
      .then(function (assetRegistry) {

      // persist the state of the commodity
      return assetRegistry.update(updateEducation.education);
    }).then(function() {
      // emit the event
      var updateEducationEvent = factory.newEvent(namespace, 'UpdateEducationEvent');
      updateEducationEvent.education = updateEducation.education;
      updateEducationEvent.oldStatus = oldStatus;
      emit(updateEducationEvent);
    });

}






