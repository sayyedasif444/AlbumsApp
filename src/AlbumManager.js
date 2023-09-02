import React, { useState, useEffect } from 'react';

const AlbumManager = () => {
  const [albums, setAlbums] = useState([]);
  const [newAlbum, setNewAlbum] = useState({ title: '' });

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then((response) => response.json())
      .then((data) => setAlbums(data));
  }, []);

  const addAlbum = () => {
    fetch('https://jsonplaceholder.typicode.com/albums', {
      method: 'POST',
      body: JSON.stringify(newAlbum),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAlbums([data, ...albums]);
        setNewAlbum({ title: '' });
      });
  };

  const updateAlbum = (album) => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${album.id}`, {
      method: 'PUT',
      body: JSON.stringify(album),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedAlbums = albums.map((a) => (a.id === data.id ? data : a));
        setAlbums(updatedAlbums);
      });
  };

  const deleteAlbum = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: 'DELETE',
    }).then(() => {
      const updatedAlbums = albums.filter((album) => album.id !== id);
      setAlbums(updatedAlbums);
    });
  };

  return (
    <div className='container'>
      <h1>Album Manager</h1>
      <div className='input-container'>
        <input
          type='text'
          placeholder='Album Title'
          value={newAlbum.title}
          onChange={(e) => setNewAlbum({ title: e.target.value })}
        />
        <button className='add-button' onClick={addAlbum}>
          <i className='fas fa-plus'></i> Add Album
        </button>
      </div>
      <ul className='album-list'>
        {albums.map((album) => (
          <li key={album.id}>
            <span>{album.title}</span>
            <div className='button-container'>
              <button
                className='update-button'
                onClick={() => updateAlbum(album)}
              >
                <i className='fa fa-edit'></i> Update
              </button>
              <button
                className='delete-button'
                onClick={() => deleteAlbum(album.id)}
              >
                <i className='fa fa-trash'></i> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumManager;
