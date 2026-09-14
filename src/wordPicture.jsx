function WordPicture({ photos }) {
  return (
    <div className="pictures">
      {photos.slice(0, 6).map((photo) => (
        <img
          key={photo.photographer_id}
          src={photo.src.landscape}
          alt={photo.alt}
        />
      ))}
    </div>
  );
}

export default WordPicture;
