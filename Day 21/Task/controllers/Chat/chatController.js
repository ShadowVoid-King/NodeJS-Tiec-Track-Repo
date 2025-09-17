const chatController = (req, res) => {
    try {
        res.render('Chat/chat.ejs');
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { chatController };