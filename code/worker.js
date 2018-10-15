module.exports = function (creep)
{
	//step1
	switch(creep.memory.job)
	{
		case "source":
		case "upgrade":
		case "build":
			if(creep.carry.energy < creep.carryCapacity)
			{
				var source = Game.getObjectById(creep.memory.sourceid);
				if(creep.harvest(source) == ERR_NOT_IN_RANGE)
				{
					creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
				}
				return;
			}
			else if(creep.memory.job == "source")
				creep.memory.job = "fill";
			else if(creep.memory.job == "upgrade")
				creep.memory.job = "upgrading";
			else if(creep.memory.job == "build")
				creep.memory.job = "building";
	}
	
	//step2
	switch(creep.memory.job)
	{
		case "fill":
			var target = findFillTarget(creep)
			
			var result = creep.transfer (target, RESOURCE_ENERGY);
			if(result == ERR_NOT_IN_RANGE)
			{
				creep.moveTo(target, {visualizePathStyle: {stroke: '#ffff80'}});
			}
			if (creep.carry.energy == 0)
				creep.memory.job = "source";
			break;
		case "upgrading":
			
			if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
				creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#80ffff'}});
			}
			if (creep.carry.energy == 0)
				creep.memory.job = "upgrade";
			break;
		case "building":
			var target = findBuildTarget(creep)
			if(target)
			{
				if(creep.build(target) == ERR_NOT_IN_RANGE ||
				creep.repair(target) == ERR_NOT_IN_RANGE)
				{
					creep.moveTo(target, {visualizePathStyle: {stroke: '#80ff80'}});
				}
			}
			else 
				creep.moveTo(Game.flags.Wait);
			if (creep.carry.energy == 0)
				creep.memory.job = "build";
	}

};
function findFillTarget(creep)
{
	var target = Game.getObjectById(creep.memory.targetid);
	if(target && target.energy < target.energyCapacity)
		return target;
	
				
	var targets = creep.room.find(FIND_STRUCTURES, {
		filter: (structure) => {
			return (structure.structureType == STRUCTURE_EXTENSION ||
				structure.structureType == STRUCTURE_SPAWN ||
				structure.structureType == STRUCTURE_TOWER) && 
				structure.energy < structure.energyCapacity;
			}
		});
	if(targets.length)
	{
		creep.memory.targetid = targets[0].id;
		return targets[0];
	}
	
	delete creep.memory.targetid;
	return null;
}

function findBuildTarget(creep)
{
	var target = Game.getObjectById(creep.memory.targetid);
	if (target)
		return target;
	
	var damaged = creep.room.find(FIND_STRUCTURES, {
    filter: object => object.hits < object.hitsMax
	});
	if(damaged.length)
	{
		creep.memory.targetid = damaged[0].id;
		return damaged[0];
	}
	
	var sites = creep.room.find(FIND_CONSTRUCTION_SITES);
	if(sites.length)
	{
		creep.memory.targetid = sites[0].id;
		return sites[0];
	}
	
	delete creep.memory.targetid;
	return null;
}