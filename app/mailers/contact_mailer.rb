class ContactMailer < ActionMailer::Base
    default to: 'filiptarajko+projekty@gmail.com'
    
    def contact_email(name, email, body)
        @name = name
        @email = email
        @body = body
        mail(from: 'filiptarajko@gmail.com', subject: 'Message from Heroku Website')
    end
end

