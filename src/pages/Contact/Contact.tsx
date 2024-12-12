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
import { useEffect, useReducer, useState, useTransition } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { API_BACKEND_ENDPOINT } from '@constant/Api';
import { set } from 'lodash';

interface ContactFormState {
  name: string;
  phone: string;
  message: string;
  gender: string;
  subject: string;
}

const initialContactFormState: ContactFormState = {
  name: '',
  phone: '',
  message: '',
  gender: '',
  subject: '',
};

const contactFormReducer = (state: ContactFormState, action: any): ContactFormState => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'RESET':
      return initialContactFormState;
    default:
      return state;
  }
};

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [contactFormState, dispatch] = useReducer(contactFormReducer, initialContactFormState);
  const [error, setError] = useState<Partial<ContactFormState>>(initialContactFormState);
  const handleSendContact = async () => {
    const sendContact = async () => {
      const errors = validateForm();
      if (Object.keys(errors).length > 0) {
        console.log('error', errors);
        toast.error('Error!', {
          description: Object.values(errors).join(', '),
        });
        return;
      }
      try {
        setLoading(true);
        const response = await axios.post(`${API_BACKEND_ENDPOINT}/api/contact`, {
          userName: contactFormState.name,
          userGender: contactFormState.gender,
          userPhone: contactFormState.phone,
          typeOfProduct: contactFormState.subject,
          message: contactFormState.message,
        });

        if (response.data) {
          toast.success('Success!', {
            description: 'Send contact successfully',
          });
          dispatch({ type: 'RESET' });
          setLoading(false);
          return;
        }
        throw new Error('Error when send contact');
      } catch (error) {
        toast.error('Error!', {
          description: 'Error when send contact',
        });
      }
    };

    startTransition(() => {
      sendContact();
    });
  };

  useEffect(() => {
    console.log('isPending', isPending);
  }, [isPending]);

  const handleFieldChange = (field: string, value: any) => {
    dispatch({ type: 'SET_FIELD', field, value });
    if (error && error[field as keyof ContactFormState]) {
      setError({
        ...error,
        [field]: undefined,
      });
    }
  };

  const validateForm = () => {
    const errors: Partial<ContactFormState> = {};

    if (!contactFormState.name) {
      errors.name = 'Name is required';
    }

    if (!contactFormState.phone) {
      errors.phone = 'Phone is required';
    }

    if (!contactFormState.message) {
      errors.message = 'Message is required';
    }

    if (!contactFormState.gender) {
      errors.gender = 'Gender is required';
    }

    if (!contactFormState.subject) {
      errors.subject = 'Subject is required';
    }

    setError(errors);
    return errors;
  };

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
              <div className='Contact-select'>
                <Input
                  name='name'
                  label='Your Name'
                  className={`${error?.name ? 'text-red-400 [&>input]:border-red-400 ' : ''}`}
                  required
                  defaultValue={contactFormState.name}
                  onChange={(event) => handleFieldChange('name', event.target.value)}
                ></Input>
                <div
                  className={`Contact-gender  ${error?.gender ? 'text-red-400 !border-red-400 border-b-[0.5px]' : ''}`}
                >
                  <p>* Your Gender</p>
                  <Select
                    value={contactFormState.gender}
                    showSearch
                    onChange={(value) => handleFieldChange('gender', value)}
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
              </div>
              <div className='Contact-select'>
                <Input
                  name='phone'
                  label='Your Phone'
                  className={`${error?.phone ? 'text-red-400 [&>input]:border-red-400 ' : ''}`}
                  required
                  defaultValue={contactFormState.phone}
                  onChange={(event) => handleFieldChange('phone', event.target.value)}
                ></Input>
              </div>
            </div>
            <div className='Contact-infor'>
              <div
                className={`Contact-type  ${error?.subject ? 'text-red-400 !border-red-400 border-b-[0.5px]' : ''}`}
              >
                <p>* What subject do you want to know ?</p>
                <Select
                  value={contactFormState.subject}
                  showSearch
                  onChange={(value) => handleFieldChange('subject', value)}
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={[
                    { value: 'Collection', label: 'Collection' },
                    { value: 'Bag', label: 'Bag' },
                    { value: 'Jacket', label: 'Jacket' },
                  ]}
                />
              </div>
              <Input
                name='message'
                className={`${error?.message ? 'text-red-400 [&>input]:border-red-400 ' : ''}`}
                label='Your massage'
                required
                defaultValue={contactFormState.message}
                onChange={(event) => handleFieldChange('message', event.target.value)}
              ></Input>
            </div>
            <Button
              className='btn_submitContact'
              onClick={handleSendContact}
              loading={loading}
              isPrimary
            >
              Send now
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
