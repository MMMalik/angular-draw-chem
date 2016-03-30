(function () {
	"use strict";
	angular.module("mmAngularDrawChem")
		.factory("DCAtom", DCAtom);

	DCAtom.$inject = ["DrawChemConst"];

	function DCAtom(DrawChemConst) {

		var service = {};

		/**
		* Creates a new Atom.
		* @class
		* @param {Number[]} coords - an array with coordinates of the atom
		* @param {Bond[]} - an array of bonds coming out of the atom
		* @param {String[]} - directions of all bonds coming out or coming in
		*/
		function Atom(coords, bonds, attachedBonds) {
			this.coords = coords;
			this.bonds = bonds;
			this.attachedBonds = attachedBonds || {};
			this.next = "";
			this.selected = false;
			this.label;
			this.calculateNext();
		}

		Atom.prototype.select = function () {
			this.selected = true;
		};

		Atom.prototype.deselect = function () {
			this.selected = false;
		};

		/**
		 * Calculates direction of an opposite bond.
		 * @param {String} direction - direction of a bond
		 */
		Atom.getOppositeDirection = function (direction) {
			switch (direction) {
				case "N":
					return "S";
				case "NE1":
					return "SW1";
				case "NE2":
					return "SW2";
				case "E":
					return "W";
				case "SE1":
					return "NW1";
				case "SE2":
					return "NW2";
				case "S":
					return "N";
				case "SW1":
					return "NE1";
				case "SW2":
					return "NE2";
				case "W":
					return "E";
				case "NW1":
					return "SE1";
				case "NW2":
					return "SE2";
			}
		}

		/**
		 * Adds a bond to the attachedBonds array.
		 * @param {String} bond - direction of a bond
		 */
		Atom.prototype.attachBond = function (type, bond) {
			if (typeof this.attachedBonds[type] === "undefined") {
				this.attachedBonds[type] = [];
			}
			this.attachedBonds[type].push(bond);
		};

		/**
		 * Calculates direction of the bond that should be attached next.
		 */
		Atom.prototype.calculateNext = function () {
			if (this.attachedBonds.length === 1) {
				this.next = checkIfLenOne.call(this);
			} else if (this.attachedBonds.length === 2) {
				this.next = checkIfLenTwo.call(this);
			} else if (this.attachedBonds.length > 2 && this.attachedBonds.length < 12) {
				this.next = check.call(this);
			} else if (this.attachedBonds.length >= 12) {
				this.next = "max";
			} else {
				this.next = "";
			}

			function checkIfLenOne() {
				var str = this.attachedBonds[0].direction;
				switch (str) {
					case "N":
						return "SE1";
					case "NE1":
						return "SE2";
					case "NE2":
						return "S";
					case "E":
						return "SW1";
					case "SE1":
						return "SW2";
					case "SE2":
						return "W";
					case "S":
						return "NW1";
					case "SW1":
						return "NW2";
					case "SW2":
						return "N";
					case "W":
						return "NE1";
					case "NW1":
						return "NE2";
					case "NW2":
						return "E";
				}
			}

			function checkIfLenTwo() {
				if (contains.call(this, "N", "SE1")) {
					return "SW2";
				} else if (contains.call(this, "NE1", "SE2")) {
					return "W";
				} else if (contains.call(this, "NE2", "S")) {
					return "NW1";
				} else if (contains.call(this, "E", "SW1")) {
					return "NW2";
				} else if (contains.call(this, "SE1", "SW2")) {
					return "N";
				} else if (contains.call(this, "SE2", "W")) {
					return "NE1";
				} else if (contains.call(this, "S", "NW1")) {
					return "NE2";
				} else if (contains.call(this, "SW1", "NW2")) {
					return "E";
				} else if (contains.call(this, "SW2", "N")) {
					return "SE1";
				} else if (contains.call(this, "W", "NE1")) {
					return "SE2";
				} else if (contains.call(this, "NW1", "NE2")) {
					return "S";
				} else if (contains.call(this, "NW2", "E")) {
					return "SW1";
				} else {
					check.call(this);
				}

				function contains(d1, d2) {
					return (this.attachedBonds[0].direction === d1 && this.attachedBonds[1].direction === d2) ||
						(this.attachedBonds[0].direction === d2 && this.attachedBonds[1].direction === d1);
				}
			}

			function check() {
				var i, j, bonds = DrawChemConst.BONDS, current, found;
				for(i = 0; i < bonds.length; i += 1) {
					current = bonds[i].direction;
					found = "";
					for (j = 0; j < this.attachedBonds.length; j += 1) {
						if (this.attachedBonds[j].direction === current) {
							found = current;
						}
					}
					if (found === "") {
						return current;
					}
				}
			}
		};

		/**
		 * Sets coordinates of the atom.
		 * @param {Number[]} coords - an array with coordinates of the atom
		 */
		Atom.prototype.setCoords = function (coords) {
			this.coords = coords;
		};

		/**
		 * Gets attached bonds.
		 * @returns {String[]}
		 */
		Atom.prototype.getAttachedBonds = function (type) {
			if (typeof type === "undefined") {
				return this.attachedBonds;
			}
			return this.attachedBonds[type];
		}

		/**
		 * Sets coordinates of a preceding atom.
		 * @param {Number[]} coords - an array with coordinates of the atom
		 */
		Atom.prototype.setPreceding = function (coords) {
			this.preceding = coords;
		};

		/**
		 * Gets coordinates of the atom.
		 * @returns {Number[]|Number}
		 */
		Atom.prototype.getPreceding = function (coord) {
			if (coord === "x") {
				return this.preceding[0];
			} else if (coord === "y") {
				return this.preceding[1];
			} else {
				return this.preceding;
			}
		};

		/**
		 * Gets symbol of the next bond.
		 * @returns {String}
		 */
		Atom.prototype.getNext = function () {
			return this.next;
		}

		/**
		 * Sets Label object.
		 * @param {Label} label - a Label object
		 */
		Atom.prototype.setLabel = function (label) {
			this.label = label;
		}

		/**
		 * Gets Label object.
		 * @returns {Label}
		 */
		Atom.prototype.getLabel = function () {
			return this.label;
		}

		/**
		 * Sets symbol of the next bond.
		 * @param {String} - symbol of the next bond
		 */
		Atom.prototype.setNext = function (symbol) {
			this.next = symbol;
		}

		/**
		 * Gets coordinates of the atom.
		 * @returns {Number[]|Number}
		 */
		Atom.prototype.getCoords = function (coord) {
			if (coord === "x") {
				return this.coords[0];
			} else if (coord === "y") {
				return this.coords[1];
			} else {
				return this.coords;
			}
		};

		/**
		 * Gets an array of all atoms this atom is connected with
		 * @returns {Bond[]|Bond}
		 */
		Atom.prototype.getBonds = function (index) {
			if (arguments.length === 0) {
				return this.bonds;
			} else {
				return this.bonds[index];
			}
		}

		/**
		 * Sets an array of bonds
		 * @param {Bond[]} bonds - array of Bond objects
		 */
		Atom.prototype.setBonds = function (bonds) {
			this.bonds = bonds;
		}

		/**
		 * Adds a new atom to the bonds array.
		 * @param {Atom} atom - a new Atom object to be added
		 */
		Atom.prototype.addBond = function (bond) {
			this.bonds.push(bond);
		}

		/**
		 * Adds new bonds.
		 * @param {Bond[]} bonds - an array of bonds to be added
		 */
		Atom.prototype.addBonds = function (bonds) {
			bonds.forEach(function (bond) {
				this.bonds.push(bond);
			}, this);
		}

		service.Atom = Atom;

		return service;
	}
})();
