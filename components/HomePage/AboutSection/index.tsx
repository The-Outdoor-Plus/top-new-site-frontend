'use client';
import Image from 'next/image';

export function AboutSection() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-20">
      <div className="col-span-2 md:col-span-1 flex items-center justify-center">
        <Image src="/images/made_in_the_usa.png" alt="Made In The USA" width={500} height={500} />
      </div>
      <div className="col-span-2 md:col-span-3 flex items-center justify-center">
        <p className="text-base font-extralight">
          When you buy from us, you can trust that you’re getting high-quality products that are made in the USA. We take pride in the craftmanship and durability of our products, which are built to last and withstand the elements. Our fire pans, burners, and ignition systems are designed by professionals with years of experience in the industry.
          <br />
          <br />
          Our team has over 60 years of combined experience in designing, manufacturing, and installing fire features. We know what it takes to create a great fire pit, and we’re dedicated to providing our customers with the best products on the market. We also have a team of experts who are ready and willing to assist you whenever you need help. Whether you have a question about installation or need help troubleshooting an issue, our team is here to help. Just give us a call and we’ll be happy to assist you.
          <br />
          <br />
          We’re committed to providing you with the best products and customer service in the industry. We stand behind our products and are confident that you’ll love what you receive from us.
        </p>
      </div>
    </div>
  );
}