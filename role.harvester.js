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
            if (creep.name == 'Harvester 3'){ //one creep mines the other node, hardcoded TODO
                if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(sources[1]);
                }
            }else if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }else if(Game.spawns['Spawn1'].energy < Game.spawns['Spawn1'].energyCapacity && isContainerListFull(containerList)) {
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }else if(containerList.length){ //containers exist, dump resource in containers
            var target = creep.pos.findClosestByRange(containerList);//find nearest container
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(target);
            }
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
            }
        }
    }
};

function isContainerListFull(containerList){
    for (var container in containerList){
        if (containerList[container].store[RESOURCE_ENERGY] < containerList[container].storeCapacity){
            return false;
        }
    }
    console.log('containers are full, DEPOSIT in SPAWN');
    return true;
}

module.exports = roleHarvester;