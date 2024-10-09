// const sessionIdToUserMap = new Map(); // this method is used for statefull authenthication


const jwt = require("jsonwebtoken") // jwt method is used for stateless method means the state is not stored at server side hence less memory at server side 
const secret = "Vb54@63vb75"





function setUser(user) {

    // sessionIdToUserMap.set(id, user)

    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role
    }

    return jwt.sign(payload, secret)

}

function getUser(token) {

    // const user = sessionIdToUserMap.get(id)

    // return sessionIdToUserMap.get(id)
    if (!token) return null
    try {
        return jwt.verify(token, secret)
    } catch (error) {
        console.log(error.message)
        return null
    }

}

module.exports = {
    setUser,
    getUser
}