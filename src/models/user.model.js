export default class User{
    constructor(email, password, name, userId, bookmarks=[]){
        this.id = userId
        this.name = name;
        this.email = email;
        this.password = password;
        this.bookmarks = bookmarks
    }
    static createUser(email, password, name, userId){
        const user = new User(email, password, name, userId);
        users.push(user);
    }
    static getUserByEmail(email){
        const user = users.find((entry)=>{
            return entry.email == email
        })
        return user;
    }
    static getUserById(id){

        const user = users.find((entry)=>{
            return entry.id == id
        })
        return user;
    }
    //TODO: only for dev - remove before pushing
    static getUsers(){
        return users
    }
}
let users = [
    new User('nj@gmail.com', 'tobechanged', 'sample1', '1x0')
]