import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeUsers from '../database/models/SequelizeUsers';
import mocks from './mocks/users';
import JWT from '../utils/JWT';
import Validations from '../middlewares/Validations';

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

describe('Testando rotas de Users', () => {
  let chaiHttpResponse: Response;

  it('POST /login Deve retornar um token com status 200', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(mocks.userFromDB as any);
    const { email, password } = mocks.userLoginBody
    
    const { status, body } = await chai.request(app).post('/login')
      .send({ email, password });
    
    expect(status).to.equal(200);
    expect(body).to.have.property('token');
    expect(body.token).to.be.an('string');
  });

  it('POST /login Deve retornar status 400 sem email', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(mocks.userFromDB as any);
    const { email, password } = mocks.userLoginBody
    
    const { status, body } = await chai.request(app).post('/login')
      .send({ password });
    
    expect(status).to.equal(400);
    expect(body).to.have.property('message');
    expect(body.message).to.be.an('string');
  });

  it('POST /login Deve retornar status 400 sem password', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(mocks.userFromDB as any);
    const { email, password } = mocks.userLoginBody
    
    const { status, body } = await chai.request(app).post('/login')
      .send({ email });
    
    expect(status).to.equal(400);
    expect(body).to.have.property('message');
    expect(body.message).to.be.an('string');
  });

  it('POST /login Deve retornar status 401 com usúario inválido', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(null);
    const { email, password } = mocks.userLoginBody
    
    const { status, body } = await chai.request(app).post('/login')
      .send({ email, password });
    
    expect(status).to.equal(401);
    expect(body).to.have.property('message');
    expect(body.message).to.be.an('string');
  });

  it('POST /login Deve retornar status 400 com usúario válido e senha incorreta', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(mocks.userFromDB as any);
    const { email, password } = mocks.userLoginBody
    
    const { status, body } = await chai.request(app).post('/login')
      .send({ email, password: 'senha_incorreta' });
    
    expect(status).to.equal(401);
    expect(body).to.have.property('message');
    expect(body.message).to.be.an('string');
  });

  it('POST /login/role com token valído retornar status 200 com um objeto contendo a role do user', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(mocks.userFromDB as any);
    sinon.stub(JWT, 'verify').resolves("token_valido");

    const { email, password } = mocks.userLoginBody
    
    const { status, body } = await chai.request(app).post('/login/role')
      .set('authorization', 'validToken')
      .send({ email, password });
    
    expect(status).to.equal(200);
    expect(body).to.have.property('role');
    expect(body.message).to.be.an('string');
  });

  it('POST /login/role sem token retornar status 401 com a mensagem de erro correta', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(mocks.userFromDB as any);

    const { email, password } = mocks.userLoginBody
    
    const { status, body } = await chai.request(app).post('/login/role')
      .send({ email, password });
    
    expect(status).to.equal(401);
    expect(body).to.have.property('role');
    expect(body.message).to.be.an('string');
    expect(body.message).to.equal('Token not found');
  });

  it('POST /login/role com token inválido retornar status 401 com a mensagem de erro correta', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(mocks.userFromDB as any);
    sinon.stub(JWT, 'verify').resolves("Token must be a valid token");

    const { email, password } = mocks.userLoginBody
    
    const { status, body } = await chai.request(app).post('/login/role')
      .send({ email, password });
    
    expect(status).to.equal(200);
    expect(body).to.have.property('role');
    expect(body.message).to.be.an('string');
    expect(body.message).to.equal('Token must be a valid token');
  });


  afterEach(sinon.restore);
});
