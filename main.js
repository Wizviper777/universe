var increase = 1.3;
var ore = 300;
var metal = 1000;
var oil = 100;
var oilUnlocked = false;
var totalMetal = 500;
var refineryMPS = 1;
var refineryAmount = 0;
var refineryCost = 10;
var mineOreps = 2;
var mineAmount = 1;
var mineCost = 25;
var panelPPS = 1;
var panelAmount = 2;
var panelCost = 15;
var pumpOPS = 1;
var pumpAmount = 0;
var pumpCost = 250;
var rocketCostMetal = 500;
var rocketCostOil = 100;
var rocketAmount = 0;
var power = 2;
var land = 150;
//intervals
setInterval(pay, 100)
setInterval(check, 5000)
//add tabs
document.getElementById('explorationTab').addEventListener('click', function() {
  show('exploration');
});
document.getElementById('spaceTab').addEventListener('click', function() {
  show('space');
});
  //add button building
document.getElementById('refinery').addEventListener('click', function() {
  buy('refinery');
});
document.getElementById('mine').addEventListener('click', function() {
  buy('mine');
});
document.getElementById('solarPanels').addEventListener('click', function() {
  buy('solarPanel');
});
document.getElementById('pump').addEventListener('click', function() {
  buy('pump');
});
document.getElementById('rocket').addEventListener('click', function() {
  buy('rocket');
});
document.getElementById('explore').addEventListener('click', function() {
  explore();
});

function updateStuff() {
  document.getElementById('ore').innerHTML = 'Ore: ' + Math.floor(ore);
  document.getElementById('metal').innerHTML = 'Metal: ' + Math.floor(metal);
  document.getElementById('power').innerHTML = 'Power: ' + Math.floor(power);
  document.getElementById('oil').innerHTML = 'Oil: ' + Math.floor(oil);
  document.getElementById('land').innerHTML = 'Land: ' + Math.floor(land);
  document.getElementById('refinery').innerHTML = 'Refinery: ' + Math.floor(refineryAmount);
  document.getElementById('mine').innerHTML = 'Mine: ' + Math.floor(mineAmount);
  document.getElementById('solarPanels').innerHTML = 'Solar Panels: ' + Math.floor(panelAmount);
  document.getElementById('pump').innerHTML = 'Pumpjack: ' + Math.floor(pumpAmount);
  document.getElementById('rocket').innerHTML = 'Rocket: ' + Math.floor(rocketAmount);
}

function check() {
if(oilUnlocked == false) {
  if (totalMetal >= 500) {
    document.getElementById('oil').style = 'visibility:visible;'
    document.getElementById('pump').style = 'visibility:visible;'
    oilUnlocked = true;
    }
  }

}

function show(scene) {
    if(scene == 'exploration') {
	    document.getElementById('space').style = 'visibility:hidden;'
			document.getElementById('exploration').style = 'visibility:visible;'
      document.getElementById('pump').style = 'visibility:hidden;'
      document.getElementById('explore').style = 'visibility:visible;'
    }
    if(scene == 'space') {
	    document.getElementById('space').style = 'visibility:visible;'
			document.getElementById('exploration').style = 'visibility:hidden;'
      document.getElementById('pump').style = 'visibility:visible;'
      document.getElementById('explore').style = 'visibility:hidden;'
    }
}

function pay() {
  //pay out smaller resources if power is negative
  if (power < 0) {
    ore = ore + ((mineOreps * mineAmount) / 25);
    ore = ore - ((refineryMPS * refineryAmount) / 25);
    if (ore < 0) {
      ore = 0;
    }
    metal = metal + ((refineryMPS * refineryAmount) / 25);
    totalMetal = totalMetal + ((refineryMPS * refineryAmount) / 25);
    power = (panelPPS * panelAmount) - (refineryAmount);
    oil = oil + ((pumpOPS * pumpAmount) / 25);
    updateStuff();
  } else {
    ore = ore + ((mineOreps * mineAmount) / 10);
    ore = ore - ((refineryMPS * refineryAmount) / 10);
    if (ore < 0) {
      ore = 0;
    }
    power = (panelPPS * panelAmount) - (refineryAmount);
    metal = metal + (refineryMPS * refineryAmount) / 10;
    oil = oil + ((pumpOPS * pumpAmount) / 10);
    totalMetal = totalMetal + ((refineryMPS * refineryAmount) / 10);
    updateStuff();
  }
}
function explore() {
lane = land + (rocketAmount * 5);
rocketAmount = 0;


}
function buy(thing) {

  if (thing == 'refinery') {
    if (ore >= refineryCost) {
      ore = ore - refineryCost;
      refineryCost = refineryCost * increase;
      refineryAmount++;
      lane = land-5;
      updateStuff();
    }
  }
  if (thing == 'mine') {
    if (metal >= mineCost) {
      metal = metal - mineCost;
      mineCost = mineCost * increase;
      mineAmount++;
      land = land-5;
      updateStuff();
    }
  }
  if (thing == 'solarPanel') {
    if (metal >= panelCost) {
      metal = metal - panelCost;
      panelCost = panelCost * increase;
      panelAmount++;
      land=land-5;
      updateStuff();
    }
  }
  if (thing == 'pump') {
    if (metal >= pumpCost) {
      metal = metal - pumpCost;
      pumpCost = pumpCost * increase;
      pumpAmount++;
      document.getElementById('explorationTab').style = 'visibility:visible;'
      land=land-5;
      updateStuff();
    }
  }
  if (thing == 'rocket') {
    if (metal >= rocketCostMetal) {
     if(oil >= rocketCostOil) {
      metal = metal - rocketCostMetal;
      oil = oil-rocketCostOil;
      rocketAmount++;
      document.getElementById('explore').style = 'visibility:visible;'
      updateStuff();
      }
    }
  }
}
