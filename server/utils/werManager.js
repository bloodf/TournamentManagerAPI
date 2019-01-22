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
    return this._event;
  }

  set event(value) {
    this._event = value;
  }

  get players() {
    return this._players;
  }

  set players(value) {
    this._players = [...this.players, ...value.map(p => p.$)];
  }

  get teams() {
    return this._teams;
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
    return this._rounds;
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
