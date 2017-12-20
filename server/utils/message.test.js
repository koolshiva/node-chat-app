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

describe('generateLocationMessage',()=>{
  it('should return username, google maps url and date',()=>{
    var from = "admin", url = "https://www.google.com/maps?q=1,1";
    var res = message.generateLocationMessage(from,1,1);
    expect(res.from).toBe(from);
    expect(res.url).toBe(url);
    expect(res.createdAt).toBeA('number');
  });
});
