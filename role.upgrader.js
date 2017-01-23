/*TASKS UPGRADERS SHOULD DO
    1. Pickup resources from storage //todo
    2. Upgrade Controller
*/
var _ = require('lodash');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvest');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
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

module.exports = roleUpgrader;