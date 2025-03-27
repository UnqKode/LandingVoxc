export const sendEmail = async (email) => {
    try {
      const response = await fetch('http://localhost:5000/api/mail/recordMail', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("⚠️ Error sending email:", error);
      return { success: false, message: "Server error. Please try again." };
    }
  };
  