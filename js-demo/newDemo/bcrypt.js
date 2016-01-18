var bcrypt = require('bcrypt');

bcrypt.genSalt(function (error, salt) {
	if (error) {
		console.log(error);
		return;
	}

	console.log("salt:" + salt);

    bcrypt.hash('ABCDE', salt, function (error, hash) {
		if (error) {
			console.log(error);
			return;
		}

        console.log("hash:" + hash);

		bcrypt.compare('ABCDE', hash, function (err, res) {
			console.log("res:" + res)
		});
    });
});