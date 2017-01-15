var _ = require('lodash');

/*TASKS BUILDERS SHOULD DO
    1. Build storage for resource dropoff/pickup
    2. Build roads for creeps
    3. Build defences
*/

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

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
            }
	    }
	    else {
            var sources = creep.room.find(FIND_STRUCTURES, {
	            filter: {structureType: STRUCTURE_CONTAINER}
	        });
	        var orderedSources = _.sortByOrder(sources, function(e){ return e.store[RESOURCE_ENERGY]},['desc']);
            if(creep.withdraw(orderedSources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(orderedSources[0]);
            }
	    }
	}
};

module.exports = roleBuilder;