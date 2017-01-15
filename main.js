var _ = require('lodash');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMaintainer = require('role.maintainer');

//test test

module.exports.loop = function () {
    
    //clears memory of unused creep names
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
    
    var harvesterCount = 0;
    var upgraderCount = 0;
    var builderCount = 0;
    var maintainerCount = 0;
    var spawn = Game.spawns.Spawn1;


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
        if (creep.memory.role == 'maintainer'){
            roleMaintainer.run(creep);
            maintainerCount++;
        }
    }
    
    /*
    MOVE - 50
    WORK - 100
    CARRY - 50
    ATTACK - 80
    RANGED_ATTACK - 150
    HEAL - 250
    CLAIM - 600
    TOUGH - 10
    */
    
    if (harvesterCount < 5){
        spawn.createCreep([WORK, WORK, CARRY, MOVE], 'Harvester ' + (harvesterCount+1), {role: 'harvester'});
    }
    
    else if (upgraderCount < 6){
        spawn.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], 'Upgrader ' + (upgraderCount+1), {role: 'upgrader'}); 
    }
    
    else if (builderCount < 5){
        spawn.createCreep([WORK, WORK, CARRY, MOVE], 'Builder ' + (builderCount+1), {role: 'builder'});
    }
    
    else if (maintainerCount < 5){
        spawn.createCreep([WORK, CARRY, MOVE, MOVE, MOVE], 'Maintainer ' + (maintainerCounter+1), {role: 'maintainer'});
    }
}