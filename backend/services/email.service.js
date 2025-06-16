const sgMail = require('@sendgrid/mail');

class EmailService {
    constructor() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    }

    async send(to, subject, message) {
        try {
            const messageOption = {
                to,
                from: `${process.env.SENDGRID_EMAIL}`,
                subject,
                html: message,
            };

            await sgMail.send(messageOption);
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = EmailService;
