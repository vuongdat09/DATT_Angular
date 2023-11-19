import { signupSchema ,signinSchema , updateUserSchema } from "../Schemas/auth";
import bcryptjs from "bcryptjs";
import User from "../models/user";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const {name, email,gender,dateOfBirth, password , confirmPassword} = req.body;
    const body = {
      name,
      email,
      gender,
      dateOfBirth,
      password,
      confirmPassword,
    }
    const { error } = signupSchema.validate(body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ message: errors });
    }

    const userExist = await User.findOne({ email: body.email });
    if (userExist) {
      return res.status(400).json({ message: "email đã tồn tại" });
    }

    const hashedPassword = await bcryptjs.hash(body.password, 10);
    console.log( body.password);

    const user = await User.create({
      name: body.name,
      email: body.email,
      gender: body.gender,
      dateOfBirth: body.dateOfBirth,
      password: hashedPassword,
    });

    const accessToken = jwt.sign({ _id: user._id }, "tiendatne", {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "đăng ký thành công",
      accessToken,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, gender, dateOfBirth } = req.body;
    const body = {
      name,
      email,
      gender,
      dateOfBirth,
    };

    const id = req.params.id; // Lấy id từ param
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    // Cập nhật thông tin người dùng
    user.name = body.name;
    user.email = body.email;
    user.gender = body.gender;
    user.dateOfBirth = body.dateOfBirth;

    await user.save(); // Lưu thông tin cập nhật

    return res.status(200).json({
      message: 'Cập nhật người dùng thành công', // Trả về token hiện tại
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id)
    if(!user){
      return res.status(400).json({message:"tài khoản không tồn tại"})
    }
    return res.json({message: user})
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

export const signin = async (req, res) => {
    try {
        const {email,password} = req.body;
        const {error} = signinSchema.validate(req.body, {expiresIn:false})
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json({message: errors})
        }
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({
                message: "bạn chưa đăng ký"
            })
        }

        const isMatch = await bcryptjs.compare(password, user.password)
        console.log(password);
        
        if (!isMatch) {
            return res.status(404).json({
                message :"mật khẩu không đúng"
            })
        }

        const accessToken =  jwt.sign({_id: user._id},"tiendatne",{expiresIn: "1d"})
        return res.status(200).json({
            message:"đăng nhập thành công",
            accessToken,
            user
        })
    } catch (error) {
        return res.status(400).json({
            message:error.message
        })
    }
}