var test = require('node:test'),
    assert = require('node:assert/strict'),
    Readable = require('node:stream').Readable,
    Writable = require('node:stream').Writable,
    handleRequest = require('../app').handleRequest;

var runRequest = function(options, body) {
    return new Promise(function(resolve, reject) {
        var req = Readable.from(body ? [body] : []);

        req.method = options.method;
        req.url = options.path;
        req.headers = options.headers || {};

        var responseBody = '';
        var res = new Writable({
            write: function(chunk, encoding, callback) {
                responseBody += chunk.toString();
                callback();
            }
        });

        res.writeHead = function(statusCode, statusMessage, headers) {
            res.statusCode = statusCode;
            res.statusMessage = statusMessage;
            res.headers = headers || {};
        };

        res.end = function(chunk) {
            if (chunk) {
                responseBody += chunk.toString();
            }

            resolve({
                statusCode: res.statusCode,
                body: responseBody
            });
        };

        try {
            handleRequest(req, res);
        } catch (error) {
            reject(error);
        }
    });
};

test('GET / returns the sample page', async function() {
    var response = await runRequest({
        method: 'GET',
        path: '/'
    });

    assert.equal(response.statusCode, 200);
    assert.match(response.body, /Elastic Beanstalk/);
});

test('POST / returns OK', async function() {
    var response = await runRequest({
        method: 'POST',
        path: '/'
    }, 'unit test message');

    assert.equal(response.statusCode, 200);
    assert.equal(response.body, '');
});

test('POST /scheduled returns OK', async function() {
    var response = await runRequest({
        method: 'POST',
        path: '/scheduled',
        headers: {
            'x-aws-sqsd-taskname': 'task1',
            'x-aws-sqsd-scheduled-at': '2026-05-20T00:00:00Z'
        }
    });

    assert.equal(response.statusCode, 200);
    assert.equal(response.body, '');
});
