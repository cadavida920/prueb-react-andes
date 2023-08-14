import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';

const PostList = () => {  
  const [posts, setPost] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => setPost(json))
      .catch(err => setError("Error!" + err))
  }, [])

  useEffect(() => {
    console.log(filter);
    if (filter !== "") {
      const nuevoPostFiltrado = posts.filter(item => item.title.toLowerCase().includes(filter.toLowerCase()))
      setFilteredPosts(nuevoPostFiltrado);
    }
  }, [filter])

  useEffect(()=> {
    setFilteredPosts(posts);
  }, [posts])

  useEffect(()=> {
  }, [filteredPosts])

  if (error !== null) {
    return (
    <Alert variant='danger'>
      ¡Ha ocurrido un error! Por favor, Detalles del error: { error }
    </Alert>);
  }

  return (
    <div>
      <ul>
        <h1>Lista de publicaciones:</h1>
        <input
          type='text'
          placeholder='Filtrar por título...'
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
        {filteredPosts.map(post => (
          <Card className='card-m' key={post.id}>
            <Card.Header>
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </Card.Header>
            <Card.Body>{post.body}</Card.Body>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
