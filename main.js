var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {
    
    var harvesterCount = 0;
    var upgraderCount = 0;
    var builderCount = 0;
    var spawn = Game.spawns.Spawn1;
    
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
            harvesterCount++;
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
            upgraderCount++;
        }
        if(creep.memory.role == 'builder'){
            roleBuilder.run(creep);
            builderCount++;
        }
    }
    if (harvesterCount < 4 && spawn.canCreateCreep([WORK,CARRY,MOVE]) == OK){
        spawn.createCreep([WORK, CARRY, MOVE], null, {role: 'harvester'});
    }
    
    if (upgraderCount < 5 && spawn.canCreateCreep([WORK,CARRY,MOVE]) == OK){
        spawn.createCreep([WORK, CARRY, MOVE], null, {role: 'upgrader'}); 
    }
    
    if (builderCount < 4 && spawn.canCreateCreep([WORK,CARRY,MOVE]) == OK){
        spawn.createCreep([WORK,CARRY,MOVE], null, {role: 'builder'});
    }
    
}