import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useToast } from '@/hooks/use-toast';
import { Send, Upload } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    committee: '',
    membershipType: '',
  });
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPaymentProof(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create form data to send to backend
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('committee', formData.committee);
      formDataToSend.append('membershipType', formData.membershipType);
      
      // Add payment proof if exists
      if (paymentProof) {
        formDataToSend.append('image', paymentProof);
      }

      // Get API URL from environment variable
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      // Send data to backend API
      const response = await fetch(`${apiUrl}/api/form`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: 'Success!',
          description: "We've received your application. We'll contact you soon!",
        });
        // Reset form
        setFormData({
          fullName: '',
          phone: '',
          committee: '',
          membershipType: '',
        });
        setPaymentProof(null);
        setPreviewUrl(null);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit your application. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const committees = [
    'HR',
    'Marketing',
    'PR & FR',
    'PM',
    'GFX',
    'Logistics',
    'PT',
  ];

  
  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 slide-up">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Join <span className="text-gradient">Orientation</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Fill the form below to join or reconnect with our community
            </p>
          </div>

          <div className="slide-up bg-card rounded-2xl p-8 border border-border/50 shadow-[var(--shadow-card)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-foreground font-medium">
                  Full Name <span className="text-primary">*</span>
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="bg-background border-border focus:border-primary transition-colors duration-300"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground font-medium">
                  Phone Number <span className="text-primary">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-background border-border focus:border-primary transition-colors duration-300"
                />
              </div>

              {/* Committee */}
              <div className="space-y-2">
                <Label htmlFor="committee" className="text-foreground font-medium">
                  Committee <span className="text-primary">*</span>
                </Label>
                <Select
                  required
                  value={formData.committee}
                  onValueChange={(value) => setFormData({ ...formData, committee: value })}
                >
                  <SelectTrigger className="bg-background border-border focus:border-primary transition-colors duration-300">
                    <SelectValue placeholder="Select a committee" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {committees.map((committee) => (
                      <SelectItem key={committee} value={committee} className="focus:bg-primary/10">
                        {committee}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Membership Type */}
              <div className="space-y-2">
                <Label htmlFor="membershipType" className="text-foreground font-medium">
                  Membership Type <span className="text-primary">*</span>
                </Label>
                <Select
                  required
                  value={formData.membershipType}
                  onValueChange={(value) => setFormData({ ...formData, membershipType: value })}
                >
                  <SelectTrigger className="bg-background border-border focus:border-primary transition-colors duration-300">
                    <SelectValue placeholder="Select membership type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="new" className="focus:bg-primary/10">
                      New Member
                    </SelectItem>
                    <SelectItem value="old" className="focus:bg-primary/10">
                      Old Member
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Payment Proof Upload */}
              <div className="space-y-2">
                <Label htmlFor="paymentProof" className="text-foreground font-medium">
                  Payment Proof <span className="text-primary">*</span>
                </Label>
                <div className="flex items-center space-x-4">
                  <label className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-center px-4 py-6 bg-background border-2 border-dashed border-border rounded-lg hover:border-primary transition-colors duration-300">
                      <div className="text-center">
                        <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          {paymentProof ? paymentProof.name : 'Click to upload payment proof'}
                        </p>
                      </div>
                      <Input
                        id="paymentProof"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        required
                      />
                    </div>
                  </label>
                </div>
                
                {/* Image Preview */}
                {previewUrl && (
                  <div className="mt-4">
                    <img 
                      src={previewUrl} 
                      alt="Payment proof preview" 
                      className="max-h-40 rounded-lg object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover-glow group py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Submitting...'
                ) : (
                  <>
                    Apply Now
                    <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;