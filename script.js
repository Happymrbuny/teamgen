'use strict';

// Elements
// Inputs
const playerInput = document.querySelector('.form_input-addPlayer');
const teamCount = document.querySelector('.form_input-teamCount');
const oddPlayerOpt = document.querySelector('.form_select-oddPlayer');

// Buttons
const addPlayerBtn = document.querySelector('.form_btn-addPlayer');
const generateTeamsBtn = document.querySelector('.form_btn-generateTeams');

//Display
const playerContainer = document.querySelector('.playerContainer');
const displayMessage = document.querySelector('.displayMessage');

// Variables
// Team Members Global Variable
const allPlayers = [];

// Button functions
// Generate teams
generateTeamsBtn.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('Generate Teams button pressed.');
    const teams = [];
    const noTeams = teamCount.value;
    const tempMembers = [...allPlayers];
    const oddPlayerOut = oddPlayerOpt.value === 'out' ? true : false;
    // Randome member selector function
    const randMember = (tempMembers) => console.log(tempMembers);
    Math.floor(Math.random() * tempMembers);

    // If inputs are complete
    if (noTeams && tempMembers.length) {
        // Determine size of each team
        const teamSize = Math.floor(allPlayers.length / noTeams);
        // Create array for each team inside team array
        for (let i = 0; teams.length < noTeams; i++) {
            console.log(`Creating team ${i}`);
            teams[i] = [];
            // Assign members to each team until team size is reached
            while (teams[i].length < teamSize) {
                teams[i].push(
                    tempMembers.splice(randMember(tempMembers), 1)[0]
                );
            }
        }
        if (oddPlayerOut) {
            // Display teams and out players
            console.log(`Out: ${tempMembers}`);
        } else {
            // Assign remaining players to random teams
            for (let i = 0; tempMembers.length > 0; i++) {
                teams[i].push(
                    tempMembers.splice(randMember(tempMembers), 1)[0]
                );
            }
        }
        displayTeams(teams);
    } else {
        console.log('Please fill in all fields');
    }
});

// Accept player name as input and display in the playersContainer.
addPlayerBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const playerName = playerInput.value;
    allPlayers.push(playerName);
    displayAllPlayers(allPlayers);
    playerInput.select();
    playerInput.value = '';
});

// Update display
// As players are added
const displayAllPlayers = function () {
    playerContainer.innerHTML = '';
    displayMessage.textContent = 'PLAYERS ADDED:';

    allPlayers.forEach(function (player) {
        const html = `
        <div class='playerContainer-player'>${player}</div>`;

        playerContainer.insertAdjacentHTML('beforeend', html);
    });
};

// When teams are generated
const displayTeams = function (teams) {
    console.log('displaying teams');
    playerContainer.style.display = 'grid';
    playerContainer.style.gridTemplateColumns = `repeat(${teams.length}, 1fr)`;
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
};

const resetUI = function () {};
