const bootstrap   = require('./bootstrap');
const chai        = bootstrap.getChai();
const should      = chai.should();
const UserFactory = require('../database/factories/UserFactory');
const server      = bootstrap.connect();

describe('AuthController tests', function() {
    this.timeout(5000);

    beforeEach(function() {
        bootstrap.removeAllDBRecords();
    });

    describe('Test username uniqueness check', function() {
        it('should return username is not taken', async function() {
            const res = await chai.request(server)
                .post('/api/v1/auth/uniqueness/username')
                .send({
                    username: 'test_username',
                });
            
            res.should.have.status(200);
            res.body.should.have.property('isTaken').equal(false);
        });

        it('should return username is been taken', async function() {
            await UserFactory.create('test_username');

            const res = await chai.request(server)
                .post('/api/v1/auth/uniqueness/username')
                .send({
                    username: 'test_username',
                });
            
            res.should.have.status(200);
            res.body.should.have.property('isTaken').equal(true);
        });
    });

    describe('Test user registration', function() {
        it('should register a new user', async function() {
            const res = await chai.request(server)
                .post('/api/v1/auth/register')
                .send({
                    username: 'test_username',
                    password: 'test_password',
                });
            
            res.should.have.status(201);
            res.body.should.have.property('user');
            res.body.should.have.property('token');
            res.body.user.should.have.property('username').equal('test_username');
        });

        it('should get username already taken error message', async function() {
            await UserFactory.create('test_username');

            const res = await chai.request(server)
                .post('/api/v1/auth/register')
                .send({
                    username: 'test_username',
                    password: 'test_password',
                });

            res.should.have.status(400);
            res.body.should.have.property('messages').an('array');
        });
    });

    describe('Test user login', function() {
        it('should login a user', async function() {
            const user = await UserFactory.create('test_username', 'test_password');

            const res = await chai.request(server)
                .post('/api/v1/auth/login')
                .send({
                    username: 'test_username',
                    password: 'test_password',
                });

            res.should.have.status(200);
            res.body.should.have.property('token').a('string');
            res.body.should.have.property('user').an('object');
            res.body.user.should.have.property('id').equal(user._id.toString());
            res.body.user.should.have.property('username').equal('test_username');
            res.body.user.should.not.have.property('password');
        });

        it('should fail user login with a wrong password', async function() {
            await UserFactory.create('test_username', 'test_password');

            const res = await chai.request(server)
                .post('/api/v1/auth/login')
                .send({
                    username: 'test_username',
                    password: 'wrong_password',
                });

            res.should.have.status(400);
            res.body.should.have.property('messages').an('array');
        });
    });

    describe('Test username/password validator', function() {
        it('should reject since username is longer than 20', async function() {
            const res = await chai.request(server)
                .post('/api/v1/auth/uniqueness/username')
                .send({
                    username: 'test_user_name_has_longer_than_twenty_chars',
                });

            res.should.have.status(400);
            res.body.should.have.property('messages').an('object');
        });

        it('should reject since username is shorter than 5', async function() {
            const res = await chai.request(server)
                .post('/api/v1/auth/uniqueness/username')
                .send({
                    username: 'test',
                });

            res.should.have.status(400);
            res.body.should.have.property('messages').an('object');
        });

        it('should reject since username contains invalid chars', async function() {
            const res = await chai.request(server)
                .post('/api/v1/auth/uniqueness/username')
                .send({
                    username: 'user-name',
                });

            res.should.have.status(400);
            res.body.should.have.property('messages').an('object');
        });

        it('should reject since password is shorter than 8', async function() {
            const res = await chai.request(server)
                .post('/api/v1/auth/register')
                .send({
                    username: 'test_username',
                    password: 'pass',
                });

            res.should.have.status(400);
            res.body.should.have.property('messages').an('object');
        });
    });

    after(function() {
        bootstrap.removeAllDBRecords();
        bootstrap.disconnect(server);
    });
});
