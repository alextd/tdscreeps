var worker = require('worker');
var harvester = require('harvester');
var carrier = require('carrier');
var builder = require('builder');
var guard = require('guard');
var healer = require('healer');

Creep.prototype.doRole = function()
{
	switch(this.memory.role)
	{
		case "worker": worker(this); break;
		case "carrier": carrier(this); break;
		case "harvester": harvester(this); break;
		case "builder": builder(this); break;
		case "guard": guard(this); break;
		case "healer": healer(this); break;
	}
}