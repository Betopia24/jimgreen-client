"use client"
import HeaderBanner from '@/components/ui/banner/HeaderBanner'
import Container from '@/lib/Container'
import { FileText, Mail, MapPin, Phone } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { useForm } from 'react-hook-form';

function Contact() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });


  const maxLength = 100;
  const messageValue = watch('message') || '';

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
    reset();
    // Add your form submission logic here
  };
  return (
    <div className='relative'>
      <HeaderBanner title="Contact Us"/>
      <Container>
        <div className="flex flex-col md:flex-row items-center rounded-lg my-14 px-2 lg:px-0">
          {/* Map Section */}
          <div className="w-full md:w-1/2 h-64 md:h-[447px] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.5267489814395!2d90.3910207!3d23.8103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ4JzM3LjEiTiA5MMKwMjMnMjcuNyJF!5e0!3m2!1sen!2sbd!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 rounded-lg"
            />
          </div>

          {/* Contact Info Section */}
          <div className="w-full md:w-1/2 p-8 lg:p-30 flex flex-col justify-center">
            <div className="w-fit">
              <h3 className="text-3xl md:text-4xl font-medium text-[#2D2D2D] mb-1">
                Contact Info
              </h3>
              <Separator className="bg-[#000000] h-[3px] w-full" />
            </div>
            <div className="space-y-4 mt-2">
              {/* Phone */}
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-gray-600 mt-1 flex-shrink-0" />
                <p className="text-[16px] text-[#636F85] mb-1">Phone</p>
                <p className="text-[16px] text-[#636F85]">+10 328 456 289</p>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-gray-600 mt-1 flex-shrink-0" />
                <p className="text-[16px] text-[#636F85] mb-1">Email</p>
                <p className="text-[16px] text-[#636F85]">XYZ12345@gmail.com</p>
              </div>
              {/* Fax */}
              <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-gray-600 mt-1 flex-shrink-0" />
                <p className="text-[16px] text-[#636F85] mb-1">Fax</p>
                <p className="text-[16px] text-[#636F85]">+12345678910</p>
              </div>
              <Separator className='h-[2px] bg-[#D1D6DB]' />
              {/* Address */}
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-600 mt-1 flex-shrink-0" />
                <p className="text-[16px] text-[#636F85] mb-1">Our Address</p>
                <p className="text-[16px] text-[#636F85]">
                  Hem, South Borolian,<br />
                  Dhaka Bangladesh 1212
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* message part  */}
        <div className="p-6 md:p-8">
          <div className="w-fit mb-6">
            <h3 className="text-3xl md:text-4xl font-medium text-[#2D2D2D] mb-1">
              Leave a Message
            </h3>
            <Separator className="bg-[#000000] h-[3px] w-full" />
          </div>
          <div className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Your Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-[16px] font-medium text-[#2D2D2D] mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', {
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    }
                  })}
                  placeholder="Md Shakil"
                  className={`hover:shadow-[0_0_10px_rgba(0,0,0,0.1)] w-full px-4 text-[16px] text-[#636F85] py-3 border border-[#D1D6DB] rounded-md focus:ring-1 focus:ring-purple-500 focus:border-transparent outline-none transition ${errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Your Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-[16px] font-medium text-[#2D2D2D] mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  placeholder="xyz12345@gmail.com"
                  className={`hover:shadow-[0_0_10px_rgba(0,0,0,0.1)] w-full px-4 text-[16px] text-[#636F85] py-3 border border-[#D1D6DB] rounded-md focus:ring-1 focus:ring-purple-500 focus:border-transparent outline-none transition ${errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="block text-[16px] font-medium text-[#2D2D2D] mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                {...register('subject', {
                  required: 'Subject is required',
                  minLength: {
                    value: 3,
                    message: 'Subject must be at least 3 characters'
                  }
                })}
                placeholder="alexa.mate@example.com"
                className={`hover:shadow-[0_0_10px_rgba(0,0,0,0.1)] w-full px-4 text-[16px] text-[#636F85] py-3 border border-[#D1D6DB] rounded-md focus:ring-1 focus:ring-purple-500 focus:border-transparent outline-none transition ${errors.subject ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <div className="relative">
                <textarea
                  id="message"
                  {...register('message', {
                    required: 'Message is required',
                    minLength: {
                      value: 10,
                      message: 'Message must be at least 10 characters'
                    },
                    maxLength: {
                      value: maxLength,
                      message: `Message cannot exceed ${maxLength} characters`
                    }
                  })}
                  placeholder="Your Message"
                  className={`hover:shadow-[0_0_10px_rgba(0,0,0,0.1)] w-full px-4 text-[16px] text-[#636F85] py-3 border border-[#D1D6DB] rounded-md focus:ring-1 focus:ring-purple-500 focus:border-transparent outline-none transition ${errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                <div className="absolute bottom-3 right-3 text-sm text-gray-500">
                  {messageValue.length}/{maxLength}
                </div>
              </div>
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                onClick={handleSubmit(onSubmit)}
                className="p-3 bg-primaryBgColor hover:bg-bg-primaryBgColor text-[#FFFFFF] font-medium rounded-[6px] transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Contact

