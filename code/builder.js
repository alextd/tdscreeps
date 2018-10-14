module.exports = function (creep)
{
	if(creep.carry.energy == 0)
	{
		if(Game.spawns.Spawn1.transfer(creep) == ERR_NOT_IN_RANGE)
		{
			creep.moveTo(Game.spawns.Spawn1);
		}
	}
	else
	{
		var sites = creep.room.find(FIND_CONSTRUCTION_SITES);
		if(sites.length)
		{
			if(creep.build(sites[0]) == ERR_NOT_IN_RANGE)
			{
				creep.moveTo(sites[0]);
			}
		}
	}
}