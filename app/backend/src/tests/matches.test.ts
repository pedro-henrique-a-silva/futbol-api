import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import mocks from './mocks/matches';

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

describe('Testando rota de Matches', () => {

  it('GET /matches Deve retornar uma lista de patidas com status 200', async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(mocks.allMatchesFromDB as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.be.an('array');;
  });


  afterEach(sinon.restore);
});
