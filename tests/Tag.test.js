const bootstrap    = require('./bootstrap');
const chai         = bootstrap.getChai();
const should       = chai.should();
const UserFactory  = require('../database/factories/UserFactory');
const TagFactory   = require('../database/factories/TagFactory');
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

describe('TagController tests', function() {
    beforeEach(function() {
        bootstrap.removeAllDBRecords();
    });

    describe('Test index tags', function() {
        it('should return the user tags', async function() {
            const user = await UserFactory.create('test_username');

            const token = await getUserToken('test_username');

            const tag = await TagFactory.create(user._id);

            const res = await chai.request(server)
                .get('/api/v1/tags')
                .set('x-access-token', token);
            
            res.should.have.status(200);
            res.body.should.be.an('array');
            res.body[0].should.have.property('name').equal(tag.name);
            res.body[0].should.have.property('description').equal(tag.description);
            res.body[0].should.have.property('color').equal(tag.color);
        });
    });

    describe('Test store tags', function() {
        it('should store a tag and response it', async function() {
            await UserFactory.create('test_username');

            const token = await getUserToken('test_username');

            const tagName = 'Test tag name';

            const res = await chai.request(server)
                .post('/api/v1/tags')
                .set('x-access-token', token)
                .send({
                    name: tagName,
                });
            
            res.should.have.status(201);
            res.body.should.have.property('id').a('string');
            res.body.should.have.property('name').equal(tagName);
            res.body.should.have.property('description');
            res.body.should.have.property('color');
        });
    });

    describe('Test edit tags', function() {
        it('should edit a tag', async function() {
            const user = await UserFactory.create('test_username');

            const token = await getUserToken('test_username');

            const tag = await TagFactory.create(user._id);

            const updatedName = 'Updated name';

            const res = await chai.request(server)
                .patch('/api/v1/tags/' + tag._id)
                .set('x-access-token', token)
                .send({
                    name: updatedName,
                });

            res.should.have.status(200);
            res.body.should.have.property('name').equal(updatedName);
        });

        it('should response not found when tag does not belong to user', async function() {
            await UserFactory.create('test_username');
            
            const token = await getUserToken('test_username');

            const tagCreater = await UserFactory.create('tag_creater');

            await TagFactory.create(tagCreater._id);

            const res = await chai.request(server)
                .patch('/api/v1/tags/5b5262611e46b62ea07ec1d9')
                .set('x-access-token', token)
                .send({
                    name: 'Updated name',
                });

            res.should.have.status(404);
            res.body.should.have.property('messages').an('array');
        });
    });

    describe('Test destroy tags', function() {
        it('should delete a tag', async function() {
            const user = await UserFactory.create('test_username');
            
            const token = await getUserToken('test_username');

            const tag = await TagFactory.create(user._id);

            const res = await chai.request(server)
                .delete('/api/v1/tags/' + tag._id)
                .set('x-access-token', token);

            res.should.have.status(204);
        });
    });

    after(function() {
        bootstrap.removeAllDBRecords();
        bootstrap.disconnect(server);
        bootstrap.disconnectMongoose();
    });
});
