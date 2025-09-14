const NodeCache = require("node-cache");
const blackListCashe = new NodeCache();
//TODO Refactor from set to redis

const checkTokenInBlackList = (token) => {
    return !blackListCashe.has(token);
}

const getTokenExpiryInSeconds = (tokenExpiry) => {
    const tokenUnite = tokenExpiry[tokenExpiry.length - 1];
    tokenExpiry = Number(tokenExpiry.slice(0, -1));


    if (tokenUnite === 'd') return tokenExpiry * 24 * 60 * 60;
    else if (tokenUnite === 'h') return tokenExpiry * 60 * 60;
    else if (tokenUnite === 'm') return tokenExpiry * 60;
    else if (tokenUnite === 's') return tokenExpiry;

    throw new Error("Unexpected token expiry Format " + tokenExpiry);
}
const addTokenToBlackList = (token) => {
    blackListCashe.set(token, true, getTokenExpiryInSeconds(process.env.NODE_ENV || '1d'));
}


module.exports = {checkTokenInBlackList, addTokenToBlackList};