import Support from '@components/Icons/Support';
import styles from './Contact.module.scss';
import In from '@components/Icons/In';
import Fb from '@components/Icons/Fb';
import Insta from '@components/Icons/Insta';
import Address from '@components/Icons/Address';
import Phone from '@components/Icons/Phone';
import Mail from '@components/Icons/Mail';
import Input from '@components/Input';
import Button from '@components/Button';
import { Form, Select } from 'antd';

const Contact = () => {
  return (
    <div className={styles.Contact}>
      <div className='Contact-container'>
        <h1 className='Contact-header'>
          <span>Contact Us</span>
          <span>(6)</span>
        </h1>
        <div className='Contact-content'>
          <div className='Contact-desc'>
            <div className='Contact-top'>
              <div className='Contact-title'>
                <span>
                  <Support></Support>
                </span>
                <span className='title'>CONTACT OUR FRIENDLY CUSTOMER SUPPORT TEAM</span>
              </div>
              <p>
                Have a question about our products, need assistance with an order, or simply want to
                share your thoughts? Our dedicated customer support team is here to help. Feel free
                to reach out to us using the form below or by contacting us directly at :{' '}
              </p>
              <div className='Contact-title'>
                <span>
                  <Mail></Mail>
                </span>
                <span className='title'>Email :</span>
                <p>123abc@gmail.com</p>
              </div>
              <div className='Contact-title'>
                <span>
                  <Address></Address>
                </span>
                <span className='title'>Address :</span>
                <p>Ho Chi Minh City, Vietnam</p>
              </div>
              <div className='Contact-title'>
                <span>
                  <Phone></Phone>
                </span>
                <span className='title'>Phone :</span>
                <p>+(84) 28 366 400 874</p>
              </div>
              <p>
                We're committed to providing you with exceptional service and ensuring your
                satisfaction.
              </p>
            </div>
            <div className='Contact-bottom'>
              <div className='Contact-community'>
                <span className='title'>OR JOIN THE COMMUNITY</span>
                <p>
                  Discover the perfect bag to complement your lifestyle. Explore our collection and
                  experience the difference of Noir.
                </p>
                <div className='Contact-social'>
                  <span className='Contact-icon icon'>
                    <In></In>
                  </span>
                  <span className='Contact-icon icon'>
                    <Fb></Fb>
                  </span>
                  <span className='Contact-icon icon'>
                    <Insta></Insta>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Form className='Contact-form'>
            <div className='Contact-senTo'>
              <div className='Contact-title'>
                <span>
                  <Mail></Mail>
                </span>
                <span className='title'>SEND TO US</span>
              </div>
              <p>* All fields marked with a asterisk are requied</p>
            </div>
            <div className='Contact-infor'>
              <Input name='name' label='Your Name' required></Input>
              <div className='Contact-select'>
                <p>* Your Gender</p>
                <Select
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={[
                    { value: '1', label: 'Mr' },
                    { value: '2', label: 'Ms' },
                    { value: '3', label: 'Other' },
                  ]}
                />
              </div>
              <Input name='phone' label='Your Phone' required></Input>
            </div>
            <div className='Contact-infor'>
              <p>* What subject do you want to know ?</p>
              <Select
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={[
                  { value: 'Collection', label: 'Collection' },
                  { value: 'Bag', label: 'Bag' },
                  { value: 'Jacket', label: 'Jacket' },
                ]}
              />
              <Input name='message' label='Your massage' required></Input>
            </div>
            <Button className='btn_submitContact' onClick={() => {}} isPrimary>
              Send now
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
