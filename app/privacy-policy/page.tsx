"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ShieldCheck } from "lucide-react"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-primary/5 blur-[120px] rounded-full -z-10" />
      
      <div className="container mx-auto px-4 max-w-4xl pt-12">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-4xl font-extrabold text-foreground tracking-tight">
              Privacy Policy
            </h1>
          </div>
          
          <p className="font-medium text-foreground mb-12">Last updated: December 2025</p>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-10 text-muted-foreground leading-relaxed">
            
            <section>
              <p>
                This privacy policy applies to the Lingzy app (hereby referred to as "Application") for mobile devices that was created by Nazım Çimen (hereby referred to as "Service Provider"). This service is intended for use "AS IS".
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Information Collection and Use</h2>
              <p>Lingzy does not collect usage analytics, tracking data, or behavioral information.</p>
              <p>The Application does not gather precise information about the location of your mobile device.</p>
              <p>The Application does not send push notifications or marketing communications.</p>
              <p>The Service Provider may contact you only for account-related or legally required communications.</p>
              <p>When creating an account, the Application may require basic information such as an email address for authentication purposes only.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Backend Infrastructure and Data Storage</h2>
              <p>The Application uses Supabase as its backend infrastructure for user authentication and data synchronization. When you create an account or use online features:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your account information and learning progress are securely stored on Supabase servers</li>
                <li>Data is synchronized between your device and our servers to provide cross-device functionality</li>
                <li>All data transmission is encrypted using industry-standard security protocols</li>
                <li>We do not collect or store profile pictures or photos</li>
              </ul>
              <p>The Application is designed with an offline-first approach, meaning most features work without an internet connection, and your data is primarily stored locally on your device.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Third Party Services</h2>
              <p>The Application integrates with the following third-party services:</p>
              
              <div className="space-y-6 mt-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Supabase</h3>
                  <p className="text-sm">Used for backend infrastructure, user authentication, and data synchronization. Supabase is not used for advertising or marketing purposes. Please refer to Supabase's Privacy Policy for more information.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">RevenueCat</h3>
                  <p className="text-sm">Used for managing in-app purchases and subscriptions for our freemium model. RevenueCat handles all payment processing and subscription management. The Service Provider does not collect, store, or process any payment information. All payment data is handled securely by RevenueCat and your device's app store (Google Play Store or Apple App Store). Please refer to RevenueCat's Privacy Policy for more information.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Legal Requirements and Disclosure</h2>
              <p>The Service Provider may disclose user information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>as required by law, such as to comply with a subpoena, or similar legal process;</li>
                <li>when they believe in good faith that disclosure is necessary to protect their rights, protect your safety or the safety of others, investigate fraud, or respond to a government request;</li>
                <li>with their trusted services providers who work on their behalf, do not have an independent use of the information we disclose to them, and have agreed to adhere to the rules set forth in this privacy statement.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Opt-Out Rights</h2>
              <p>You can stop all collection of information by the Application easily by uninstalling it. You may use the standard uninstall processes as may be available as part of your mobile device or via the mobile application marketplace or network.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Data Retention Policy & Account Deletion</h2>
              <p>The Service Provider will retain User Provided data for as long as you use the Application and for a reasonable time thereafter. If you'd like them to delete User Provided Data that you have provided via the Application, please contact them at <a href="mailto:cimennazim.dev@gmail.com" className="text-primary hover:underline">cimennazim.dev@gmail.com</a> and they will respond in a reasonable time.</p>
              
              <h3 className="text-xl font-semibold text-foreground mt-6">Account Deletion Rights</h3>
              <p>You have the right to request the deletion of your account and all associated personal data. You can delete your account in two ways:</p>
              
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-muted/30 p-5 rounded-xl border border-border/50">
                  <h4 className="font-semibold text-foreground mb-2">Option 1: In-App Deletion</h4>
                  <p className="text-sm">You can delete your account directly from within the Lingzy app by going to Settings → Delete Account. This will immediately initiate the account deletion process.</p>
                </div>
                <div className="bg-muted/30 p-5 rounded-xl border border-border/50">
                  <h4 className="font-semibold text-foreground mb-2">Option 2: Email Request</h4>
                  <p className="text-sm">You can also request account deletion by filling out our account deletion form. Please visit our account deletion request page to submit your request.</p>
                </div>
              </div>

              <h4 className="font-semibold text-foreground mt-6">Deletion Process</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your account deletion request will be processed within 30 days</li>
                <li>All your personal data, usage history, and in-app data will be permanently deleted</li>
                <li>This action cannot be undone once confirmed</li>
                <li>You will receive a confirmation email to verify your request before deletion proceeds</li>
                <li>After confirmation, your account will be permanently deleted within 30 days</li>
              </ul>
              <p className="text-sm italic mt-4">Note: If you choose the email request method, you must confirm your deletion request by replying to the confirmation email. Your account will only be deleted after you provide this confirmation.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Children</h2>
              <p>The Service Provider does not use the Application to knowingly solicit data from or market to children under the age of 13.</p>
              <p>The Service Provider does not knowingly collect personally identifiable information from children. The Service Provider encourages all children to never submit any personally identifiable information through the Application and/or Services. The Service Provider encourage parents and legal guardians to monitor their children's Internet usage and to help enforce this Policy by instructing their children never to provide personally identifiable information through the Application and/or Services without their permission. If you have reason to believe that a child has provided personally identifiable information to the Service Provider through the Application and/or Services, please contact the Service Provider (<a href="mailto:cimennazim.dev@gmail.com" className="text-primary hover:underline">cimennazim.dev@gmail.com</a>) so that they will be able to take the necessary actions. You must also be at least 16 years of age to consent to the processing of your personally identifiable information in your country (in some countries we may allow your parent or guardian to do so on your behalf).</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">In-App Purchases and Subscriptions</h2>
              <p>Lingzy operates on a freemium model, offering both free and premium features. Premium features are available through in-app purchases and subscriptions.</p>
              
              <h3 className="text-xl font-semibold text-foreground mt-6">Payment Processing</h3>
              <p>All payment transactions are processed by RevenueCat in conjunction with your device's app store (Google Play Store or Apple App Store). The Service Provider does not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Collect or store your credit card information</li>
                <li>Process any payment transactions directly</li>
                <li>Have access to your payment details</li>
              </ul>
              <p>Your payment information is handled exclusively by RevenueCat and your app store according to their respective privacy policies and security standards.</p>

              <h3 className="text-xl font-semibold text-foreground mt-6">Subscription Management</h3>
              <p>Subscriptions are managed through your app store account. To cancel or modify your subscription, please use your device's app store settings. The Service Provider receives only anonymized subscription status information necessary to provide premium features.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Security</h2>
              <p>The Service Provider is concerned about safeguarding the confidentiality of your information. The Service Provider provides physical, electronic, and procedural safeguards to protect information the Service Provider processes and maintains.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Offline Features and Local Data Storage</h2>
              <p>Lingzy is designed with an offline-first approach to provide you with a seamless learning experience even without an internet connection.</p>
              
              <h3 className="text-xl font-semibold text-foreground mt-6">Offline Dictionary Database</h3>
              <p>The Application includes a comprehensive offline dictionary database stored locally on your device. This database is built using publicly available lexical resources, such as WordNet (Princeton University), and enhanced with custom processing and improvements for educational use.</p>
              <p>This dictionary data is stored entirely on your device and is not transmitted to any external servers. You have full control over this data and it will be removed when you uninstall the Application.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Content Sources and Generation</h2>
              <p>Lingzy provides educational content to enhance your English learning experience. Please note the following about our content sources:</p>

              <h3 className="text-xl font-semibold text-foreground mt-6">Classic Books Library</h3>
              <p>The Application includes a reading feature that provides access to world classic literary works. These books are public domain (copyright-free) literature and are primarily sourced from open platforms such as Project Gutenberg. This content is provided solely for educational purposes to help users improve their English language skills. The Service Provider claims no copyright ownership over these classic texts.</p>

              <h3 className="text-xl font-semibold text-foreground mt-6">Text Content</h3>
              <p>The reading materials and educational texts in Lingzy are generated using artificial intelligence (AI) technology. These texts are created specifically for educational purposes and are designed to help users improve their English reading skills. All AI-generated content is designed and structured to ensure educational value.</p>

              <h3 className="text-xl font-semibold text-foreground mt-6">Personalized Stories with AI</h3>
              <p>The Application includes a personalized stories feature powered by artificial intelligence. This feature:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Creates custom stories based on the vocabulary words you have saved for learning</li>
                <li>Sends your saved vocabulary words to AI services to generate personalized educational content</li>
                <li>Does not share any other personal information beyond the vocabulary words you've chosen to learn</li>
                <li>Requires an internet connection to generate new stories</li>
                <li>Generated stories are stored locally on your device for offline access</li>
              </ul>
              <p>By using the personalized stories feature, you consent to your saved vocabulary words being processed by third-party AI services. These vocabulary words are processed without being associated with your identity and are used solely to generate educational content.</p>

              <h3 className="text-xl font-semibold text-foreground mt-6">Visual Content</h3>
              <p>Images and graphics used in the application are sourced from royalty-free or licensed platforms and are used to enhance the learning experience.</p>

              <h3 className="text-xl font-semibold text-foreground mt-6">Content Quality</h3>
              <p>While we strive to provide accurate and high-quality educational content, we cannot guarantee the absolute accuracy of AI-generated texts. Users are encouraged to use these materials as supplementary learning resources alongside other educational materials.</p>
            </section>

            <section className="pt-8 border-t border-border mt-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Changes</h2>
              <p>This Privacy Policy may be updated from time to time for any reason. The Service Provider will notify you of any changes to the Privacy Policy by updating this page with the new Privacy Policy. You are advised to consult this Privacy Policy regularly for any changes, as continued use is deemed approval of all changes.</p>
              <p className="font-medium text-foreground mt-4">This privacy policy is effective as of 2025-12-29</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Your Consent</h2>
              <p>By using the Application, you are consenting to the processing of your information as set forth in this Privacy Policy now and as amended by us.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact</h2>
              <p>If you have any questions, feel free to reach out:</p>
              <ul className="space-y-2">
                <li>Email: <a href="mailto:cimennazim.dev@gmail.com" className="text-primary hover:underline">cimennazim.dev@gmail.com</a></li>
                <li>Website: <Link href="https://www.nazimcimen.com" className="text-primary hover:underline">www.nazimcimen.com</Link></li>
              </ul>
            </section>

          </div>
        </motion.div>
      </div>
    </div>
  )
}
