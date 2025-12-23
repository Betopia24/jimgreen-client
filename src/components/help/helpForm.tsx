'use client';

import { useState } from 'react';

export default function HelpForm() {
    const [formData, setFormData] = useState({
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e : any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitStatus(null);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Form submitted:', formData);
            // setSubmitStatus('success');
            setFormData({ subject: '', message: '' });
        } catch (error) {
            // setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyDown = (e : any) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleSubmit();
        }
    };

    return (
        <div className="py-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-[#2D2D2D] mb-1">
                        Contact Support
                    </h2>
                    <p className="text-sm text-[#636F85]">
                        Can't find what you're for? Send us message.
                    </p>
                </div>

                <div className="space-y-5">
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
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Briefly describe your issue"
                            className="w-full px-3 py-2 text-sm text-[#636F85] border border-[#D1D6DB] rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent placeholder-gray-400"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="message"
                            className="block text-[16px] font-medium text-[#2D2D2D] mb-2"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Briefly describe your issue"
                            rows={5}
                            className="w-full px-3 py-2 text-sm text-[#636F85] border border-[#D1D6DB] rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 resize-none"
                        />
                    </div>

                    {/* {submitStatus === 'success' && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800">
                Message sent successfully!
              </p>
            </div>
          )} */}

                    {submitStatus === 'error' && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-sm text-red-800">
                                Failed to send message. Please try again.
                            </p>
                        </div>
                    )}

                    <button
                        onClick={handleSubmit}
                        // disabled={isSubmitting || !formData.subject || !formData.message}
                        className="w-full bg-[#6E51E0] hover:bg-[#6E51E0] text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </div>
        </div>
    );
}