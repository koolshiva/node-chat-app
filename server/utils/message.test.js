var expect = require('expect');
var message = require('./message');
describe('generateMessage',()=>{
  it('should generate correct message object',()=>{
    var from = 'shiva',text = 'hello';
    var res = message.generateMessage(from,text);

    expect(res.createdAt).toBeA('number');
    expect(res).toInclude({from,text});
  });
});
