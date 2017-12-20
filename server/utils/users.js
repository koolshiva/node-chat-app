class Users{
  constructor(){
    this.users = [];
  }
  addUser(id,name,room){
    var user = {id,name,room};
    this.users.push(user);
    return user;
  }
  removeUser(id){
    var user = this.users.filter((user)=>user.id==id)[0];
    if(user){
      this.users = this.users.filter((user)=>user.id!=id);
    }
    return user;
  }
  getUser(id){
    var user = this.users.filter((user)=>user.id==id)[0];
    return user;
  }
  getUserList(room){
    var roomUsers = this.users.filter((user)=>user.room==room);
    var usernamesArray = roomUsers.map((user)=>user.name);
    return usernamesArray;
  }
}

module.exports = {Users};
