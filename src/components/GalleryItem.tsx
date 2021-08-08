import React from 'react';
import { NftGalleryProps } from '../NftGallery';
import { OpenseaAsset } from '../types/OpenseaAsset';
import { joinClassNames } from '../utils';

import './gallery-item.css';

export interface GalleryItemProps {
  asset: OpenseaAsset;
  metadataIsVisible: NftGalleryProps['metadataIsVisible'];
  itemContainerStyle: NftGalleryProps['itemContainerStyle'];
  imgContainerStyle: NftGalleryProps['imgContainerStyle'];
}

export const GalleryItem: React.FC<GalleryItemProps> = ({
  asset,
  metadataIsVisible,
  itemContainerStyle,
  imgContainerStyle,
}) => {
  const assetTitle = asset.name || `TokenID: ${asset.token_id}`;

  const renderAssetMedia = () => {
    // No media present -> render the name/tokenId as a placeholder.
    if (!asset.image_preview_url) {
      return (
        <div
          className={joinClassNames(
            'rnftg-flex rnftg-flex-col rnftg-justify-center rnftg-items-center rnftg-w-full rnftg-h-full rnftg-cursor-pointer',
            'rnftg-break-words rnftg-truncate rnftg-text-lg rnftg-font-semibold dark:rnftg-text-gray-200'
          )}
        >
          {assetTitle}
        </div>
      );
    }

    const assetMediaExt = asset.image_preview_url.split('.').pop();

    if (assetMediaExt === 'mp4') {
      return (
        <video
          className={joinClassNames(
            'rnftg-w-full rnftg-h-full rnftg-object-cover rnftg-cursor-pointer',
            metadataIsVisible ? 'rnftg-rounded-t-2xl' : 'rnftg-rounded-2xl'
          )}
          src={asset.image_preview_url}
          preload="auto"
          controlsList="nodownload"
          autoPlay
          loop
          playsInline
        ></video>
      );
    }

    return (
      <img
        className={joinClassNames(
          'rnftg-w-full rnftg-h-full rnftg-object-cover rnftg-cursor-pointer',
          metadataIsVisible ? 'rnftg-rounded-t-2xl' : 'rnftg-rounded-2xl'
        )}
        src={asset.image_preview_url}
        alt={asset.name}
        loading="lazy"
      />
    );
  };

  return (
    <article
      style={itemContainerStyle}
      className="rnftg-item rnftg-rounded-2xl rnftg-bg-white dark:rnftg-bg-gray-800 rnftg-shadow-lg hover:rnftg-shadow-xl rnftg-transition rnftg-duration-300"
    >
      <div style={imgContainerStyle} className="rnftg-item__img-wrapper">
        {renderAssetMedia()}
      </div>
      {metadataIsVisible && (
        <div className="rnftg-p-4">
          <div className="rnftg-break-words rnftg-cursor-pointer rnftg-truncate rnftg-text-lg rnftg-font-semibold dark:rnftg-text-gray-200">
            {assetTitle}
          </div>
          <hr className="rnftg-mx-2 rnftg-my-4 rnftg-border-gray-100 dark:rnftg-border-gray-900" />
          <div className="rnftg-flex rnftg-items-center rnftg-cursor-pointer">
            {asset.collection.image_url && (
              <img
                src={asset.collection.image_url}
                alt={asset.collection.name}
                className="rnftg-w-8 rnftg-h-8 rnftg-mr-2 rnftg-rounded-full"
              />
            )}
            <div className="rnftg-text-sm rnftg-font-semibold rnftg-truncate dark:rnftg-text-gray-200">
              {asset.collection.name}
            </div>
          </div>
        </div>
      )}
    </article>
  );
};
