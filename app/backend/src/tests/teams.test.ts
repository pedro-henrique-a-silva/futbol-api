import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeTeams from '../database/models/SequelizeTeams';
import mocks from './mocks/teams';

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

describe('GET /teams', () => {
  let chaiHttpResponse: Response;

  it('Deve retornar uma lista de times com status 200', async () => {
    sinon.stub(SequelizeTeams, 'findAll').resolves(mocks.allTeamsFromDB as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.be.an('array');;
  });

  afterEach(sinon.restore);
});
