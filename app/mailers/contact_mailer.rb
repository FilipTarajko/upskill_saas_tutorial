class ContactMailer < ActionMailer::Base
    default to: 'filiptarajko+projekty@gmail.com'
    
    def contact_email(name, email, body)
        @name = name
        @email = email
        @body = body
        mail(from: email, subject: 'Contact Form Message')
    end
end

ActionMailer::Base.smtp_settings = {
  :port           => ENV['MAILGUN_SMTP_PORT'],
  :address        => ENV['MAILGUN_SMTP_SERVER'],
  :user_name      => ENV['MAILGUN_SMTP_LOGIN'],
  :password       => ENV['MAILGUN_SMTP_PASSWORD'],
  :domain         => 'fierce-sea-37170.herokuapp.com',
  :authentication => :plain,
}
ActionMailer::Base.delivery_method = :smtp