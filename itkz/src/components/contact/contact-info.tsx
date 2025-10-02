import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'

export function ContactInfo() {
  const contactDetails = [
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      details: ["+91 7977186317", "+91 9876543210"],
      action: "tel:+917977186317"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      details: ["support@bhupatiitsolution.com", "sales@bhupatiitsolution.com"],
      action: "mailto:support@bhupatiitsolution.com"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Address",
      details: [
        "Bhupati Info Solution LLP",
        "Aditya Arcade, Topiwala Ln",
        "Grant Road (E), Shapur Baug",
        "Grant Road, Mumbai",
        "Maharashtra 400007, India"
      ],
      action: "https://maps.google.com/?q=Aditya+Arcade+Topiwala+Ln+Grant+Road+E+Shapur+Baug+Grant+Road+Mumbai+Maharashtra+400007+India"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Business Hours",
      details: [
        "Monday - Saturday: 10:00 AM - 7:00 PM",
        "Sunday: Closed"
      ],
      action: null
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: "Quick Response",
      details: [
        "WhatsApp: +91 7977186317",
        "Response time: Within 2 hours"
      ],
      action: "https://wa.me/917977186317"
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {contactDetails.map((contact, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              {contact.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm mb-1">{contact.title}</h3>
              <div className="space-y-1">
                {contact.details.map((detail, detailIndex) => (
                  <div key={detailIndex}>
                    {contact.action && detailIndex === 0 ? (
                      <a 
                        href={contact.action}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {detail}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">{detail}</p>
                    )}
                  </div>
                ))}
                {contact.action && contact.title === "Address" && (
                  <a 
                    href={contact.action}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline transition-colors"
                  >
                    View on Google Maps →
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
