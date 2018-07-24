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
    const user = await UserFactory.create('test_username', 'test_password');

    const tokenRequest = await chai.request(server).post('/api/v1/auth/login').send({
        username: 'test_username',
        password: 'test_password',
    });

    return new Promise(resolve => resolve({
        token: tokenRequest.body.token,
        user: user,
    }));
}

describe('EventController tests', () => {
    beforeEach(async (done) => {
        bootstrap.removeAllDBRecords();
        done();
    });

    describe('Test index events', () => {
        it('should return the user events', done => {
            getToken().then(payload => {
                chai.request(server)
                    .get('/api/v1/events')
                    .set('x-access-token', payload.token)
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
            getToken().then(payload => {
                chai.request(server)
                    .post('/api/v1/events')
                    .set('x-access-token', payload.token)
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

    describe('Test edit events', () => {
        it('should edit an event', done => {
            getToken().then(payload => {
                EventFactory.create(payload.user._id).then(event => {
                    chai.request(server)
                        .patch('/api/v1/events/' + event._id)
                        .set('x-access-token', payload.token)
                        .send({
                            title: 'Update title',
                        })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.have.property('title');
                            res.body.title.should.be.equal('Update title');
                            done();
                        });
                });
            });
        });

        it('should response not found when event is not found', done => {
            getToken().then(payload => {
                chai.request(server)
                    .patch('/api/v1/events/5b5262611e46b62ea07ec1d9')
                    .set('x-access-token', payload.token)
                    .send({
                        title: 'Update title',
                    })
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.have.property('messages');
                        res.body.messages.should.be.an('array');
                        done();
                    });
            });
        });

        it('should response not found when event does not belongs to user', done => {
            getToken().then(payload => {
                UserFactory.create().then(user => {
                    EventFactory.create(user._id).then(event => {
                        chai.request(server)
                            .patch('/api/v1/events/5b5262611e46b62ea07ec1d9')
                            .set('x-access-token', payload.token)
                            .send({
                                title: 'Update title',
                            })
                            .end((err, res) => {
                                res.should.have.status(404);
                                res.body.should.have.property('messages');
                                res.body.messages.should.be.an('array');
                                done();
                            });
                    });
                });
            });
        });
    });

    describe('Test destroy events', () => {
        it('should delete an event', done => {
            getToken().then(payload => {
                EventFactory.create(payload.user._id).then(event => {
                    chai.request(server)
                        .delete('/api/v1/events/' + event._id)
                        .set('x-access-token', payload.token)
                        .end((err, res) => {
                            res.should.have.status(204);
                            done();
                        });
                });
            });
        });

        it('should response not found when event is not found', done => {
            getToken().then(payload => {
                chai.request(server)
                    .delete('/api/v1/events/5b5262611e46b62ea07ec1d9')
                    .set('x-access-token', payload.token)
                    .send({
                        title: 'Update title',
                    })
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.have.property('messages');
                        res.body.messages.should.be.an('array');
                        done();
                    });
            });
        });

        it('should response not found when event does not belongs to user', done => {
            getToken().then(payload => {
                UserFactory.create().then(user => {
                    EventFactory.create(user._id).then(event => {
                        chai.request(server)
                            .delete('/api/v1/events/5b5262611e46b62ea07ec1d9')
                            .set('x-access-token', payload.token)
                            .send({
                                title: 'Update title',
                            })
                            .end((err, res) => {
                                res.should.have.status(404);
                                res.body.should.have.property('messages');
                                res.body.messages.should.be.an('array');
                                done();
                            });
                    });
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
