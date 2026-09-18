import { User } from "../../database/models/index.js";

// سؤال 1 — Create user (build & save) + check email + handle validation errors

export const signUp = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const userExist = await User.findOne({ where: { email } });
        if (userExist) {
            return res.status(409).json({ message: "Email already exists." });
        }

        const user = User.build({ name, email, password, role });
        await user.save();

        res.status(201).json({ message: "User added successfully." });
    } catch (error) {
        if (
            error.name === "SequelizeValidationError" ||
            error.name === "SequelizeUniqueConstraintError"
        ) {
            return res
                .status(400)
                .json({ errors: error.errors.map((err) => err.message) });
        }
        res.status(400).json({ message: error.message });
    }
};
// سؤال 2 — Create or update based on PK + skip validation
export const createOrUpdateUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.upsert({ id, ...req.body }, { validate: false });

        res.status(200).json({ message: "User created or updated successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// سؤال 3 — Find user by email
export const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.query;
        const user = await User.findOne({
            where: { email },
            attributes: { exclude: ["password"] },
        });

        if (!user) return res.status(404).json({ message: "no user found" });

        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// سؤال 4 — Get user by PK excluding role
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ["role", "password"] },
    });

    if (!user) return res.status(404).json({ message: "no user found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
