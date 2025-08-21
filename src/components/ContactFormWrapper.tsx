'use client';

import { ContactForm } from '@multidots/sanity-plugin-contact-form';
import { ComponentProps } from 'react';

// Extract the exact type that ContactForm expects
type ContactFormProps = ComponentProps<typeof ContactForm>;
type ContactFormData = ContactFormProps['formData'];

export function ContactFormWrapper({ formData }: { formData: ContactFormData }) {
    return <ContactForm formData={formData} />;
}