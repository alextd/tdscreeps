module.exports = function (creep)
{
	switch(creep.memory.job)
	{
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