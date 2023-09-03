package Services

import (
	"fmt"
	"io/ioutil"
	"net/smtp"
	"os"
)

type EmailService struct {
	SMTPServer   string
	SMTPPort     int
	SMTPUsername string
	SMTPPassword string
}

func NewEmailService() *EmailService {
	return &EmailService{
		SMTPServer:   os.Getenv("SMTP_SERVER"),
		SMTPPort:     587, // You can customize the port if needed
		SMTPUsername: os.Getenv("SMTP_USERNAME"),
		SMTPPassword: os.Getenv("SMTP_PASSWORD"),
	}
}

// Send sends an email with an os.File as an attachment.
func (es *EmailService) Send(from, to, subject, body string, attachment *os.File) error {
	// Compose the email message
	msg := "Subject: " + subject + "\r\n"
	msg += "To: " + to + "\r\n"
	msg += "From: " + from + "\r\n"
	msg += "MIME-Version: 1.0\r\n"
	msg += "Content-Type: multipart/mixed; boundary=boundary123\r\n"
	msg += "\r\n"

	// Add the email body
	msg += "--boundary123\r\n"
	msg += "Content-Type: text/plain; charset=\"utf-8\"\r\n"
	msg += "\r\n" + body + "\r\n"

	// Add the file attachment
	msg += "--boundary123\r\n"
	msg += "Content-Type: application/octet-stream\r\n"
	msg += "Content-Disposition: attachment; filename=\"" + attachment.Name() + "\"\r\n"
	msg += "\r\n"

	// Read the attachment file and include its content in the email
	attachmentContent, err := ioutil.ReadAll(attachment)
	if err != nil {
		return err
	}
	msg += string(attachmentContent) + "\r\n"

	// End the email
	msg += "--boundary123--"

	// Establish a connection to the SMTP server
	auth := smtp.PlainAuth("", es.SMTPUsername, es.SMTPPassword, es.SMTPServer)
	err = smtp.SendMail(fmt.Sprintf("%s:%d", es.SMTPServer, es.SMTPPort), auth, from, []string{to}, []byte(msg))
	if err != nil {
		return err
	}

	return nil
}
