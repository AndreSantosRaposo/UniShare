const { JsonWebTokenError } = require("jsonwebtoken");
const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");

//Inacabado, esta função é para verificar se a disciplina mostrada está nos favoritos, para poder ver se a estrela fica preenchida ou não
async function getFavourite(req,res){
    const user = await User.findById(req.user.userId);
    res.json({favourites: user.favourites});
}

async function addFavourite(req, res) {
    try {
        const user = await User.findById(req.user.userId);
        const cadeiraId = req.body.disciplinaID;

        // Check if the user exists
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: 'User not found' });
        }


        // Add the cadeiraId to the favourites array if it's not already there
        const updatedUser = await User.findByIdAndUpdate(
            req.user.userId,
            { $addToSet: { favourites: cadeiraId } },  // $addToSet ensures no duplicates
            { new: true }  // Returns the updated document
        );


        res.json({ msg: 'Added to favourites', favourites: updatedUser.favourites });
    } catch (error) {
        console.error('Error in addFavourite:', error);  // Log the actual error
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Server error', error: error.message });
    }
}

async function removeFavourite(req,res){
    const user = await User.findById(req.user.userId);
    const cadeiraId = req.body.disciplinaID;

    // Check if the user exists
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: 'User not found' });
    }
    const updatedUser = await User.findByIdAndUpdate(
        req.user.userId,
        { $pull: { favourites: cadeiraId } },  // $pull removes the specified value from the array
        { new: true }  // Returns the updated document
    );

    res.json({ msg: 'Removed from favourites', favourites: updatedUser.favourites });
}

async function getUserInfo(req,res){
    const user = await User.findById(req.user.userId)
    res.json({firstName:user.firstName,lastName:user.lastName,username:user.username,email:user.email});
}

module.exports={getFavourite,addFavourite,removeFavourite,getUserInfo};
