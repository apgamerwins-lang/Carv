import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate required fields
    const { name, email, phone, vehicle, year, service, budgetRange } = data;

    if (!name || !email || !phone || !vehicle || !year || !service) {
      return NextResponse.json(
        { error: 'Missing required inquiry parameters.' },
        { status: 400 }
      );
    }

    // In production, this can forward to studio CRM, email notifications, or database.
    const inquiryId = `APX-${Date.now().toString().slice(-6)}`;
    const timestamp = new Date().toISOString();

    const loggedInquiry = {
      inquiryId,
      timestamp,
      client: { name, email, phone },
      vehicle: { model: vehicle, year },
      commission: { service, budgetRange, message: data.message || '', specSummary: data.specSummary || '' },
      status: 'RECEIVED_PENDING_ENGINEERING_REVIEW',
    };

    console.log('[APEX STUDIO] New Commission Inquiry Logged:', loggedInquiry);

    return NextResponse.json(
      {
        success: true,
        inquiryId,
        message: 'Your commission request has been logged into the engineering queue.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[APEX STUDIO] Booking error:', error);
    return NextResponse.json(
      { error: 'Internal server error while processing inquiry.' },
      { status: 500 }
    );
  }
}
