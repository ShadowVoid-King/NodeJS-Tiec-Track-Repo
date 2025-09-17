const { friendsData } = require("../../models/friends");
const { usersData } = require("../../models/users");

// Get friends list
const getFriends = async (req, res) => {
  try {
    const { username } = req.query; // from frontend localStorage
    const user = await friendsData.findOne({ username });

    if (!user) return res.json({ friends: [] });

    res.json({ friends: user.friends });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add friend
const addFriend = async (req, res) => {
  try {
    const { username, friendUsername } = req.body;

    // Check if friend exists in users collection
    const friendExists = await usersData.findOne({ username: friendUsername });
    if (!friendExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add both ways
    await friendsData.updateOne(
      { username },
      { $addToSet: { friends: friendUsername } },
      { upsert: true }
    );
    await friendsData.updateOne(
      { username: friendUsername },
      { $addToSet: { friends: username } },
      { upsert: true }
    );

    res.json({ message: `${friendUsername} added successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getFriends, addFriend };
