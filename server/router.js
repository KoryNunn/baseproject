var SeaLion = require('sea-lion');
var Dion = require('dion');

module.exports = function(){
    var router = new SeaLion();
    var dion = new Dion(router);

    router.add({
        '/': dion.serveFile('./static/index.html', 'text/html'),
        '/`path...`': dion.serveDirectory('./static', {
            '.js': 'application/javascript',
            '.css': 'text/css'
        })
    });

    return router;
};