import Collection from '@components/Collection';
import styles from './styles.module.scss';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Minus from '@components/Icons/Minus';
import Plus from '@components/Icons/Plus';
import Button from '@components/Button';
import Star from '@components/Icons/Star';
const Item = () => {
  const { item_id } = useParams();
  const [itemCount] = useState(1);
  console.log('item_id', item_id);

  // const handleIncrement = () => {
  //   setItemCount(itemCount + 1);
  // };

  // const handleDecrement = () => {
  //   if (itemCount > 1) {
  //     setItemCount(itemCount - 1);
  //   }
  // };

  const handleAddToCart = () => {
    console.log('Add to cart');
  };

  const handleBuyNow = () => {
    console.log('Buy now');
  };
  return (
    <div className={styles.Item}>
      <div className='item-wrapper'>
        <div className='item-detail'>
          <div className='item-detail-images'>
            <div className='item-detail-media'>
              <div className='item-detail-media-item'>
                <img src='https://via.placeholder.com/103' alt='' width={103} height={103} />
              </div>
              <div className='item-detail-media-item'>
                <img src='https://via.placeholder.com/103' alt='' width={103} height={103} />
              </div>
              <div className='item-detail-media-item'>
                <img src='https://via.placeholder.com/103' alt='' width={103} height={103} />
              </div>
              <div className='item-detail-media-item'>
                <img src='https://via.placeholder.com/103' alt='' width={103} height={103} />
              </div>
            </div>
            <div className='item-detai-image'>
              <img src='https://via.placeholder.com/495' alt='' width={495} height={495} />
            </div>
          </div>
          <div className='item-detail-info'>
            <div className='item-detail-top'>
              <h5 className='item-name'>Celestial</h5>
              <span className='item-desc'>
                A versatile and timeless piece, this classic bag is designed for everyday use.
              </span>
              <div className='item-color-list'>
                <span className='item-label'>Color: </span>
                <div className='item-color'>
                  <div className='item-color-item --red'></div>
                  <div className='item-color-item --blue'></div>
                </div>
              </div>
            </div>

            <div className='item-price'>
              <span className='item-label'>Price: </span>
              <p className='item-price-total'>$150.00</p>
            </div>
            <div className='item-size'>
              <span className='item-label'>Size: </span>
              <span className='item-value'>S</span>
              <span className='item-value'>M</span>
              <span className='item-value'>L</span>
              <span className='item-value'>XL</span>
            </div>
            <div className='item-detail-bottom'>
              <div className='item-price-tools'>
                <div className='item-price-btns'>
                  <div className='item-price-btn-minus'>
                    <Minus />
                  </div>
                  <div className='item-price-count'>{itemCount}</div>
                  <div className='item-price-btn-plus'>
                    <Plus />
                  </div>
                </div>
                <div className='item-inventory'>
                  <p className='item-inventory-count'>100 items</p>
                  <p className='item-sold-out'>40 sout out</p>
                </div>
              </div>
              <div className='item-btns'>
                <Button onClick={handleAddToCart}>Add to Card</Button>
                <Button onClick={handleBuyNow} isPrimary>
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className='item-more-info'>
          <h5 className='item-more-info-title'>More Information</h5>
          <p className='item-more-info-desc'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book.
          </p>
          <div className='item-more-info-prod-name'>
            <span className='item-more-info-lable'>Product Number:</span>
            <span className='item-more-info-value'>E-Temp Thermometer</span>
          </div>
          <div className='item-more-info-prod-name'>
            <span className='item-more-info-lable'>Material:</span>
            <span className='item-more-info-value'>Genuine Leather</span>
          </div>
          <div className='item-more-info-prod-name'>
            <span className='item-more-info-lable'>Waterproof:</span>
            <span className='item-more-info-value'>Genuine Leather</span>
          </div>
          <div className='item-more-info-prod-name'>
            <span className='item-more-info-lable'>Care Instructions:</span>
            <span className='item-more-info-value'>Genuine Leather</span>
          </div>
          <div className='item-more-info-prod-name'>
            <span className='item-more-info-lable'>Dimensions:</span>
            <span className='item-more-info-value'>Genuine Leather</span>
          </div>
          <div className='item-more-info-prod-name'>
            <span className='item-more-info-lable'>Origin:</span>
            <span className='item-more-info-value'>
              Noir - District 9, Ho Chi Minh City, VietNam
            </span>
          </div>
          <div className='item-more-info-note'>
            <span className='item-more-info-lable'>Please note:</span>
            <span className='item-more-info-value'>
              These specifications are examples and may vary depending on the actual product.
            </span>
          </div>
        </div>
        <div className='item-feedback'>
          <h3 className='item-feedback-header'>Feedback</h3>
          <div className='item-feedback-list'>
            <div className='item-feedback-content'>
              <div className='item-feedback-author'>TruLem</div>
              <div className='item-feedback-rating'>
                <ul className='item-feedback-rating-stars --4'>
                  <li className='-item-feedback-rating-star'>
                    <Star></Star>
                  </li>
                  <li className='-item-feedback-rating-star'>
                    <Star></Star>
                  </li>
                  <li className='-item-feedback-rating-star'>
                    <Star></Star>
                  </li>
                  <li className='-item-feedback-rating-star'>
                    <Star></Star>
                  </li>
                  <li className='-item-feedback-rating-star'>
                    <Star></Star>
                  </li>
                </ul>
                <div className='item-feedback-date'>Monday, September 9</div>
              </div>
              <p className='item-feedback-desc'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
              <div className='item-feedback-images'>
                <div className='item-feedback-image'>
                  <img src='https://via.placeholder.com/168' alt='feedback image' />
                </div>
                <div className='item-feedback-image'>
                  <img src='https://via.placeholder.com/168' alt='feedback image' />
                </div>
                <div className='item-feedback-image'>
                  <img src='https://via.placeholder.com/168' alt='feedback image' />
                </div>
              </div>
            </div>
            <div className='item-feedback-content'>
              <div className='item-feedback-author'>TruLem</div>
              <div className='item-feedback-rating'>
                <ul className='item-feedback-rating-stars --4'>
                  <li className='-item-feedback-rating-star'>
                    <Star></Star>
                  </li>
                  <li className='-item-feedback-rating-star'>
                    <Star></Star>
                  </li>
                  <li className='-item-feedback-rating-star'>
                    <Star></Star>
                  </li>
                  <li className='-item-feedback-rating-star'>
                    <Star></Star>
                  </li>
                  <li className='-item-feedback-rating-star'>
                    <Star></Star>
                  </li>
                </ul>
                <div className='item-feedback-date'>Monday, September 9</div>
              </div>
              <p className='item-feedback-desc'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
              <div className='item-feedback-images'>
                {/* <div className="item-feedback-image">
                  <img src="https://via.placeholder.com/168" alt="feedback image" />
                </div>
                <div className="item-feedback-image">
                  <img src="https://via.placeholder.com/168" alt="feedback image" />
                </div>
                <div className="item-feedback-image">
                  <img src="https://via.placeholder.com/168" alt="feedback image" />
                </div> */}
              </div>
            </div>
            <div className='item-feedback-content'>
              <div className='item-feedback-author'>TruLem</div>
              <div className='item-feedback-rating'>
                <ul className='item-feedback-rating-stars --4'>
                  <li className='-item-feedback-rating-star'>
                    <Star></Star>
                  </li>
                  <li className='-item-feedback-rating-star'>
                    <Star></Star>
                  </li>
                  <li className='-item-feedback-rating-star'>
                    <Star></Star>
                  </li>
                  <li className='-item-feedback-rating-star'>
                    <Star></Star>
                  </li>
                  <li className='-item-feedback-rating-star'>
                    <Star></Star>
                  </li>
                </ul>
                <div className='item-feedback-date'>Monday, September 9</div>
              </div>
              <p className='item-feedback-desc'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
              <div className='item-feedback-images'>
                <div className='item-feedback-image'>
                  <img src='https://via.placeholder.com/168' alt='feedback image' />
                </div>
                <div className='item-feedback-image'>
                  <img src='https://via.placeholder.com/168' alt='feedback image' />
                </div>
                <div className='item-feedback-image'>
                  <img src='https://via.placeholder.com/168' alt='feedback image' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Collection type='New Collection'></Collection>
      </div>
    </div>
  );
};

export default Item;
