const expect = require('expect');
var validation = require('./validation.js');
describe('isRealString',()=>{
  it('should return true if called with a valid string',()=>{
    var strInput = "Shire";
    var res = validation.isRealString(strInput);
    expect(res).toBe(true);
  });

  it('should return false if called with an invalid string',()=>{
    var strInput = 1234;
    var res = validation.isRealString(strInput);
    expect(res).toBe(false);
  })
});
