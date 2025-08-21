'use client';

import { ContactForm } from '@multidots/sanity-plugin-contact-form';

export function ContactFormWrapper({ formData }: { formData: any }) {
    return <ContactForm formData={formData} />;
}