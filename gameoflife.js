function Cell () 
{
	this.alive = false;
	this.neighbours = 0;
}
 
function Grid (dimension) 
{
	this.grid = [];
	this.PopulateGrid(dimension);
	this.direction = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
}
 
Grid.prototype.PopulateGrid = function (dimension) 
{
	for (var i = 0; i < dimension; i++)
	{
		var row = [];
		for (var j = 0; j < dimension; j++)
		{
			var newCell = new Cell();
			var randomNum = Math.floor((Math.random() * 10) + 1);
			if (randomNum > 6)
			{
				newCell.alive = true;
			}
			else
			{
				newCell.alive = false;
			}
			row.push(newCell);
		}
		this.grid.push(row);
	}
}
 
Grid.prototype.Show = function () 
{
	console.log("\033[2J");
	for (var i = 0; i < this.grid.length; i++)
	{
		var rowString = "";
		for (var j = 0; j < this.grid[i].length; j++)
		{
			if (this.grid[i][j].alive === true)
			{
				rowString += "0|";
			}
			else
			{
				rowString += " |";
			}
		}
		console.log(rowString);
	}
}
 
 // this is the method run 'per turn'
Grid.prototype.UpdateAllStates = function () 
{
	// checks all neighbour cells of each cell, updates neighbourcount on each cell
	this.UpdateAllCellNeighbourCounts();
	for (var i = 0; i < this.grid.length; i++)
	{
		for (var j = 0; j < this.grid[i].length; j++)
		{
			// checks neighbourcount on each cell, kills/resurrects cells accordingly
			this.UpdateCellState(i, j);
		}
	}
	this.Show();
}

Grid.prototype.UpdateCellState = function (r, c)
{
	var cell = this.grid[r][c];
 	if (cell.neighbours < 2 || cell.neighbours > 3)
 	{
	 		cell.alive = false;
 	}
 	else if (!cell.alive  && cell.neighbours === 3)
	{
		cell.alive = true;
	}
}

Grid.prototype.UpdateAllCellNeighbourCounts = function () 
{
	for (var i = 0; i < this.grid.length; i++)
	{
		for (var j = 0; j < this.grid[i].length; j++)
		{
			this.grid[i][j].neighbours = this.CheckNeighbourCells(i,j);
		}
	}
}
 
Grid.prototype.CheckNeighbourCells = function (r, c)
{
	var neighbourAliveCount = 0;
	for (var i = 0; i < this.direction.length; i++)
	{
		var cellRow = this.direction[i][0] + r;
		var cellCol = this.direction[i][1] + c;
 
		if (cellRow >= 0 && cellRow < this.grid.length && cellCol >= 0 && cellCol < this.grid.length)
		{
			if (this.grid[cellRow][cellCol].alive === true)
			{
				neighbourAliveCount++;
			}
		}
	}
	return neighbourAliveCount;
}

var game = new Grid(40);
setInterval(function(){
	game.UpdateAllStates();
}, 30);