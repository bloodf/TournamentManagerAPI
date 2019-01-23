const XML2JS = require('xml2js');

class WerManager {
  constructor() {
    this._event = {};
    this._players = [];
    this._teams = [];
    this._roles = [];
    this._rounds = [];
  }

  get event() {
    return {
      name: this._event.title,
      sanctionNumber: this._event.sanctionnumber,
      guid: this._event.eventguid,
      organizer: this._event.orgname,
      coordinator: this._event.coordinator,
      startDate: this._event.startdate,
      endDate: this._event.enddate,
      format: this._event.format,
      eliminationType: this._event.eliminationType,
      casual: JSON.parse(this._event.iscasualreportonly.toLowerCase()),
      status: this._event.status,
      playoff: JSON.parse(this._event.isplayoff.toLowerCase()),
      manualMatches: this._event.manualmatchround,
      notes: this._event.notes,
      numberOfRounds: this._event.numberofrounds,
      playoffsStartRound: this._event.playoffstartround,
      typeCode: this._event.eventtypecode,
    };
  }

  set event(value) {
    this._event = value;
  }

  get players() {
    return this._players.map(player => ({
      dci: player.id,
      firstName: player.first,
      middleName: player.middle || '',
      lastName: player.last,
      country: player.country,
    }));
  }

  set players(value) {
    this._players = [...this.players, ...value.map(p => p.$)];
  }

  getTeamUUID(team) {
    return Buffer
      .from(`${team.name}-${this._event.sanctionnumber}-${this._event.eventguid}`.replace(/([^a-zA-Z0-9]||[\u00A0-\u2666])/g, ''))
      .toString('base64');
  }

  get teams() {
    return this._teams.map(team => ({
      teamUUID: this.getTeamUUID(team),
      name: team.name,
      status: team.status,
      eliminationRound: team.eliminationround,
      members: team.members.map(tm => ({
        ...(this.players.find(p => p.dci === tm.person) || {}),
        position: tm.position,
      })),
    }));
  }

  set teams(value) {
    this._teams = [...this.teams, ...value.map(p => ({
      ...p.$,
      members: p.member.map(m => ({
        ...m.$,
      })),
    }))];
  }

  get roles() {
    return this._roles;
  }

  set roles(value) {
    this._roles = [...this.roles, ...value.map(p => ({
      ...p.$,
      ref: (Array.isArray(p.ref)) ? p.ref.map(r => r.$) : [],
    }))];
  }

  get rounds() {
    return this._rounds.map(round => ({
      round: round.number,
      playFormat: round.PlayFormat,
      date: round.date,
      teamFormat: round.teamformat,
      matches: round.matches.map(match => ({
        player: this.players.filter(p => p.dci === match.person),
        person: match.person,
        opponent: match.opponent,
        outcome: match.outcome,
        win: match.win,
        loss: match.loss,
        draw: match.draw,
        winByDrop: JSON.parse(match.winbydrop.toLowerCase()),
      })),
    }));
  }

  get matches() {
    return this._rounds.map(round => round.matches.map(match => ({
      person: match.person,
      opponent: match.opponent,
      outcome: match.outcome,
      win: match.win,
      loss: match.loss,
      draw: match.draw,
      winByDrop: match.winbydrop,
    })));
  }

  set rounds(value) {
    this._rounds = [...this.rounds, ...value.map(r => ({
      ...r.$,
      matches: (Array.isArray(r.match)) ? r.match.map(m => m.$) : [],
    }))];
  }

  async parse(werData) {
    try {
      const XmlParser = new XML2JS.Parser();
      return new Promise((resolve, reject) => {
        XmlParser.parseString(werData, (err, result) => {
          if (err) reject(err);

          this.event = result.event.$;
          result.event.participation.forEach((ep) => {
            this.players = ep.person;
            this.teams = ep.team;
            this.roles = ep.role;
          });
          result.event.matches.forEach((mr) => {
            this.rounds = mr.round;
          });

          resolve(result);
        });
      });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = WerManager;
