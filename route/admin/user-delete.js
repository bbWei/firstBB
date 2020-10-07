const { User } = require('../../model/user');

module.exports = async (req, res) => {
    // res.send( req.query.id )
    // return

    await User.findOneAndDelete({_id:req.query.id});

    res.redirect('/admin/user');
}