import styles from './styles.module.scss';
import CardItem, { CardItemProps } from '@components/CardItem';
import { forwardRef, useEffect, useRef, useState } from 'react';
import ArrowLeft from '@components/Icons/ArrowLeft';
import ArrowRight from '@components/Icons/ArrowRight';
import { snakeToCapitalCase } from '@lib/utils';

interface CollectionProps {
  type: string;
  products: CardItemProps[];
}
const enum Direction {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

const Collection = forwardRef<HTMLDivElement, CollectionProps>(({ type, products }, ref) => {
  const maxVisibleItems = 4;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(products?.length > maxVisibleItems);
  const [scrolling, setScrolling] = useState(false);
  // Check scroll state when items or scroll position changes
  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth + 24 < scrollWidth);
    }
  };

  // Handle scroll
  const onScroll = async (direction: Direction) => {
    setScrolling(true);
    if (scrollRef.current) {
      const gapWidth = 24;
      const itemScrollWidth =
        scrollRef.current.clientWidth / maxVisibleItems -
        (gapWidth * (maxVisibleItems - 1)) / maxVisibleItems;
      const scrollAmount = itemScrollWidth + gapWidth;
      scrollRef.current.scrollBy({
        left: direction === Direction.RIGHT ? scrollAmount : -scrollAmount - 0.1,
        behavior: 'smooth',
      });
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    setScrolling(false);
  };

  useEffect(() => {
    checkScrollPosition();
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      return () => scrollContainer.removeEventListener('scroll', checkScrollPosition);
    }
  }, [products]);

  return (
    <div ref={ref} className={styles.Collection}>
      <div className='collection-content'>
        <h2 className='collection-header uppercase'>{snakeToCapitalCase(type)}</h2>
        <div className='collection-wrapper'>
          {/* Left Scroll Button */}
          {canScrollLeft && !scrolling && (
            <ArrowLeft className='collection-scroll-left' onClick={() => onScroll(Direction.LEFT)}>
              &lt;
            </ArrowLeft>
          )}

          <div ref={scrollRef} className='collection-container'>
            {products?.map((item, index) => (
              <div key={index} className='collection-item'>
                <CardItem {...item}></CardItem>
              </div>
            ))}
          </div>

          {canScrollRight && !scrolling && (
            <ArrowRight
              className={`collection-scroll-right`}
              onClick={() => onScroll(Direction.RIGHT)}
            >
              &gt;
            </ArrowRight>
          )}
        </div>
      </div>
    </div>
  );
});

export default Collection;
