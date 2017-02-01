/*TASKS Haulers SHOULD DO
    1. Haul container energy to SPAWN and EXTENSIONS
*/
var _ = require('lodash');

var roleHauler = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var containerList = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
            filter: { structureType: STRUCTURE_CONTAINER}
        });
        
        var orderedContainerList = _.sortByOrder(containerList, function(e){ return e.store[RESOURCE_ENERGY]},['desc']);
        if (creep.carry.energy == 0 && creep.withdraw(orderedContainerList[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.moveTo(orderedContainerList[0]);
        }else if(Game.spawns['Spawn1'].energy < Game.spawns['Spawn1'].energyCapacity) {
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }else if (Game.spawns['Spawn1'].energy == Game.spawns['Spawn1'].energyCapacity){
            //fill extensions
            var extensions = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_EXTENSION}
            });
            var sortedExtensions = _.sortByOrder(extensions, function(e){ return e.energy}, ['asc']);
            
            if (sortedExtensions[0].energy < sortedExtensions[0].energyCapacity){
                if (creep.transfer(sortedExtensions[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(sortedExtensions[0]);
                } 
            }else if (orderedContainerList[0].store[RESOURCE_ENERGY] != 0){
                 var storageList = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
                        filter: { structureType: STRUCTURE_STORAGE}
                    });
                if (creep.transfer(storageList[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(storageList[0]);
                }
            }else{
                creep.say('idle');
                creep.moveTo(41,8);
            }
        }
    }
}

module.exports = roleHauler;