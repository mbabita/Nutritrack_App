package com.nutritrack.backend.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Value("${verification.success.url}")
    private String verificationSuccessUrl;

    @Value("${reset.password.url}")
    private String resetPasswordUrl;

    public void sendVerificationEmail(String toEmail, String verificationToken) {
        String subject = "Email Verification";
        String verificationUrl = frontendUrl + "/verify-email?token=" + verificationToken;
        String body = "Please click the following link to verify your email: " + verificationUrl;

        sendEmail(toEmail, subject, body);
    }

    public void sendPasswordResetEmail(String toEmail, String resetToken) {
        String subject = "Password Reset";
        String resetUrl = resetPasswordUrl + "?token=" + resetToken;
        String body = "Please click the following link to reset your password: " + resetUrl;

        sendEmail(toEmail, subject, body);
    }

    private void sendEmail(String toEmail, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }
}
