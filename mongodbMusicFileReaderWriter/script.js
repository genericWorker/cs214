document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const title = document.getElementById('title').value;
    const artist = document.getElementById('artist').value;
    const music = document.getElementById('music').files[0];
  
    const song = new FormData();
    song.append('title', title);
    song.append('artist', artist);
    song.append('music', music);
  
    fetch('/upload', {
      method: 'POST',
      body: song,
    })
      .then((response) => {
        if (response.ok) {
          console.log('File uploaded successfully.');
        } else {
          console.error('File upload failed.');
        }
      })
      .catch((error) => console.error(error));
  });