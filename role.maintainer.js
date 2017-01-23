var _ = require('lodash');

function checkDamagedStructures(structure){
    if (structure.hits < structure.hitsMax){
        return structure;
    }
}

var roleMaintainer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        

	    if(creep.memory.maintaining && creep.carry.energy == 0) {
            creep.memory.maintaining = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.maintaining && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.maintaining = true;
	        creep.say('maintaining');
	    }

	    if(creep.memory.maintaining) {
	        var myTargets = creep.room.find(FIND_MY_STRUCTURES).filter(checkDamagedStructures);
	        var targets = creep.room.find(FIND_STRUCTURES).filter(checkDamagedStructures);
	        
	        var orderedMyTargets = _.sortByOrder(myTargets, function(e){return e.hits/e.hitsMax}, ['asc']); //sort by missing most proportional health
	        var orderedTargets = _.sortByOrder(targets, function(e){ return e.hits/e.hitsMax}, ['asc']); //todo: when target found, keep repairing until full
	        
	        if(myTargets.length){
	            if (creep.repair(orderedMyTargets[0]) == ERR_NOT_IN_RANGE){
	                creep.moveTo(orderedMyTargets[0]);
	            }
	        }else if(targets.length) {
                if(creep.repair(orderedTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(orderedTargets[0]);
                }
            }else{
                creep.say('IDLE');
                console.log('maintainer is idle');
            }
	    }else {
            var sources = creep.room.find(FIND_STRUCTURES, {
	            filter: {structureType: STRUCTURE_CONTAINER}
	        });
	        
	        var storages = creep.room.find(FIND_STRUCTURES, {
	            filter: {structureType: STRUCTURE_STORAGE}
	        });
	        
	        var orderedSources = _.sortByOrder(storages, function(e){ return e.store[RESOURCE_ENERGY]},['desc']);
            if(creep.withdraw(orderedSources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(orderedSources[0]);
            }
	    }
	}
};

module.exports = roleMaintainer;