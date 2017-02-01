/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.towerFill');
 * mod.thing == 'a thing'; // true
 */
 
 var roleTowerFill = {
      run: function(creep) {
        var towers = creep.room.find(FIND_MY_STRUCTURES, {
	       filter: {structureType: STRUCTURE_TOWER}
	    });
	        
        if((creep.memory.fill||creep.memory.upgrade) && creep.carry.energy == 0) {
            creep.memory.fill = false;
            creep.memory.upgrade = false;
            creep.say('harvest');
	    }
	    if(!creep.memory.fill && creep.carry.energy == creep.carryCapacity && 
	    !creep.memory.upgrade) {
	        creep.memory.fill = true;
	        creep.memory.upgrade = false;
	        creep.say('fill');
	    }
	    if(creep.memory.fill && creep.carry.energy == creep.carryCapacity &&
	    creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_FULL){
	        creep.memory.upgrade = true;
	        creep.memory.fill = false;
	        creep.say('upgrade');
	    }
	    
	    if (creep.memory.upgrade && !creep.memory.fill){
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
	    }else if (creep.memory.fill && !creep.memory.upgrade){
	        if (creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
	            creep.moveTo(towers[0]);
	        }
	    }else{
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

module.exports = roleTowerFill;