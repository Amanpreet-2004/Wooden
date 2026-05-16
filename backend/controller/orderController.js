// import nodemailer from "nodemailer";


// export const placeOrder = async (req, res) => {
//   const { fullName, email, phone, address, city, pincode, cartItems } = req.body;

//   try {
//     // 1. Email Transporter Setup
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "aman3838209@gmail.com",
//         pass: "lytu vdzr dsaf dhnt", 
//       },
//     });

//     // 2. Cart Items Table
//     const itemsHtml = cartItems.map(item => `
//       <tr>
//         <td style="padding: 8px; border: 1px solid #ddd;">${item.title}</td>
//         <td style="padding: 8px; border: 1px solid #ddd;">${item.quantity}</td>
//       </tr>
//     `).join("");

//     // 3. Email Config
//     const mailOptions = {
//       from: '"Wooden Interior" <aman3838209@gmail.com>',
//       to: email, 
//       subject: "Order Inquiry Confirmed - Wooden Interior 🛒",
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e1cbb1; padding: 20px;">
//           <h2 style="color: #a66d3b;">Hello ${fullName},</h2>
//           <p>Thank you for choosing <strong>Wooden Interior</strong>. We have successfully received your order inquiry.</p>
          
//           <h3>Order Summary:</h3>
//           <table style="width: 100%; border-collapse: collapse;">
//             <thead>
//               <tr style="background: #f8f1e9;">
//                 <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Product</th>
//                 <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Quantity</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${itemsHtml}
//             </tbody>
//           </table>

//           <h3>Shipping Address:</h3>
//           <p>${address}, ${city} - ${pincode}<br>Phone: ${phone}</p>
          
//           <p style="color: #666; font-style: italic;">Note: Our team will contact you shortly to discuss precise pricing and wood quality options.</p>
//           <hr style="border: 0; border-top: 1px solid #eee;">
//           <p>Regards,<br><strong>Wooden Interior Team</strong></p>
//         </div>
//       `,
//     };

//     // 4. Send Email
//     await transporter.sendMail(mailOptions);

//     res.status(200).json({ success: true, message: "Order placed & Email sent!" });

//   } catch (error) {
//     console.error("Email Error:", error);
//     res.status(500).json({ success: false, message: "Order placed but email failed." });
//   }
// };

import nodemailer from "nodemailer";

export const placeOrder = async (req, res) => {
  const { fullName, email, phone, address, city, pincode, cartItems } = req.body;

  try {
    const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,                   // Sabse zaroori: ise 587 kijiye
  secure: false,                // 587 ke sath hamesha false hoga
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
  tls: {
    rejectUnauthorized: false   // Isse Render connection block nahi karega
  }
});

    // 2. Cart Items Table
    const itemsHtml = cartItems.map(item => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${item.title}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${item.quantity}</td>
      </tr>
    `).join("");

    // 3. Email Config
    const mailOptions = {
      from: '"Wooden Interior" <aman3838209@gmail.com>',
      to: email, 
      subject: "Order Inquiry Confirmed - Wooden Interior 🛒",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e1cbb1; padding: 20px;">
          <h2 style="color: #a66d3b;">Hello ${fullName},</h2>
          <p>Thank you for choosing <strong>Wooden Interior</strong>. We have successfully received your order inquiry.</p>
          
          <h3>Order Summary:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f8f1e9;">
                <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Product</th>
                <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Quantity</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <h3>Shipping Address:</h3>
          <p>${address}, ${city} - ${pincode}<br>Phone: ${phone}</p>
          
          <p style="color: #666; font-style: italic;">Note: Our team will contact you shortly to discuss precise pricing and wood quality options.</p>
          <hr style="border: 0; border-top: 1px solid #eee;">
          <p>Regards,<br><strong>Wooden Interior Team</strong></p>
        </div>
      `,
    };

    // 4. Send Email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Order placed & Email sent!" });

  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ success: false, message: "Order placed but email failed." });
  }
};