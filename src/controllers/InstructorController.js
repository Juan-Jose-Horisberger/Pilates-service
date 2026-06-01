const { User, InstructorProfile } = require("../db");

// GET
const getInstructorProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const profile = await InstructorProfile.findOne({
      where: { userId },
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile instructor not found." });
    }

    return res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// POST
const configureInstructor = async (req, res) => {
  try {
    const { userId, schedule, paymentType, paymentValue, description } =
      req.body;

    if (!userId || !schedule || !paymentType || !paymentValue || !description) {
      return res
        .status(400)
        .json({ message: "Error: Not all required data was sent" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.rol !== "INSTRUCTOR") {
      return res
        .status(400)
        .json({ message: "The user does not have an instructor role." });
    }

    let profile = await InstructorProfile.findOne({ where: { userId } });

    if (profile) {
      await profile.update({
        schedule,
        paymentType,
        paymentValue,
        description,
      });
    } else {
      profile = await InstructorProfile.create({
        userId,
        schedule,
        paymentType,
        paymentValue,
        description,
      });
    }

    return res.status(200).json({
      message: "Perfil de instructor configurado correctamente.",
      profile,
    });
  } catch (error) {
    console.error(
      "Internal server error while trying to configure an instructor profile"
    );
    res
      .status(500)
      .json({
        message:
          "Internal server error while trying to configure an instructor profile",
      });
  }
};

module.exports = {
  getInstructorProfile,
  configureInstructor,
};
