# Notification Provider

This notification provider is used to send notifications like email, push messages, sms etc. This povider can be used inside any module.

###Usage:
Import index.ts present inside notificationsProvider into the module where it has to be used.

For all kind of notifications:
####### import * as NotificatonProvider from '@shared/notificationsProvider/index.ts'

To use only email notifications:
####### import { EmailNotificationProvider } from '@shared/notificationsProvider/index.ts'

1. To send email notification:

Call the below function:

EmailNotificationProvider.sendEmail(res, templatePath, templateObject, sendTo, subject)

Function Variable details:

res - Response object
templatePath - Path of the email template(this will be used as email content)
templateObject - Contains all the values for variables that are used in email template
sendTo - Email address of the recipient
subject - subject of the email to be sent