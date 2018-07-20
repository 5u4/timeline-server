const bootstrap    = require('./bootstrap');
const chai         = bootstrap.getChai();
const should       = chai.should();
const EventFactory = require('../database/factories/EventFactory');
const UserFactory  = require('../database/factories/UserFactory');

describe('EventController tests', () => {
    let server;

    before(done => {
        server = bootstrap.connect();
        done();
    });

    beforeEach(done => {
        bootstrap.removeAllDBRecords();
        done();
    });

    describe('Test index events', () => {
        it('should return the user events', done => {
            UserFactory.create('test_username', 'test_password').then(user => {
                chai.request(server)
                    .post('/api/v1/auth/login')
                    .send({
                        username: 'test_username',
                        password: 'test_password',
                    })
                    .end((err, res) => {
                        res.body.should.have.property('token');
                        const token = res.body.token;

                        chai.request(server)
                            .get('/api/v1/events')
                            .set('x-access-token', token)
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.an('array');
                            });
                    });
                done();
            });
        });
    });

    after(done => {
        bootstrap.removeAllDBRecords();
        bootstrap.disconnect(server);
        done();
    });
});
