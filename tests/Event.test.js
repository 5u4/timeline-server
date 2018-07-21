const bootstrap    = require('./bootstrap');
const chai         = bootstrap.getChai();
const should       = chai.should();
const EventFactory = require('../database/factories/EventFactory');
const UserFactory  = require('../database/factories/UserFactory');
const server       = bootstrap.connect();

/**
 * Create an user and get its token
 */
const getToken = async () => {
    await UserFactory.create('test_username', 'test_password');

    const tokenRequest = await chai.request(server).post('/api/v1/auth/login').send({
        username: 'test_username',
        password: 'test_password',
    });

    return new Promise(resolve => resolve(tokenRequest.body.token));
}

describe('EventController tests', () => {
    beforeEach(async (done) => {
        bootstrap.removeAllDBRecords();
        done();
    });

    describe('Test index events', () => {
        it('should return the user events', done => {
            getToken().then(token => {
                chai.request(server)
                    .get('/api/v1/events')
                    .set('x-access-token', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.an('array');
                        done();
                    });
            });
        });
    });

    describe('Test store events', () => {
        it('should store an event and response it', done => {
            getToken().then(token => {
                chai.request(server)
                    .post('/api/v1/events')
                    .set('x-access-token', token)
                    .send({
                        title: 'Test event title',
                    })
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.have.property('id');
                        res.body.should.have.property('title');
                        res.body.should.have.property('description');
                        res.body.should.have.property('postedAt');
                        res.body.should.have.property('createdAt');
                        res.body.id.should.be.a('string');
                        res.body.title.should.be.equal('Test event title');
                        done();
                    });
            });
        });
    });

    after(done => {
        bootstrap.removeAllDBRecords();
        bootstrap.disconnect(server);
        done();
    });
});
