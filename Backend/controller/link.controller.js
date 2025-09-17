const linkModel = require("../model/link.model");
const crypto = require("crypto");

let getAllLinks = async (req, res) => {
    try {
        const result = await linkModel.find();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send({});
    }
};

let getAllPublisherLinks = async (req, res) => {
    try {
        const result = await linkModel.find({
            publisher_email: req.auth_user_data.email,
        });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({});
    }
};

let deleteAllPublisherLinks = async (req, res) => {
    try {
        const result = await linkModel.deleteMany({
            publisher_email: req.auth_user_data.email,
        });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({});
    }
};

let deleteLinkByShorten_link = async (req, res) => {
    try {
        const result = await linkModel.findOneAndDelete({
            shorten_link: req.body.shorten_link,
        });
        if (!result) {
            return res.status(404).json({message: "Link not found"});
        }
        res.status(200).json({message: "Link deleted successfully"});
    } catch (err) {
        res.status(500).send({});
    }
};

let deleteAllLinks = async (req, res) => {
    try {
        const result = await linkModel.deleteMany();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send({});
    }
};

function shortId(url) {
    return crypto
        .createHash("sha256")
        .update(url + Date.now())
        .digest("base64url") // url-safe base64
        .slice(0, 5); // take first 5 chars
}

let createLink = async (req, res) => {
    try {
        const {original_link} = req.body;
        const publisher_email = req.auth_user_data.email;
        const publisher_name = req.auth_user_data.name;

        const shorten_link = shortId(original_link);
        let newLinkModel = new linkModel({
            original_link,
            shorten_link,
            publisher_name,
            publisher_email,
        });
        await newLinkModel.save();
        res.status(200).json({
            message: `Link with shorten_link: ${shorten_link}`,
            original_link: original_link,
            shorten_link: shorten_link,
            publisher_name: publisher_name,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
let forwardLink = async (req, res) => {
    try {
        const shortenLinkId = req.params.linkID;
        const result = await linkModel.findOne({shorten_link: shortenLinkId});
        if (!result) {
            res.status(404).send({message: "link not found"});
            return;
        }
        result.number_of_visitors = result.number_of_visitors + 1;
        console.log(result.number_of_visitors);
        await result.save();

        res.redirect(301, result.original_link);
    } catch (err) {
        res.status(500).send({});
    }
};
let getforwardLink = async (req, res) => {
    try {
        const shortenLinkId = req.params.linkID;
        const result = await linkModel.findOne({shorten_link: shortenLinkId});
        if (!result) {
            res.status(404).send({message: "link not found"});
            return;
        }
        result.number_of_visitors = result.number_of_visitors + 1;
        console.log(result.number_of_visitors);
        await result.save();

        res.status(200).json({original_link: result.original_link})
    } catch (err) {
        res.status(500).send({});
    }
};
let getLink = async (req, res) => {
    try {
        const shortenLinkId = req.params.linkID;
        const result = await linkModel.findOne({shorten_link: shortenLinkId});
        if (!result) {
            res.status(404).send({message: "link not found"});
            return;
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send({});
    }
};
let publisherChangeLink = async (req, res) => {
    try {
        const shortenLinkId = req.params.linkID;
        const new_original_link = req.body.new_original_link;
        const result = await linkModel.findOne({shorten_link: shortenLinkId});
        if (!result) {
            res.status(404).send({message: "link not found"});
            return;
        }
        result.original_link = new_original_link;
        await result.save();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send({});
    }
};
let publisherDeleteLink = async (req, res) => {
    try {
        const shortenLinkId = req.params.linkID;
        const result = await linkModel.findOneAndDelete({
            shorten_link: shortenLinkId,
        });
        if (!result) {
            res.status(404).json({message: "link not found"});
            return;
        }
        res.status(200).json({message: "link deleted successfully"});
    } catch (err) {
        res.status(500).send({});
    }
};
const getPublicVisible = async (req, res) => {
    try {
        const result = await linkModel.find({public_visible: true});
        return res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
}

const setLinkPublic = async (req, res) => {
    try {
        const shortenLinkId = req.params.linkID;
        const result = await linkModel.findOne({shorten_link: shortenLinkId})
        if (!result) {
            return res.status(404).json({error: "Link not found"});
        }
        result.public_visible = true;
        await result.save()
        res.status(200).json({message: "link set successfully"});
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}

const setLinkPrivate = async (req, res) => {
    try {
        const shortenLinkId = req.params.linkID;
        const result = await linkModel.findOne({shorten_link: shortenLinkId})
        if (!result) {
            return res.status(404).json({error: "Link not found"});
        }
        result.public_visible = false;
        await result.save()
        res.status(200).json({message: "link set successfully"});
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}
module.exports = {
    getAllLinks,
    getAllPublisherLinks,
    deleteLinkByShorten_link,
    deleteAllPublisherLinks,
    deleteAllLinks,
    createLink,
    forwardLink,
    getLink,
    publisherChangeLink,
    publisherDeleteLink,
    getforwardLink,
    getPublicVisible,
    setLinkPublic,
    setLinkPrivate
};
