import User from '@/models/user.model';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if(emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, 
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                });
        }
        else if(emailType === "RESET") {
            await User.findByIdAndUpdate(userId, 
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                });
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "9a7482a56c331a",
              pass: "279ff15b0ac98f"
            }
          });

        const mailOptions = {
            from: "suraj@mail.com", // sender address
            to: email, // list of receivers
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> 
            to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser.
            <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}