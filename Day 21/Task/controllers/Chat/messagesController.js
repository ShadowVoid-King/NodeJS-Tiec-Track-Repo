const { usersData } = require("../../models/users");
const { messagesData } = require("../../models/messages");

// GET /chat/history?user=<username>&friend=<friendUsername>
const getHistory = async (req, res) => {
  try {
    const { user, friend } = req.query;
    if (!user || !friend) {
      return res.status(400).json({ message: "user and friend are required" });
    }

    const [userDoc, friendDoc] = await Promise.all([
      usersData.findOne({ username: user }).select("_id username"),
      usersData.findOne({ username: friend }).select("_id username"),
    ]);

    if (!userDoc || !friendDoc) {
      return res.status(404).json({ message: "User not found" });
    }

    const messages = await messagesData
      .find({
        $or: [
          { sender: userDoc._id, receiver: friendDoc._id },
          { sender: friendDoc._id, receiver: userDoc._id },
        ],
      })
      .sort({ createdAt: 1 })
      .lean();

    const normalized = messages.map((m) => ({
      from: m.sender.toString() === userDoc._id.toString() ? user : friend,
      to: m.receiver.toString() === userDoc._id.toString() ? user : friend,
      message: m.message,
      createdAt: m.createdAt,
    }));

    res.json({ messages: normalized });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getHistory };
