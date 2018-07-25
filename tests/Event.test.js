const bootstrap    = require('./bootstrap');
const chai         = bootstrap.getChai();
const should       = chai.should();
const EventFactory = require('../database/factories/EventFactory');
const UserFactory  = require('../database/factories/UserFactory');
const server       = bootstrap.connect();

/**
 * Get an user's auth token
 * 
 * @param {String} username The username
 * @param {String} password The password
 * 
 * @returns {String} The auth token
 */
const getUserToken = async (username, password = 'test_password') => {
    const tokenRequest = await chai.request(server).post('/api/v1/auth/login').send({
        username: username,
        password: password,
    });

    return tokenRequest.body.token;
};

describe('EventController tests', function() {
    beforeEach(function() {
        bootstrap.removeAllDBRecords();
    });

    describe('Test index events', function() {
        it('should return the user events', async function() {
            const user = await UserFactory.create('test_username');

            const token = await getUserToken('test_username');

            const event = await EventFactory.create(user._id);
            
            const res = await chai.request(server)
                .get('/api/v1/events')
                .set('x-access-token', token);

            res.should.have.status(200);
            res.body.should.be.an('array');
            res.body[0].should.have.property('title').equal(event.title);
            res.body[0].should.have.property('description').equal(event.description);
            res.body[0].should.have.property('postedAt').equal(event.postedAt);
        });
    });

    describe('Test store events', async function() {
        it('should store an event and response it', async function() {
            await UserFactory.create('test_username');

            const token = await getUserToken('test_username');

            const eventTitle = 'Test event title';

            const res = await chai.request(server)
                .post('/api/v1/events')
                .set('x-access-token', token)
                .send({
                    title: eventTitle,
                });
            
            res.should.have.status(201);
            res.body.should.have.property('id').a('string');
            res.body.should.have.property('title').equal(eventTitle);
            res.body.should.have.property('description');
            res.body.should.have.property('postedAt');
            res.body.should.have.property('createdAt');
        });
    });

    describe('Test edit events', function() {
        it('should edit an event', async function() {
            const user = await UserFactory.create('test_username');

            const token = await getUserToken('test_username');

            const event = await EventFactory.create(user._id.toString());

            const res = await chai.request(server)
                .patch('/api/v1/events/' + event._id)
                .set('x-access-token', token)
                .send({
                    title: 'Update title',
                });

            res.should.have.status(200);
            res.body.should.have.property('title').equal('Update title');
        });

        it('should response not found when event is not found', async function() {
            await UserFactory.create('test_username');

            const token = await getUserToken('test_username');

            const res = await chai.request(server)
                .patch('/api/v1/events/5b5262611e46b62ea07ec1d9')
                .set('x-access-token', token)
                .send({
                    title: 'Update title',
                });

            res.should.have.status(404);
            res.body.should.have.property('messages').an('array');
        });

        it('should response not found when event does not belongs to user', async function() {
            await UserFactory.create('test_username');
            
            const token = await getUserToken('test_username');

            const eventCreater = await UserFactory.create('event_creater');

            await EventFactory.create(eventCreater._id);

            const res = await chai.request(server)
                .patch('/api/v1/events/5b5262611e46b62ea07ec1d9')
                .set('x-access-token', token)
                .send({
                    title: 'Update title',
                });

            res.should.have.status(404);
            res.body.should.have.property('messages').an('array');
        });
    });

    describe('Test destroy events', function() {
        it('should delete an event', async function() {
            const user = await UserFactory.create('test_username');
            
            const token = await getUserToken('test_username');

            const event = await EventFactory.create(user._id);

            const res = await chai.request(server)
                .delete('/api/v1/events/' + event._id)
                .set('x-access-token', token);

            res.should.have.status(204);
        });

        it('should response not found when event is not found', async function() {
            await UserFactory.create('test_username');

            const token = await getUserToken('test_username');

            const res = await chai.request(server)
                .delete('/api/v1/events/5b5262611e46b62ea07ec1d9')
                .set('x-access-token', token);

            res.should.have.status(404);
            res.body.should.have.property('messages').an('array');
        });

        it('should response not found when event does not belongs to user', async function() {
            await UserFactory.create('test_username');
            
            const token = await getUserToken('test_username');

            const eventCreater = await UserFactory.create('event_creater');

            await EventFactory.create(eventCreater._id);

            const res = await chai.request(server)
                .delete('/api/v1/events/5b5262611e46b62ea07ec1d9')
                .set('x-access-token', token);

            res.should.have.status(404);
            res.body.should.have.property('messages').an('array');
        });
    });

    after(function() {
        bootstrap.removeAllDBRecords();
        bootstrap.disconnect(server);
        bootstrap.disconnectMongoose();
    });
});
