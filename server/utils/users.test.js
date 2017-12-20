const expect = require('expect');
const Users = require('./users');

describe('Users',()=>{
  var users;

  beforeEach(()=>{
    users = new Users.Users();
    users.users = [
                    {id:"1",name:"frodo",room:"shire"},
                    {id:"2",name:"drogo",room:"shire"},
                    {id:"3",name:"brolo",room:"bree"}
                  ];
  });

  // it('should add new user to users array and return added user',()=>{
  //   var users = new Users.Users();
  //   var user = {id:"123",name:"frodo",room:"shire"};
  //   var res = users.addUser(user.id,user.name,user.room);
  //   expect(users.users).toEqual([user]);
  // });

  it('should remove a user',()=>{
    var res = users.removeUser(2);
    expect(users.users.length).toBe(2);
  });

  it('should get a user',()=>{
    var res = users.getUser(2);
    expect(res).toEqual({id:"2",name:"drogo",room:"shire"});
  });

  it('should get user list',()=>{
    var res = users.getUserList("shire");
    expect(res.length).toBe(2);
  });
});
