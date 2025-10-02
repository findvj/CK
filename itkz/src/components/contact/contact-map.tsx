import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin } from 'lucide-react'

export function ContactMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Find Us
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          {/* Google Maps Embed */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.210881960074!2d72.81472237514484!3d18.96045558222044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf86b48e7193%3A0xe77d4e48313fdf61!2sBhupati%20Info%20Solution%20LLP!5e1!3m2!1sen!2sin!4v1759064800913!5m2!1sen!2sin" 
            width="100%" 
            height="256" 
            style={{border: 0}} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-64 rounded-b-lg"
          />
        </div>
      </CardContent>
    </Card>
  )
}
