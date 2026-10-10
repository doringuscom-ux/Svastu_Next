import dbConnect from '@/lib/db';
import Contact from '@/models/Contact';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, email, phone, state, problem, date, time } = body;

    if (!name || !email || !phone || !problem) {
      return NextResponse.json({ message: 'Name, email, phone, and problem are required' }, { status: 400 });
    }

    const newContact = new Contact({
      name, email, phone, state, problem, date, time
    });

    const savedContact = await newContact.save();

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (scriptUrl && adminEmail) {
      try {
        const htmlMessage = `
          <h2>New Consultation Request</h2>
          <table border="1" cellpadding="8" style="border-collapse: collapse;">
            <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
            <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
            <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
            <tr><td><strong>State:</strong></td><td>${state || 'N/A'}</td></tr>
            <tr><td><strong>Problem:</strong></td><td>${problem}</td></tr>
            <tr><td><strong>Date:</strong></td><td>${date || 'N/A'}</td></tr>
            <tr><td><strong>Time:</strong></td><td>${time || 'N/A'}</td></tr>
          </table>
        `;

        // Support multiple comma-separated emails
        const recipients = adminEmail.split(',').map(e => e.trim()).filter(Boolean).join(',');

        const formData = new URLSearchParams();
        formData.append('to', recipients);
        formData.append('subject', 'New Contact Form Submission - S Vastu');
        formData.append('message', htmlMessage);

        await fetch(scriptUrl, {
          method: 'POST',
          body: formData,
        });
      } catch (scriptErr) {
        console.error('Failed to send notification via Google Script:', scriptErr);
      }
    }

    return NextResponse.json(savedContact, { status: 201 });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const contacts = await Contact.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ message: 'Failed to fetch contacts' }, { status: 500 });
  }
}
