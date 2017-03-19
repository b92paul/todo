let redis = require('redis'),
  client = redis.createClient();

exports.setUser = (id, pass, cb) => {
  client.set('user:'+id, pass, (err) => {
		return cb(err);
	});
}

exports.getUser = (id, cb) => {
  client.get('user:'+id, (err, reply) => {
    if (err) return cb(err, null);
    else if(reply) return cb(null, {
				username:id,
				password:reply.toString()
			});
    else return cb(null, null);
  });
}

exports.delUser = (id, cb) => {
  client.del('user:'+id, (err, res) => {
    return cb(err, res);
  })
}
