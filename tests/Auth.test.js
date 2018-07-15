const bootstrap = require('./bootstrap');
const chai      = bootstrap.getChai();
const should    = chai.should();

describe('AuthController tests', () => {
    let server;

    before(done => {
        server = bootstrap.connect();
        bootstrap.removeAllDBRecords();
        done();
    });

    describe('Test username uniqueness check', () => {
        it('should return username is not taken', done => {
            chai.request(server)
                .post('/api/v1/auth/uniqueness/username')
                .send({
                    username: 'test_username',
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('isTaken');
                    res.body.isTaken.should.be.equal(false);
                });
            done();
        });
    });

    describe('Test user registration', () => {
        it('should register a new user', done => {
            chai.request(server)
                .post('/api/v1/auth/register')
                .send({
                    username: 'test_username',
                    password: 'test_password',
                })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.have.property('user');
                    res.body.should.have.property('token');
                    res.body.user.username.should.be.equal('test_username');
                });
            done();
        });
    });

    after(done => {
        bootstrap.removeAllDBRecords();
        bootstrap.disconnect(server);
        done();
    });
});
