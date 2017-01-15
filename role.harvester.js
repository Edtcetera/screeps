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
            if (creep.name == 'Harvester 4'){ //one creep mines the other node, hardcoded TODO
                if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(sources[1]);
                }
            }
            else if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else if(containerList.length){ //containers exist, dump resource in containers
            var target = creep.pos.findClosestByRange(containerList);//find nearest container
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(target);
            }
        }
    }
};

module.exports = roleHarvester;