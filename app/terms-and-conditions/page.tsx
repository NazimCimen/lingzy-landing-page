"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Scale } from "lucide-react"

export default function TermsAndConditions() {
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
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Scale className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-4xl font-extrabold text-foreground tracking-tight">
              Terms & Conditions
            </h1>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
            
            <section>
              <p>These terms and conditions apply to the Lingzy app (hereby referred to as "Application") for mobile devices that was created by Nazım Çimen (hereby referred to as "Service Provider").</p>
              
              <p>Upon downloading or utilizing the Application, you are automatically agreeing to the following terms. It is strongly advised that you thoroughly read and understand these terms prior to using the Application. Unauthorized copying, modification of the Application, any part of the Application, or our trademarks is strictly prohibited. Any attempts to extract the source code of the Application, translate the Application into other languages, or create derivative versions are not permitted. All trademarks, copyrights, database rights, and other intellectual property rights related to the Application remain the property of the Service Provider.</p>

              <p>The Service Provider is dedicated to ensuring that the Application is as beneficial and efficient as possible. As such, they reserve the right to modify the Application or charge for their services at any time and for any reason. The Service Provider assures you that any charges for the Application or its services will be clearly communicated to you.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Freemium Model and In-App Purchases</h2>
              <p>Lingzy operates on a freemium business model, offering both free and premium features.</p>
              
              <h3 className="text-xl font-semibold text-foreground mt-6">Free Features</h3>
              <p>The Application provides a substantial set of features at no cost, allowing you to learn and improve your English skills without any payment.</p>

              <h3 className="text-xl font-semibold text-foreground mt-6">Premium Features</h3>
              <p>Additional premium features are available through in-app purchases or subscriptions. Premium features may include, but are not limited to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Unlimited access to personalized AI-generated stories</li>
                <li>Advanced learning tools and features</li>
                <li>Additional content and resources</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6">Payment and Subscriptions</h3>
              <p>All payment processing is handled by RevenueCat and your device's app store (Google Play Store or Apple App Store). By making a purchase:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You agree to the terms and conditions of your app store</li>
                <li>You acknowledge that the Service Provider does not process or store any payment information</li>
                <li>You understand that subscriptions will automatically renew unless cancelled through your app store settings</li>
                <li>You can manage or cancel subscriptions at any time through your app store account</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6">Refunds</h3>
              <p>Refund requests must be made through your app store (Google Play Store or Apple App Store) according to their refund policies. The Service Provider does not have the ability to process refunds directly.</p>

              <h3 className="text-xl font-semibold text-foreground mt-6">Changes to Pricing</h3>
              <p>The Service Provider reserves the right to modify pricing for premium features at any time. Current subscribers will be notified of any price changes in accordance with app store policies, and changes will take effect at the next renewal period.</p>
              
              <p className="mt-4">The Application stores and processes personal data that you have provided to the Service Provider in order to provide the Service. It is your responsibility to maintain the security of your phone and access to the Application. The Service Provider strongly advise against jailbreaking or rooting your phone, which involves removing software restrictions and limitations imposed by the official operating system of your device. Such actions could expose your phone to malware, viruses, malicious programs, compromise your phone's security features, and may result in the Application not functioning correctly or at all.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Account Termination</h2>
              <p>Users have the right to delete their accounts at any time. Account deletion can be performed either through the in-app settings or by submitting a request through our account deletion form. Upon deletion, all user data will be permanently removed within 30 days. Please refer to our Privacy Policy for detailed information about the account deletion process.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Offline Features and Data Storage</h2>
              <p>Lingzy is designed with an offline-first approach, allowing you to use most features without an internet connection.</p>

              <h3 className="text-xl font-semibold text-foreground mt-6">Local Data Storage</h3>
              <p>The Application stores educational content, including a comprehensive dictionary database, locally on your device. This data includes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dictionary definitions from WordNet and other linguistic databases</li>
                <li>Your saved vocabulary words and learning progress</li>
                <li>Generated personalized stories</li>
              </ul>
              <p>You are responsible for managing the storage space used by the Application on your device. You can clear local data through the app settings or by uninstalling the Application.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Content and Intellectual Property</h2>
              <p>The content provided in Lingzy is intended for educational purposes only. Please note the following:</p>

              <div className="space-y-6 mt-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Classic Books Library</h3>
                  <p className="text-sm">The Application provides access to a collection of world classic literature. These books are public domain (copyright-free) works and are primarily sourced from open, public projects such as Project Gutenberg. The Service Provider claims no copyright ownership over these classic texts; they are distributed strictly for educational purposes and language learning.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground">AI-Generated Content</h3>
                  <p className="text-sm">Reading materials and educational texts in the application are generated using artificial intelligence technology. These materials are created for educational purposes and are not intended to replace professional educational resources.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground">Personalized Stories</h3>
                  <p className="text-sm">The Application offers a personalized stories feature powered by artificial intelligence. By using this feature:</p>
                  <ul className="list-disc pl-6 space-y-1 mt-2 text-sm">
                    <li>You consent to your saved vocabulary words being sent to third-party AI services for story generation</li>
                    <li>Generated stories are for your personal educational use only</li>
                    <li>The Service Provider is not responsible for inaccuracies that may occur in AI-generated content</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground">Dictionary Database</h3>
                  <p className="text-sm">The offline dictionary database includes content from publicly available lexical resources, such as WordNet (Princeton University), enhanced with custom processing and improvements for educational use. This content is provided for educational purposes and is subject to the respective licenses of the source materials.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground">Visual Assets</h3>
                  <p className="text-sm">Images and graphics are sourced from royalty-free or licensed platforms and are used to enhance the learning experience.</p>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mt-8">User Responsibility</h3>
              <p>Users acknowledge that the content provided is for educational purposes and should be used as supplementary learning material. The Service Provider is not responsible for any decisions made based on the content provided in the application.</p>
              
              <div className="space-y-4 mt-4">
                <p>Please be aware that the Service Provider does not assume responsibility for certain aspects. Some functions of the Application require an active internet connection, which can be Wi-Fi or provided by your mobile network provider. The Service Provider cannot be held responsible if the Application does not function at full capacity due to lack of access to Wi-Fi or if you have exhausted your data allowance.</p>
                <p>If you are using the application outside of a Wi-Fi area, please be aware that your mobile network provider's agreement terms still apply. Consequently, you may incur charges from your mobile provider for data usage during the connection to the application, or other third-party charges. By using the application, you accept responsibility for any such charges, including roaming data charges if you use the application outside of your home territory (i.e., region or country) without disabling data roaming. If you are not the bill payer for the device on which you are using the application, they assume that you have obtained permission from the bill payer.</p>
                <p>Similarly, the Service Provider cannot always assume responsibility for your usage of the application. For instance, it is your responsibility to ensure that your device remains charged. If your device runs out of battery and you are unable to access the Service, the Service Provider cannot be held responsible.</p>
                <p>In terms of the Service Provider's responsibility for your use of the application, it is important to note that while they strive to ensure that it is updated and accurate at all times, they do rely on third parties to provide information to them so that they can make it available to you. The Service Provider accepts no liability for any loss, direct or indirect, that you experience as a result of relying entirely on this functionality of the application.</p>
                <p>The Service Provider may wish to update the application at some point. The application is currently available as per the requirements for the operating system (and for any additional systems they decide to extend the availability of the application to) may change, and you will need to download the updates if you want to continue using the application. The Service Provider does not guarantee that it will always update the application so that it is relevant to you and/or compatible with the particular operating system version installed on your device. However, you agree to always accept updates to the application when offered to you. The Service Provider may also wish to cease providing the application and may terminate its use at any time without providing termination notice to you. Unless they inform you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must cease using the application, and (if necessary) delete it from your device.</p>
              </div>
            </section>

            <section className="pt-8 border-t border-border mt-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Changes to These Terms and Conditions</h2>
              <p>The Service Provider may periodically update their Terms and Conditions. Therefore, you are advised to review this page regularly for any changes. The Service Provider will notify you of any changes by posting the new Terms and Conditions on this page.</p>
              <p className="font-medium text-foreground mt-4">These terms and conditions are effective as of 2025-12-29</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
              <p>If you have any questions or suggestions about the Terms and Conditions, please do not hesitate to contact the Service Provider at <a href="mailto:cimennazim.dev@gmail.com" className="text-primary hover:underline font-medium">cimennazim.dev@gmail.com</a>.</p>
            </section>

          </div>
        </motion.div>
      </div>
    </div>
  )
}
