import * as React from 'react';

const MAX_IMAGES_COUNT = 6;

interface Props {
  images: string[];
}

const Gallery: React.FunctionComponent<Props> = ({images}) => {
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {images.slice(0, MAX_IMAGES_COUNT).map((image, index) => (
          <div className={`property__image-wrapper`}
            style={{width: `259px`}}
            key={index + Math.random()}
          >
            <img className={`property__image`} src={image} alt="Interior photo" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Gallery);
