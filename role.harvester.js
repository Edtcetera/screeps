/*TASKS HARVESTERS SHOULD DO
    1. Harvest nodes
    2. Drop off at storages //todo
*/

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else if(Game.spawns['Spawn1'].energy < Game.spawns['Spawn1'].energyCapacity) {
            console.log('spawn is not full');
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
        else if (Game.spawns['Spawn1'].energy == Game.spawns['Spawn1'].energyCapacity){
            var buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(buildTargets.length) {
                if(creep.build(buildTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(buildTargets[0]);
                }
            }
        }
    }
};

module.exports = roleHarvester;