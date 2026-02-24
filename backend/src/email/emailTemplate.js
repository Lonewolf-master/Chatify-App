
export default function emailTemplate(name, email,URL,otp ) {
  return (

    `<!DOCTYPE html>
        <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Welcome to Chatify!</title>
                    <script src="https://cdn.tailwindcss.com"></script>
                    <script>
                        tailwind.config = {
                            theme: {
                                extend: {
                                    colors: {
                                        app: '#0D1115',
                                        surface: '#1D262D',
                                        primary: '#FFFFFF',
                                        secondary: '#8CA3B3',
                                        accent: '#3BC6FF',
                                    },
                                    fontFamily: {
                                        sans: ['Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
                                    }
                                }
                            }
                        }
                    </script>
                </head>
                <body class="bg-app flex flex-col items-center justify-center min-h-screen py-10 px-4 font-sans antialiased">

                    <!-- Main Card Container -->
                    <div class="w-full max-w-[600px] bg-surface rounded-xl overflow-hidden border-t-[5px] border-accent shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                        
                        <!-- Header / Logo Section -->
                        <div class="flex items-center justify-center pt-10 pb-6">
                            <svg class="w-10 h-10 mr-3 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none"></circle>
                                <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none"></circle>
                                <circle cx="12" cy="10" r="1" fill="currentColor" stroke="none"></circle>
                            </svg>
                            <h1 class="text-primary text-3xl font-extrabold tracking-wide">Chatify</h1>
                        </div>

                        <!-- Main Content -->
                        <div class="px-8 sm:px-14 pb-10 text-center">
                            
                            <h2 class="text-primary text-2xl font-semibold mb-4">Welcome to the conversation!</h2>

                            <h3 class="text-primary text-xl bg-accent font-semibold mb-2">${name}</h3>
                            <h3 class="text-primary text-xl bg-accent font-semibold mb-2">${email}</h3>
                            
                            <p class="text-secondary text-base leading-relaxed mb-8">
                                We're excited to have you join Chatify. To get started and ensure the security of your account, please use the OTP code below or click the button to verify your email address.
                            </p>

                            <!-- OTP Section -->
                            <div class="mb-8 w-full">
                                <p class="text-secondary text-sm uppercase tracking-wider font-semibold mb-3">Your Verification Code</p>
                                <div class="bg-app border border-dashed border-accent rounded-lg py-5 px-4 text-center text-4xl sm:text-5xl font-bold tracking-[0.3em] sm:tracking-[0.4em] text-primary shadow-inner">
                                    749205
                                </div>
                                <p class="text-secondary text-xs mt-3">This code will expire in 15 minutes.</p>
                            </div>

                            <!-- Divider -->
                            <div class="flex items-center justify-center my-8">
                                <div class="h-px bg-app w-1/3"></div>
                                <p class="text-secondary text-sm mx-4 font-medium">OR</p>
                                <div class="h-px bg-app w-1/3"></div>
                            </div>

                            <!-- Call to Action Button -->
                            <a href="${URL}" class="inline-block bg-accent text-app px-8 py-4 text-base font-bold rounded-lg hover:opacity-90 transition-all duration-200 shadow-[0_0_15px_rgba(59,198,255,0.25)] hover:shadow-[0_0_20px_rgba(59,198,255,0.4)]">
                                Verify Email Address
                            </a>

                            <!-- Fallback Link -->
                            <div class="mt-10 text-left">
                                <p class="text-secondary text-sm leading-relaxed mb-1">
                                    If the button above doesn't work, copy and paste the following link into your browser:
                                </p>
                                <a href="#" class="text-accent text-sm break-all hover:underline">
                                    https://chatify.app/verify/749205-abc123xyz-auth-token
                                </a>
                            </div>

                        </div>

                        <!-- Help Box -->
                        <div class="bg-app py-8 px-8 text-center border-t border-surface">
                            <p class="text-primary text-base font-semibold mb-1">Need more help?</p>
                            <a href="#" class="text-accent text-sm hover:underline font-medium">We're here, ready to talk</a>
                        </div>

                    </div>

                    <!-- Footer Links & Info -->
                    <div class="w-full max-w-[600px] mt-8 text-center px-4">
                        
                        <!-- Quick Links -->
                        <div class="mb-6 flex justify-center items-center space-x-3 text-sm">
                            <a href="#" class="text-primary font-medium hover:text-accent transition-colors">Dashboard</a>
                            <span class="text-secondary">|</span>
                            <a href="#" class="text-primary font-medium hover:text-accent transition-colors">Billing</a>
                            <span class="text-secondary">|</span>
                            <a href="#" class="text-primary font-medium hover:text-accent transition-colors">Help</a>
                        </div>

                        <!-- Explainer Text -->
                        <p class="text-secondary text-xs leading-relaxed mb-4">
                            You received this email because you just signed up for a new account on Chatify.<br>
                            If you did not make this request, please ignore this email.
                        </p>

                        <!-- Unsubscribe -->
                        <p class="text-secondary text-xs leading-relaxed mb-4">
                            If these emails get annoying, please feel free to 
                            <a href="#" class="text-accent hover:underline">unsubscribe</a>.
                        </p>

                        <!-- Address -->
                        <p class="text-secondary text-xs">
                            Chatify Inc. &bull; 1234 Neon Street &bull; Cyber City, CC &bull; 56789
                        </p>
                    </div>

                </body>
        </html>`
  )
}
