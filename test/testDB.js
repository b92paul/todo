let db = require("../db");

describe('User', function() {
  describe('#getUser()', function() {
    it('should find user a with pass b', function(done) {
      db.users.setUser('a', 'b', (err) => {
        if (err) done(err);
        else{
          db.users.getUser('a', (err, res) => {
            if (err) done(err);
            else if (res == null) done(Error('no such user!!'));
            else done();
          });
        }
      });
    });
  });
});
