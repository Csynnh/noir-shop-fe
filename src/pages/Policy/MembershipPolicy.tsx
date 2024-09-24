import styles from './MembershipPolicy.module.scss';

const MembershipPolicy = () => {
  return (
    <div className={styles.MembershipPolicy}>
      <div className='MembershipPolicy-container' id='membership'>
        <h1 className='Membership-header'>
          <span>Membership Policy</span>
          <span>(3)</span>
        </h1>
        <div className='MembershipPolicy-content'>
          <div className='MembershipPolicy-intro'>
            <p>Introduction</p>
            <ul>
              This Membership Policy outlines the terms and conditions governing membership in our
              [Brand Name] loyalty program. By joining our membership program, you agree to abide by
              these terms.
            </ul>
          </div>
          <div className='MembershipPolicy-intro'>
            <p>Membership Benefits</p>
            <ul>
              As a member, you will enjoy the following benefits:
              <li>Exclusive Discounts: Enjoy discounts on your purchases throughout the year.</li>
              <li>
                Early Access: Be among the first to know about new products, sales, and promotions.
              </li>
              <li>Special Offers: Receive exclusive offers and personalized recommendations.</li>
              <li>Points Program: Earn points with every purchase and redeem them for rewards.</li>
            </ul>
          </div>
          <div className='MembershipPolicy-intro'>
            <p>Membership Requirements</p>
            <ul>
              To become a member, you must:
              <li>
                Provide Personal Information: Provide your name, email address, and other required
                information.
              </li>
              <li>Agree to Terms: Agree to the terms and conditions of this Membership Policy.</li>
            </ul>
          </div>
          <div className='MembershipPolicy-intro'>
            <p>Membership Termination</p>
            <ul>
              We may terminate your membership at any time if you violate the terms of this policy
              or engage in fraudulent or abusive behavior.
            </ul>
          </div>
          <div className='MembershipPolicy-intro'>
            <p>Changes to Membership Policy</p>
            <ul>
              We may update this Membership Policy from time to time. We will notify you of any
              significant changes by email or through our website.
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPolicy;
