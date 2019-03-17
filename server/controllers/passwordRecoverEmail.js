const nodemailer = require("nodemailer");
const oauth = require('../certificate/oauth.json')

 module.exports = {
    recoverUserPW: function(pwrecover) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'nihal.capstone@gmail.com',
            clientId: oauth.client_id,
            clientSecret: oauth.client_secret,
            refreshToken: oauth.refresh_token,
            accessToken: oauth.access_token
        }
    });

    let mailOptions = {
        from: 'nihal.capstone@gmail.com',
        to: pwrecover.email, 
        subject: "Nihal Team ~ Password Recovery",
        html: `<p><h2>Temporary Password: ${pwrecover.temp} <h2></p>
        Please use the above temporary password to login to your account. Once signed in, navigate to the Edit My Info button to change your password.<br>
        <br>Sincerely,<br> The Nihal Team<br>`,
    };


    transporter.sendMail(mailOptions, (e, r) =>{
        if (e) console.log(e);
        else console.log(r);
        transporter.close();
    });

}
};
