import React, { useEffect, useRef } from 'react';
import { useLoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const AddressAutocomplete = ({ onPlaceSelected }) => {
  const inputRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDAlXO-bk-9HUxM9yqHI3bTcGdxJUeRzjU', // Replace with your API key
    libraries,
  });

  useEffect(() => {
    if (isLoaded && !loadError && inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
        componentRestrictions: { country: 'uk' },
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        onPlaceSelected(place);
      });
    }
  }, [isLoaded, loadError, onPlaceSelected]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  return (
    <input
      type="text"
      ref={inputRef}
      placeholder="Enter a UK address"
      style={{ width: '100%', padding: '10px' }}
    />
  );
};

export default AddressAutocomplete;
