'use client';

import { ContactForm } from '@/components/ContactForm';
import Image from 'next/image';

export const ContactSection = () => {
  return(
    <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-2 px-4">
  <div className="col-span-2 flex justify-center mb-10 lg:mb-0">
      <Image src="/images/homepage/paradise_fall_bg_2.webp" alt="Contact Image" width={500} height={500} className="rounded-lg"/>
      </div>
      <div className="col-span-3">
        <ContactForm />
      </div>
    </div>
  )
}