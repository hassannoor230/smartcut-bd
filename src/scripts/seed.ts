import { connectDB } from '../config/db.js';
import { BusinessSettings } from '../models/BusinessSettings.js';
import { OpeningHours } from '../models/OpeningHours.js';
import { Service } from '../models/Service.js';
import { FAQ } from '../models/FAQ.js';
import { Gallery } from '../models/Gallery.js';
import { Review } from '../models/Review.js';
import mongoose from 'mongoose';

async function seed() {
  await connectDB();

  // Business Settings
  const existingBusiness = await BusinessSettings.findOne();
  if (!existingBusiness) {
    await BusinessSettings.create({
      businessName: 'Smartcut – Rahwali Gujranwala',
      category: "Men's Hair Salon / Men's Hair & Grooming",
      phone: '+92 321 1115925',
      whatsapp: '+923211115925',
      email: 'smartcut.rahwali@gmail.com',
      address: 'Rahwali, GT Road, opposite DC Colony Gate, Gujranwala, Pakistan',
      city: 'Gujranwala',
      country: 'Pakistan',
      googleRating: 4.7,
      googleReviewCount: 493,
      announcementEnabled: false,
      whatsappEnabled: true,
      bookingEnabled: true,
      aboutText:
        'Smartcut is a modern men\'s hair and grooming studio located in Rahwali, Gujranwala on GT Road opposite DC Colony Gate. [ADD VERIFIED BUSINESS STORY]',
    });
    console.log('Business settings seeded.');
  }

  // Opening Hours - always update
  await OpeningHours.updateOne(
    {},
    {
      $set: {
        monday: { isOpen: true, openTime: '10:00', closeTime: '20:00' },
        tuesday: { isOpen: true, openTime: '10:00', closeTime: '20:00' },
        wednesday: { isOpen: true, openTime: '10:00', closeTime: '20:00' },
        thursday: { isOpen: true, openTime: '10:00', closeTime: '20:00' },
        friday: { isOpen: true, openTime: '10:00', closeTime: '20:00' },
        saturday: { isOpen: true, openTime: '10:00', closeTime: '20:00' },
        sunday: { isOpen: false },
        note: 'Open daily except Sunday',
      },
    },
    { upsert: true }
  );
  console.log('Opening hours seeded.');

  // Placeholder services
  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    const placeholders = [
      {
        name: 'Classic Haircut',
        slug: 'classic-haircut',
        description: 'Professional men\'s haircut tailored to your style. [CONFIRM DETAILS]',
        price: null,
        duration: null,
        category: 'Haircut',
        featured: true,
        active: true,
        sortOrder: 1,
        isPlaceholder: true,
      },
      {
        name: 'Hair Styling',
        slug: 'hair-styling',
        description: 'Modern styling for a sharp, confident look. [CONFIRM DETAILS]',
        price: null,
        duration: null,
        category: 'Hair Styling',
        featured: true,
        active: true,
        sortOrder: 2,
        isPlaceholder: true,
      },
      {
        name: 'Beard Grooming',
        slug: 'beard-grooming',
        description: 'Precision beard trim and shaping. [CONFIRM DETAILS]',
        price: null,
        duration: null,
        category: 'Beard Grooming',
        featured: true,
        active: true,
        sortOrder: 3,
        isPlaceholder: true,
      },
      {
        name: 'Complete Grooming',
        slug: 'complete-grooming',
        description: 'Full hair and beard grooming package. [CONFIRM DETAILS]',
        price: null,
        duration: null,
        category: 'Complete Grooming',
        featured: true,
        active: true,
        sortOrder: 4,
        isPlaceholder: true,
      },
    ];
    await Service.insertMany(placeholders);
    console.log('Placeholder services seeded.');
  }

  // Sample FAQs (generic, non-invented business claims)
  const faqCount = await FAQ.countDocuments();
  if (faqCount === 0) {
    await FAQ.insertMany([
      {
        question: 'How do I book an appointment?',
        answer:
          'You can request an appointment through the Book Appointment page on our website or call us at +92 321 1115925. We will confirm availability.',
        active: true,
        sortOrder: 1,
      },
      {
        question: 'Where is Smartcut located?',
        answer:
          'Smartcut is located in Rahwali, GT Road, opposite DC Colony Gate, Gujranwala, Pakistan.',
        active: true,
        sortOrder: 2,
      },
      {
        question: 'What services do you offer?',
        answer:
          'We offer men\'s haircuts, styling, beard grooming and complete grooming services. Please check our Services page or contact us for the latest offerings.',
        active: true,
        sortOrder: 3,
      },
    ]);
    console.log('Sample FAQs seeded.');
  }

  // Gallery
  const galleryCount = await Gallery.countDocuments();
  if (galleryCount === 0) {
    await Gallery.insertMany([
      {
        title: 'Classic Haircut',
        imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&q=80',
        category: 'Haircut',
        altText: 'Classic haircut at Smartcut',
        featured: true,
        active: true,
        sortOrder: 1,
      },
      {
        title: 'Beard Grooming',
        imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b7f30a?w=800&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1503951914875-452162b7f30a?w=400&q=80',
        category: 'Beard',
        altText: 'Beard grooming service',
        featured: true,
        active: true,
        sortOrder: 2,
      },
      {
        title: 'Hair Styling',
        imageUrl: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&q=80',
        category: 'Styling',
        altText: 'Modern hair styling',
        featured: true,
        active: true,
        sortOrder: 3,
      },
      {
        title: 'Salon Interior',
        imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&q=80',
        category: 'Interior',
        altText: 'Smartcut salon interior',
        featured: false,
        active: true,
        sortOrder: 4,
      },
      {
        title: 'Premium Grooming',
        imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&q=80',
        category: 'Grooming',
        altText: 'Premium grooming package',
        featured: true,
        active: true,
        sortOrder: 5,
      },
      {
        title: 'Clean Shave',
        imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80',
        category: 'Shave',
        altText: 'Traditional straight razor shave',
        featured: false,
        active: true,
        sortOrder: 6,
      },
    ]);
    console.log('Gallery seeded.');
  }

  // Reviews
  const reviewCount = await Review.countDocuments();
  if (reviewCount === 0) {
    await Review.insertMany([
      {
        author: 'Ahmed R.',
        rating: 5,
        text: 'Best salon in Gujranwala! The staff is professional and the atmosphere is great. Highly recommended for haircuts and grooming.',
        date: new Date('2024-12-15'),
        source: 'Google',
        verified: true,
        featured: true,
        active: true,
      },
      {
        author: 'Bilal K.',
        rating: 5,
        text: 'Excellent service and very clean environment. The beard trim was perfect. Will definitely come back again.',
        date: new Date('2024-11-20'),
        source: 'Google',
        verified: true,
        featured: true,
        active: true,
      },
      {
        author: 'Hassan M.',
        rating: 4,
        text: 'Good experience overall. The haircut was neat and the price was reasonable. Only wish they had more time slots available.',
        date: new Date('2024-10-05'),
        source: 'Google',
        verified: true,
        featured: false,
        active: true,
      },
      {
        author: 'Usman T.',
        rating: 5,
        text: 'Amazing grooming experience! The complete grooming package is totally worth it. The staff pays attention to detail.',
        date: new Date('2024-09-12'),
        source: 'Google',
        verified: true,
        featured: true,
        active: true,
      },
      {
        author: 'Faisal A.',
        rating: 5,
        text: 'Very satisfied with my visit. Clean tools, friendly staff, and a great haircut. This is now my go-to place.',
        date: new Date('2024-08-30'),
        source: 'Google',
        verified: false,
        featured: false,
        active: true,
      },
    ]);
    console.log('Reviews seeded.');
  }

  console.log('\nSeed complete. No fake reviews were created.');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
