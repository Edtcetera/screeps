var _ = require('lodash');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMaintainer = require('role.maintainer');
var roleHauler = require('role.hauler');

var MAX_HARVESTER = 5;
var MAX_UPGRADER = 8;
var MAX_BUILDER = 3;
var MAX_MAINTAINER = 3;

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
    

    if (harvesterCount < MAX_HARVESTER){
        for (var i = 0; i < MAX_HARVESTER; i++){
            spawn.createCreep([WORK, WORK, CARRY, MOVE], 'Harvester ' + (i+1), {role: 'harvester'});   
        }
    }
    else if (upgraderCount < MAX_UPGRADER){
        for (var i = 0; i < MAX_UPGRADER; i++){
            spawn.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], 'Upgrader ' + (i+1), {role: 'upgrader'}); 
        }
    }
    else if (builderCount < MAX_BUILDER){
        for (var i = 0; i < MAX_BUILDER; i++){
            spawn.createCreep([WORK, WORK, CARRY, MOVE], 'Builder ' + (i+1), {role: 'builder'});   
        }
    }
    else if (maintainerCount < MAX_MAINTAINER){
        for (var i = 0; i < MAX_MAINTAINER; i++){
            spawn.createCreep([WORK, CARRY, MOVE, MOVE, MOVE], 'Maintainer ' + (i+1), {role: 'maintainer'});    
        }
    }
}
