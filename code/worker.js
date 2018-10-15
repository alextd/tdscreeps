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
			{
				creep.memory.job = "fill";
				
				var targets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_EXTENSION ||
							structure.structureType == STRUCTURE_SPAWN ||
							structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
						}
					});
				if(targets.length > 0)
					creep.memory.fillid = targets[0].id;
			}
			else if(creep.memory.job == "upgrade")
				creep.memory.job = "upgrading";
			else if(creep.memory.job == "build")
			{
				creep.memory.job = "building";
				
				var sites = creep.room.find(FIND_CONSTRUCTION_SITES);
				if(sites.length)
				{
					creep.memory.siteid = sites[0].id;
				}
			}
	}
	
	//step2
	switch(creep.memory.job)
	{
		case "fill":
			var targetid = creep.memory.fillid ? creep.memory.fillid : creep.memory.homeid;
			var target = Game.getObjectById(targetid);
			
			var result = creep.transfer (target, RESOURCE_ENERGY);
			if(result == ERR_NOT_IN_RANGE)
			{
				creep.moveTo(target, {visualizePathStyle: {stroke: '#ffff80'}});
			}
			else if(result == OK)
			{
				creep.memory.job = "source";
				delete creep.memory.fillid;
			}
			break;
		case "upgrading":
			
			if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
				creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#80ffff'}});
			}
			if (creep.carry.energy == 0)
				creep.memory.job = "upgrade";
			break;
		case "building":
			var target = Game.getObjectById(creep.memory.siteid);
			if(!target)
			{
				var sites = creep.room.find(FIND_CONSTRUCTION_SITES);
				if(sites.length)
				{
					target = sites[0];
					creep.memory.siteid = target.id;
				}
			}
			if(target)
			{
				if(creep.build(target) == ERR_NOT_IN_RANGE)
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