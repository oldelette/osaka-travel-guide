import { photos } from '../data/photos';

interface PhotoProps {
  label: string;
  className?: string;
}

export default function Photo({ label, className = '' }: PhotoProps) {
  const asset = photos[label];

  return (
    <div className={`photo-placeholder ${className} ${asset ? 'has-photo' : ''}`} role="group" aria-label={asset?.alt ?? `${label}照片素材待補`}>
      {asset && (
        <img
          src={asset.src}
          alt={asset.alt}
          loading={className.includes('hero') ? 'eager' : 'lazy'}
          decoding="async"
          onError={(event) => { event.currentTarget.style.display = 'none'; }}
        />
      )}
      <span className="photo-mark">OSAKA / 2026</span>
      <span>{label}</span>
      {asset ? (
        <small className="photo-credit">
          攝影 <a href={asset.sourceUrl} target="_blank" rel="noreferrer">{asset.author}</a>
          {' · '}<a href={asset.licenseUrl} target="_blank" rel="noreferrer">{asset.license}</a>
        </small>
      ) : (
        <small>照片素材待補｜請放入 public/images</small>
      )}
    </div>
  );
}
