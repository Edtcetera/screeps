var _ = require('lodash');

/*TASKS BUILDERS SHOULD DO
    1. Build storage for resource dropoff/pickup
    2. Build roads for creeps
    3. Build defences
*/

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
            var sources = creep.room.find(FIND_STRUCTURES, {
	            filter: {structureType: STRUCTURE_CONTAINER}
	        });
	        
	       var storageList = creep.room.find(FIND_STRUCTURES, {
                filter: { structureType: STRUCTURE_STORAGE}
            });
	        

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }else{
                creep.moveTo(42,11);
            }
	    }else if (storageList.length == 0){
	        var harvestNode = creep.room.find(FIND_SOURCES);
	        if (creep.harvest(harvestNode[0]) == ERR_NOT_IN_RANGE){
	            creep.moveTo(harvestNode[0]);
	        }
	    }else {
	        var orderedSources = _.sortByOrder(storageList, function(e){ return e.store[RESOURCE_ENERGY]},['desc']);
            if(creep.withdraw(orderedSources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(orderedSources[0]);
            }else{
                creep.moveTo(42,11);
            }
	    }
	}
};

module.exports = roleBuilder;