'use strict';

// Elements
// Input Elements
const playerInput = document.querySelector('.form-input--addPlayer');
const teamCount = document.querySelector('.form-input--teamCount');
const oddPlayerOpt = document.querySelector('.form-select--oddPlayer');

// Button Elements
const addPlayerBtn = document.querySelector('.form-btn--addPlayer');
const generateTeamsBtn = document.querySelector('.form-btn--generateTeams');
const resetBtn = document.querySelector('.form-btn--reset');

//Display Elements
const playerContainer = document.querySelector('.playerContainer');
const displayMessage = document.querySelector('.displayMessage');

// Variables
// Team Members Global Variable
const allPlayers = [];

// Button functions
// Generate teams
generateTeamsBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const teams = [];
    const noTeams = teamCount.value;
    const tempMembers = [...allPlayers];
    const oddPlayerOut = oddPlayerOpt.value === 'out' ? true : false;
    // Randome member selector function
    const randMember = (tempMembers) =>
        Math.floor(Math.random() * tempMembers.length);

    // If missing inputs
    if (!noTeams || !tempMembers.length)
        displayMessage.textContent = 'ADD PLAYERS AND SELECT NUMBER OF TEAMS';
    else if (noTeams > tempMembers.length) {
        displayMessage.textContent =
            'NOT ENOUGH PLAYERS TO FILL TEAMS - ADD MORE PLAYERS OR REDUCE NUMBER OF TEAMS';
    }
    // If inputs are complete
    else {
        // Determine size of each team
        const teamSize = Math.floor(allPlayers.length / noTeams);
        // Create array for each team inside team array
        for (let i = 0; teams.length < noTeams; i++) {
            teams[i] = [];
            // Assign members to each team until team size is reached
            while (teams[i].length < teamSize) {
                teams[i].push(tempMembers.splice(randMember(tempMembers), 1));
            }
        }
        if (!oddPlayerOut) {
            // Assign remaining players to random teams
            for (let i = 0; tempMembers.length > 0; i++) {
                teams[i].push(
                    tempMembers.splice(randMember(tempMembers), 1)[0]
                );
            }
        }
        displayTeams(teams, tempMembers);
    }
});

// Accept player name as input. Display in the playersContainer.
addPlayerBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const playerName = playerInput.value.toUpperCase();
    if (playerName.length < 1) {
        displayMessage.textContent =
            'PLAYER NAME MUST BE AT LEAST 1 CHARACTER LONG';
    } else if (allPlayers.includes(playerName)) {
        displayMessage.textContent = 'CAN NOT ADD DUPLICATE PLAYERS';
    } else {
        allPlayers.push(playerName);
        displayAllPlayers(allPlayers);
    }
    playerInput.select();
    playerInput.value = '';
});

const removePlayer = function (i) {
    allPlayers.splice(i, 1);
    displayAllPlayers();
};

// Remove all user input values and reset UI
resetBtn.addEventListener('click', function (e) {
    e.preventDefault();
    resetUI();
});

// Update display
// As players are added
const displayAllPlayers = function () {
    playerContainer.innerHTML = '';
    displayMessage.textContent = 'PLAYERS ADDED:';

    allPlayers.forEach(function (player, i) {
        const html = `
        <p class='added-player playerContainer-${player}'>${player}<button class='playerContainer-removeBtn' onclick='removePlayer(${i})'>X</button></p>`;

        playerContainer.insertAdjacentHTML('beforeend', html);
    });
};

// When teams are generated
const displayTeams = function (teams, out) {
    playerContainer.style.display = 'grid';
    playerContainer.style.gridTemplateColumns = `repeat(3, 1fr)`;
    playerContainer.innerHTML = '';

    teams.forEach(function (team, i) {
        const memberHTML = team.reduce((cur, acc) => acc + `<p>${cur}</p>`, '');
        const teamHTML = `<div class="playerContainer-teamDiv">
                <h2>TEAM ${i + 1}</h2>
                <div>${memberHTML}</div>
            </div>`;
        playerContainer.insertAdjacentHTML('beforeend', teamHTML);
    });
    displayMessage.textContent = 'TEAMS:';
    playerContainer.insertAdjacentHTML(
        'beforeend',
        out.length ? `<div class="playerContainer-out">OUT: ${out}</div>` : ''
    );
};

// Reset UI
const resetUI = function () {
    allPlayers.length = 0;
    playerInput.value = '';
    teamCount.value = '';
    oddPlayerOpt.selectedIndex = 0;
    displayMessage.textContent = 'ADD PLAYERS TO BEGIN';
    playerContainer.textContent = '';
    playerContainer.style.display = 'block';
};
