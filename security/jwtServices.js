const tokenBlackList = new Set()
//TODO Refactor from set to redis

const checkTokenInBlackList = (token) => {
    return !tokenBlackList.has(token);
}

const getTokenExpiryInMillisSeconds = (tokenExpiry) => {
    const tokenUnite = tokenExpiry[tokenExpiry.length - 1];
    tokenExpiry = Number(tokenExpiry.slice(0, -1));


    if (tokenUnite === 'd')      return tokenExpiry * 24 * 60 * 60 * 1000;
    else if (tokenUnite === 'h') return tokenExpiry * 60 * 60 * 1000;
    else if (tokenUnite === 'm') return tokenExpiry * 60 * 1000;
    else if (tokenUnite === 's') return tokenExpiry * 1000;

    throw new Error("Unexpected token expiry Format " + tokenExpiry);
}
const addTokenToBlackList = (token) => {
    setTimeout(() => {
        tokenBlackList.delete(token);
    }, getTokenExpiryInMillisSeconds(process.env.TOKEN_EXPIRY))

    tokenBlackList.add(token);
}


module.exports = {checkTokenInBlackList, addTokenToBlackList};