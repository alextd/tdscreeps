module.exports = function (creep)
{
	switch(creep.memory.job)
	{module.exports = function (creep)
{
    //step1
	switch(creep.memory.job)
	{
		case "source":
		case "upgrade":
			if(creep.carry.energy < creep.carryCapacity)
			{
				var source = Game.getObjectById(creep.memory.jobid);
				if(creep.harvest(source) == ERR_NOT_IN_RANGE)
				{
					creep.moveTo(source);
				}
			    return;
			}
			else if(creep.memory.job == "upgrade")
			    creep.memory.job = "upgrading"
	}
	
	//step2
	switch(creep.memory.job)
	{
		case "source":
			var spawn = Game.getObjectById(creep.memory.homeid);
			
			if(creep.transfer (spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
			{
				creep.moveTo(spawn);
			}
			break;
		case "upgrading":
		    
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            if (creep.carry.energy == 0)
                creep.memory.job = "upgrade";
	}

}
		case "source":
			if(creep.carry.energy < creep.carryCapacity)
			{
				var source = Game.getObjectById(creep.memory.jobid);
				if(creep.harvest(source) == ERR_NOT_IN_RANGE)
				{
					creep.moveTo(source);
				}
			}
			else
			{
				var spawn = Game.getObjectById(creep.memory.homeid);
				if(creep.transferEnergy(spawn) == ERR_NOT_IN_RANGE)
				{
					creep.moveTo(spawn);
				}
			}
	}

}