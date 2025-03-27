import React, { useState, useRef } from "react";
import { Send, Check, AlertTriangle } from "lucide-react";
import GIF from "../assets/yy3.gif";
import { sendEmail } from "../function/sendmail";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailInputRef = useRef(null);

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      emailInputRef.current.focus();
      return;
    }
  
    try {
      const res = await fetch( `http://localhost:5000/api/mail/recordMail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      const data = await res.json();
  
      if (res.status === 201) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setEmail("");
        }, 3000);
      } else if (res.status === 409) {
        setError("This email is already on the list.");
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Could not connect to server. Please try again later.");
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 py-20 gap-8 relative overflow-hidden">
      {/* Animated Dots Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(30)].map((_, i) => {
          const isVertical = Math.random() > 0.5;
          return (
            <div
              key={i}
              className={`absolute bg-blue-400/20 animate-floatLine blur-sm`}
              style={{
                width: isVertical ? "2px" : `${Math.random() * 40 + 30}px`,
                height: isVertical ? `${Math.random() * 40 + 30}px` : "2px",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          );
        })}
      </div>

      {/* GIF Panel */}
      <div className="w-full md:w-[30vw] h-auto rounded-3xl overflow-hidden relative z-10 transition-all duration-500 flex items-center justify-center p-4">
        <img
          src={GIF}
          alt="Launch Visual"
          className="max-w-full h-auto object-contain transition duration-500 ease-in-out"
        />
      </div>

      {/* Form Panel */}
      <div className="w-full max-w-xl rounded-3xl p-10 backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl relative z-10">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/30 rounded-full blur-3xl"></div>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 animate-fadeIn relative z-20"
          >
            <div className="space-y-2">
              <h2 className="text-white text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                Launching Soon
              </h2>
              <p className="text-sm text-gray-400">
                Be the first to know when we go live
              </p>
            </div>

            <div className="relative">
              <input
                ref={emailInputRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-5 py-4 pl-12 bg-white/10 border border-white/20 text-white rounded-xl placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
              <Send className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
              {error && (
                <div className="flex items-center text-red-400 text-sm mt-2 animate-shake">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  {error}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold tracking-wide shadow-xl hover:shadow-blue-500/50 transition-all duration-300 transform flex items-center justify-center space-x-2 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              <span>{loading ? "Sending..." : "Notify Me"}</span>
              <Send className="w-5 h-5" />
            </button>
          </form>
        ) : (
          <div className="text-center text-white space-y-4 animate-fadeIn relative z-20">
            <Check className="w-20 h-20 text-green-400 mx-auto animate-zoomIn" />
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              You're on the list!
            </h3>
            <p className="text-gray-300 text-sm">
              We'll notify you when we go live 🚀
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
