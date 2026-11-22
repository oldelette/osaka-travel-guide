import { useState } from 'react';
import { MapPin } from '../icons';

export default function HotelEntrancePhoto() {
  const [missing, setMissing] = useState(false);

  return (
    <div className="hotel-entrance-photo">
      {missing ? (
        <div className="hotel-photo-fallback">
          <MapPin size={24} />
          <span>飯店門口照片目前無法載入</span>
          <code>public/images/hotel/entrance.jpg.png</code>
        </div>
      ) : (
        <img
          src={`${import.meta.env.BASE_URL}images/hotel/entrance.jpg.png`}
          alt="Apartment Hotel 11 Dotonbori 8 飯店入口"
          loading="lazy"
          onError={() => setMissing(true)}
        />
      )}
    </div>
  );
}
