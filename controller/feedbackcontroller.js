const submitFeedback = async (req, res) => {
    try {
        console.log('=== FEEDBACK SUBMISSION ===');
        console.log('Feedback request received:', req.body);
        
        const { name, email, subject, message, rating } = req.body;

        // Validate input
        if (!name || !email || !message) {
            console.log('Validation failed - missing required fields');
            return res.status(400).json({
                message: "Name, email, and message are required!",
                success: false,
            });
        }

        // Create email content
        const emailContent = `
New Feedback Submission from CodeTrack

Name: ${name}
Email: ${email}
Subject: ${subject || 'No subject provided'}
Rating: ${rating || 'Not rated'}

Message:
${message}

Submitted at: ${new Date().toISOString()}
        `.trim();

        console.log('Email content prepared');
        console.log('Sending feedback email...');

        // For now, we'll just log the feedback and return success
        // In a real implementation, you would set up nodemailer with your email service
        console.log('=== FEEDBACK EMAIL CONTENT ===');
        console.log('To:', 'ssfakeid1234@gmail.com');
        console.log('Subject:', `CodeTrack Feedback: ${subject || 'General Feedback'}`);
        console.log('Content:', emailContent);
        console.log('=== END EMAIL CONTENT ===');

        // Simulate email sending delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log('Feedback processed successfully');
        
        res.status(200).json({
            message: "Feedback submitted successfully! Thank you for your input.",
            success: true,
        });

    } catch (err) {
        console.error('=== FEEDBACK ERROR ===');
        console.error('Error:', err);
        res.status(500).json({ 
            message: "Failed to submit feedback. Please try again.", 
            success: false 
        });
    }
};

export { submitFeedback };
