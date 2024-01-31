import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeUsers from '../database/models/SequelizeUsers';
import mocks from './mocks/users';

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

describe('Testando rotas de Users', () => {
  let chaiHttpResponse: Response;

  it('POST /users Deve retornar um token com status 200', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(mocks.userFromDB as any);
    const { email, password } = mocks.userLoginBody
    
    const { status, body } = await chai.request(app).post('/users')
      .send({ email, password });
    
    expect(status).to.equal(200);
    expect(body).to.have.property('token');
    expect(body.token).to.be.an('string');
  });

  it('POST /users Deve retornar status 400 sem email', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(mocks.userFromDB as any);
    const { email, password } = mocks.userLoginBody
    
    const { status, body } = await chai.request(app).post('/users')
      .send({ password });
    
    expect(status).to.equal(400);
    expect(body).to.have.property('message');
    expect(body.message).to.be.an('string');
  });

  it('POST /users Deve retornar status 400 sem password', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(mocks.userFromDB as any);
    const { email, password } = mocks.userLoginBody
    
    const { status, body } = await chai.request(app).post('/users')
      .send({ email });
    
    expect(status).to.equal(400);
    expect(body).to.have.property('message');
    expect(body.message).to.be.an('string');
  });

  it('POST /users Deve retornar status 400 com usúario inválido', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(null);
    const { email, password } = mocks.userLoginBody
    
    const { status, body } = await chai.request(app).post('/users')
      .send({ email, password });
    
    expect(status).to.equal(400);
    expect(body).to.have.property('message');
    expect(body.message).to.be.an('string');
  });

  it('POST /users Deve retornar status 400 com usúario válido e senha incorreta', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(mocks.userFromDB as any);
    const { email, password } = mocks.userLoginBody
    
    const { status, body } = await chai.request(app).post('/users')
      .send({ email, password: 'senha_incorreta' });
    
    expect(status).to.equal(400);
    expect(body).to.have.property('message');
    expect(body.message).to.be.an('string');
  });


  afterEach(sinon.restore);
});
