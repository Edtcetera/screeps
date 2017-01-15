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
	        var targets = creep.room.find(FIND_STRUCTURES).filter(checkDamagedStructures);
            if(targets.length) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else{
                creep.say('IDLE');
                console.log('maintainer is idle');
            }
	    }
	    else {
            var sources = creep.room.find(FIND_STRUCTURES, {
	            filter: {structureType: STRUCTURE_CONTAINER}
	        }).sort(function(a,b){
	            a.store[RESOURCE_ENERGY]-b.store[RESOURCE_ENERGY];
	        });
	        
            if(creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
	    }
	}
};

module.exports = roleMaintainer;