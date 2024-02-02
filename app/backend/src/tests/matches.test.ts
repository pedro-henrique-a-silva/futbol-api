import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import mocks from './mocks/matches';
import JWT from '../utils/JWT';

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

describe('Testando rota de Matches', () => {

  it('GET /matches Deve retornar uma lista de patidas com status 200', async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(mocks.allMatchesFromDB as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.be.an('array');
  });

  it('GET /matches?inProgress=true Deve retornar uma lista de patidas em andamento com status 200', async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(mocks.allMatchesInProgressFromDB as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.be.an('array');
    expect(body).to.deep.equal(mocks.allMatchesInProgressFromDB.map((match) => match.dataValues));
  });

  it('GET /matches?inProgress=false Deve retornar uma lista de patidas que não estão em andamento com status 200', async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(mocks.allMatchesNotInProgressFromDB as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=false');

    expect(status).to.equal(200);
    expect(body).to.be.an('array');
    expect(body).to.deep.equal(mocks.allMatchesNotInProgressFromDB.map((match) => match.dataValues));
  });

  it('patch /matches/:id/finish deve atualizar o resultado de uma partida e retornar status 200', async () => {
    sinon.stub(SequelizeMatches, 'update').resolves();
    sinon.stub(JWT, 'verify').returns('valideToken');

    const { status, body } = await chai.request(app).patch('/matches/1/finish')
      .set('authorization', 'Bearer validToken');

    expect(status).to.equal(200);
  });

  it('patch /matches/:id deve atualizar o placar de uma partida e retornar status 200', async () => {
    sinon.stub(SequelizeMatches, 'update').resolves();
    sinon.stub(JWT, 'verify').returns('valideToken');

    const { status, body } = await chai.request(app).patch('/matches/1')
      .set('authorization', 'Bearer validToken')
      .send({ homeTeamGoals: 2, awayTeamGoals: 2 });

    expect(status).to.equal(200);
  });


  afterEach(sinon.restore);
});
