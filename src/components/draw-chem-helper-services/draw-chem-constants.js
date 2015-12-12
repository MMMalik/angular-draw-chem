(function () {
	"use strict";
	angular.module("mmAngularDrawChem")
		.factory("DrawChemConst", DrawChemConst);
	
	function DrawChemConst() {
		
		var service = {};
		
		// the default bond length
		service.BOND_LENGTH = 20;
		
		// proportion of the bond width to bond length
		// 0.04 corresponds to the ACS settings in ChemDraw, according to
		// https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Chemistry/Structure_drawing
		service.WIDTH_TO_LENGTH = 0.04;
		
		// the default bond width
		service.BOND_WIDTH = parseFloat((service.BOND_LENGTH * service.WIDTH_TO_LENGTH).toFixed(2));
		
		// bond in north direction
		service.BOND_N = [0, -service.BOND_LENGTH];
		// bond in south direction
		service.BOND_S = [0, service.BOND_LENGTH];
		// bond in east direction
		service.BOND_E = [parseFloat((service.BOND_LENGTH * Math.sqrt(3) / 2).toFixed(2)), 0];
		// bond in west direction
		service.BOND_W = [-parseFloat((service.BOND_LENGTH * Math.sqrt(3) / 2).toFixed(2)), 0];
		// bond in north-east direction
		service.BOND_NE = [parseFloat((service.BOND_LENGTH * Math.sqrt(3) / 2).toFixed(2)), -service.BOND_LENGTH / 2];
		// bond in north-west direction
		service.BOND_NW = [-parseFloat((service.BOND_LENGTH * Math.sqrt(3) / 2).toFixed(2)), -service.BOND_LENGTH / 2];
		// bond in south-east direction
		service.BOND_SE = [parseFloat((service.BOND_LENGTH * Math.sqrt(3) / 2).toFixed(2)), service.BOND_LENGTH / 2];
		// bond in south-west direction
		service.BOND_SW = [-parseFloat((service.BOND_LENGTH * Math.sqrt(3) / 2).toFixed(2)), service.BOND_LENGTH / 2];
		
		return service;		
	}		
})();