const allMatchesFromDB = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      "teamName": "Grêmio"
    }
  },
  {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Internacional"
    }
  }
]

const allMatchesInProgressFromDB = [
  {
    dataValues: {
      id: 41,
      homeTeamId: 16,
      homeTeamGoals: 2,
      awayTeamId: 9,
      awayTeamGoals: 0,
      inProgress: true,
      homeTeam: {
        teamName: "São Paulo"
      },
      awayTeam: {
        teamName: "Internacional"
      }
    }
  },
  {
    dataValues: {
      id: 42,
      homeTeamId: 6,
      homeTeamGoals: 1,
      awayTeamId: 1,
      awayTeamGoals: 0,
      inProgress: true,
      homeTeam: {
        teamName: "Ferroviária"
      },
      awayTeam: {
        teamName: "Avaí/Kindermann"
      }
    }
  }
]

const allMatchesNotInProgressFromDB = [
  {
    dataValues: {
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
      inProgress: false,
      homeTeam: {
        teamName: "São Paulo"
      },
      awayTeam: {
        teamName: "Grêmio"
      }
    }
  },
  {
    dataValues: {
      id: 2,
      homeTeamId: 9,
      homeTeamGoals: 1,
      awayTeamId: 14,
      awayTeamGoals: 1,
      inProgress: false,
      homeTeam: {
        teamName: "Internacional"
      },
      awayTeam: {
        teamName: "Santos"
      }
    }
  }
]

export default {
  allMatchesFromDB,
  allMatchesInProgressFromDB,
  allMatchesNotInProgressFromDB
};