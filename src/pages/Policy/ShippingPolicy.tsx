import styles from './ShippingPolicy.module.scss';

const ShippingPolicy = () => {
  return (
    <div className={styles.ShippingPolicy}>
      <div className='ShippingPolicy-container'>
        <h1 className='PrivatePolicy-header'>
          <span>Shipping and Return Policy</span>
          <span>(2)</span>
        </h1>
        <div className='ShippingPolicy-content'>
          <div className='ShippingPolicy-shipping'>
            <p>Shipping</p>
            <ul>
              <li>
                Shipping Methods: We offer [list of shipping methods, e.g., standard shipping,
                expedited shipping, overnight shipping].
              </li>
              <li>
                Shipping Costs: Shipping costs are calculated based on the weight, dimensions, and
                destination of your order. You will be able to view the shipping cost before
                completing your purchase.  
              </li>
              <li>
                Shipping Times: Estimated shipping times vary depending on the shipping method and
                your location. We will provide you with an estimated delivery date during checkout.
              </li>
              <li>
                Order Tracking: You will receive a tracking number once your order has been shipped.
                You can use this number to track the progress of your shipment.  
              </li>
            </ul>
          </div>
          <div className='ShippingPolicy-shipping'>
            <p>Returns</p>
            <ul>
              <li>
                Return Window: Items can be returned within [number] days of the purchase date.
              </li>
              <li>
                Return Conditions: Items must be returned in their original condition, unused, and
                with all tags attached.  
              </li>
              <li>
                Return Shipping: Return shipping costs are the responsibility of the customer,
                unless the item is defective or the wrong item was sent.  
              </li>
              <li>
                Refunds: Refunds will be issued to the original method of payment. Please allow
                [number] business days for your refund to process.
              </li>
              <li>
                Exchanges: We offer exchanges for items that are the wrong size or style. Please
                contact us to initiate an exchange.
              </li>
            </ul>
          </div>
          <div className='ShippingPolicy-shipping'>
            <p>Defective or Incorrect Items</p>
            <ul>
              If you receive a defective or incorrect item, please contact us within [number] days
              of receipt. We will provide instructions for returning the item and arrange for a
              replacement or refund.
            </ul>
          </div>
          <div className='ShippingPolicy-shipping'>
            <p>Additional Notes</p>
            <ul>
              <li>Custom Orders: Custom orders are generally non-refundable.</li>
              <li>
                Sale Items: Sale items are typically final sale and cannot be returned or
                exchanged. 
              </li>
              <li>
                International Shipping: International shipping may incur additional duties, taxes,
                and customs fees. These charges are the responsibility of the customer.  
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
