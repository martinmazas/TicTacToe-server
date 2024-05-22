const Player = require('../DB/Schemas/playerSchema')

let teams = []
let countries = []

const teamCombination = new Map()

module.exports = {
    getRandomNumbers: (requiredElements, elements) => {
        const result = new Set()

        // Picks x random numbers in order to get random teams and countries
        while (result.size < requiredElements - 1) {
            const rand = Math.floor(Math.random() * (elements.length))
            result.add(elements[rand])
        }

        return Array.from(result)
    },
    getFinalResult: (randomCountries, randomTeams) => {
        let playersNumber = 0
        const noPossiblePlayersMatch = []

        for (let i = 0; i < randomCountries.length; i++) {
            if (randomCountries[i] === undefined) return (0, [])
            countries.push(randomCountries[i].name)

            for (let j = 0; j < randomTeams.length; j++) {
                if (i === 0) teams.push(randomTeams[j].name)

                if (!teamCombination.get(randomTeams[j].name).get(randomCountries[i].name)) {
                    noPossiblePlayersMatch.push([randomCountries[i].name, randomTeams[j].name])
                } else playersNumber++
            }
        }

        return ({ playersNumber, noPossiblePlayersMatch })
    },
    getTeams: () => {
        return teams
    },
    getCountries: () => {
        return countries
    },
    setValuesToZero: () => {
        teams = []
        countries = []
    },
    filterCountriesPerTeam: (players) => {
        const countriesCombinations = new Map()

        players.map(player => {
            const team = player.team
            const country = player.country

            if (!teamCombination.has(team)) {
                teamCombination.set(team, new Map())
            }
            teamCombination.get(team).set(country, true)

            if (!countriesCombinations.has(country)) {
                countriesCombinations.set(country, new Map())
            }
            countriesCombinations.get(country).set(team, true)
        })
    },
    getTeamCombination: (team) => {
        return teamCombination.get(team)
    }
}