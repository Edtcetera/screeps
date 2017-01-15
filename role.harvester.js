/*TASKS HARVESTERS SHOULD DO
    1. Harvest nodes
    2. Drop off at storages //todo
*/

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy == 0){
            creep.memory.building = false;
        }
        
        if(!creep.memory.building && creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
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
                if (a.energy < b.energy) return -1;
                if (a.energy > b.energy) return 1;
                return 0;
            });
            if (sortedExtensions[0].energy < sortedExtensions[0].energyCapacity){
                if (creep.transfer(sortedExtensions[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(sortedExtensions[0]);
                } 
            }
            else{
            //build
                creep.memory.building = true;
                var buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(buildTargets.length) {
                    if(creep.build(buildTargets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(buildTargets[0]);
                    }
                }   
            }
        }
    }
};

module.exports = roleHarvester;

JSON.stringify(Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_EXTENSION}
            }).sort(function(a,b){
                if (a.energy < b.energy) return -1;
                if (a.energy > b.energy) return 1;
                return 0;
            }));