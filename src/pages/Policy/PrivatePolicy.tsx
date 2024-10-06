import styles from './PrivatePolicy.module.scss';

const PrivatePolicy = () => {
  return (
    <div className={styles.PrivatePolicy}>
      <div className='PrivatePolicy-container'>
        <h1 className='PrivatePolicy-header'>
          <span>Private Policy</span>
          <span>(1)</span>
        </h1>
        <div className='PrivatePolicy-content'>
          <div className='PrivatePolicy-intro'>
            <p>Introduction</p>
            <span>
              Noir is committed to protecting your privacy. This Privacy Policy outlines how we
              collect, use, and protect your personal information when you interact with our
              website, purchase our products, or otherwise engage with our brand.{' '}
            </span>
          </div>
          <div className='PrivatePolicy-collect'>
            <p>Information We Collect</p>
            <ul>
              We may collect the following types of personal information:
              <li>Contact Information: Name, email address, phone number, and mailing address.</li>
              <li>
                Purchase Information: Details of your purchases, including product information and
                payment details.
              </li>
              <li>Account Information: Username, password, and other account-related data.</li>
              <li>
                Usage Data: Information about how you interact with our website, including your IP
                address, browser type, and browsing history.
              </li>
              <li>
                Other Information: Any additional information you voluntarily provide, such as
                feedback or survey responses.
              </li>
            </ul>
          </div>
          <div className='PrivatePolicy-collect'>
            <p>How We Collect Information</p>
            <ul>
              We collect information in various ways, including:
              <li>
                Directly from You: When you provide information through our website, contact forms,
                or in-store purchases.
              </li>
              <li>
                Automatically: Through cookies, web beacons, and similar technologies when you visit
                our website.
              </li>
            </ul>
          </div>
          <div className='PrivatePolicy-collect'>
            <p>How We Use Your Information</p>
            <ul>
              We may use your personal information for the following purposes:
              <li>
                Processing Orders: To fulfill your orders, process payments, and manage your
                account.
              </li>
              <li>
                Customer Service: To provide customer support, respond to inquiries, and resolve
                issues.
              </li>
              <li>
                Marketing and Promotions: To send you marketing communications, promotions, and
                updates about our products and services.
              </li>
              <li>
                Personalization: To tailor our website and product recommendations to your
                preferences.
              </li>
              <li>
                Analytics: To analyze website usage, improve our services, and understand our
                customers better.
              </li>
            </ul>
          </div>
          <div className='PrivatePolicy-collect'>
            <p>How We Use Your Information</p>
            <ul>
              We may use your personal information for the following purposes:
              <li>
                Processing Orders: To fulfill your orders, process payments, and manage your
                account.
              </li>
              <li>
                Customer Service: To provide customer support, respond to inquiries, and resolve
                issues.
              </li>
              <li>
                Marketing and Promotions: To send you marketing communications, promotions, and
                updates about our products and services.
              </li>
              <li>
                Personalization: To tailor our website and product recommendations to your
                preferences.
              </li>
              <li>
                Analytics: To analyze website usage, improve our services, and understand our
                customers better.
              </li>
            </ul>
          </div>

          <div className='PrivatePolicy-collect'>
            <p>Sharing Your Information</p>
            <ul>
              We may share your personal information with:
              <li>
                Third-Party Service Providers: To assist us with various functions, such as
                shipping, payment processing, and marketing.
              </li>
              <li>
                Business Partners: In connection with joint marketing or promotional activities.
              </li>
              <li>Legal Authorities: As required by law or to protect our rights.</li>
            </ul>
          </div>
          <div className='PrivatePolicy-collect'>
            <p>Your Rights</p>
            <ul>
              You may have certain rights regarding your personal information, including:
              <li>Access: To request access to your personal information.</li>
              <li>
                Business Partners: In connection with joint marketing or promotional activities.
              </li>
              <li>Rectification: To request correction of inaccurate or incomplete information.</li>
              <li>Erasure: To request deletion of your personal information.</li>
              <li>Restriction: To request restriction of processing your personal information.</li>
              <li>Object: To object to the processing of your personal information.</li>
              <li>
                Portability: To request transfer of your personal information to another
                organization.
              </li>
            </ul>
          </div>
          <div className='PrivatePolicy-intro'>
            <p>Data Security</p>
            <span>
              We implement reasonable security measures to protect your personal information from
              unauthorized access, disclosure, alteration, or destruction. However, no method of
              transmission over the internet or electronic storage is completely secure.
            </span>
          </div>
          <div className='PrivatePolicy-intro'>
            <p>Changes to This Policy </p>
            <span>
              We may update this Privacy Policy from time to time. We will notify you of any
              significant changes by posting the updated policy on our website.
            </span>
          </div>
          {/* <div className='PrivatePolicy-intro'>
            <p>Q&A </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PrivatePolicy;
