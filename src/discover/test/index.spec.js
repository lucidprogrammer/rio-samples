const assert = require('assert');
const utilities = require('../utils');

describe('getRoute', function () {
  it('should return the route', function () {
    const route = utilities.getRoute({ 'app': 'some', 'org': 'b' }, utilities.sampleAppMappings);
    assert.equal(route.route, '/some'); 
  });
});