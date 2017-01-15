/*TASKS HARVESTERS SHOULD DO
    1. Harvest nodes
    2. Drop off at storages //todo
*/
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var containerList = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
            filter: { structureType: STRUCTURE_CONTAINER}
        });
        
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else if(containerList.length){ //containers exist, dump resource in containers
            var target = creep.pos.findClosestByRange(containerList);//find nearest container
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(target);
            }
        }
        else if(Game.spawns['Spawn1'].energy < Game.spawns['Spawn1'].energyCapacity) {
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
        else if (Game.spawns['Spawn1'].energy == Game.spawns['Spawn1'].energyCapacity){
            //fill extensions
            var extensions = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_EXTENSION}
            });
            var sortedExtensions = extensions.sort(function(a,b){
                a.energy-b.energy;
            });
            if (sortedExtensions[0].energy < sortedExtensions[0].energyCapacity){
                if (creep.transfer(sortedExtensions[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(sortedExtensions[0]);
                } 
            }
        }
    }
};

module.exports = roleHarvester;