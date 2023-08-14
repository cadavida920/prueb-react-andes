import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

const PostDetailsPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]); // Inicializa el estado de los comentarios
    const [error, setError] = useState(null);
    

    useEffect(() => {
        // Obtener detalles del post
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(response => response.json())
            .then(data => setPost(data))
            .catch(error => {
                console.error('Error fetching post details:', error);
                setError("Hubo un  error buscando un postd id: " + postId + " mas detalles: " + error)
            });


        // Obtener comentarios del post
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            .then(response => response.json())
            .then(data => setComments(data)) // Almacena los comentarios en el estado
            .catch(error => {
                console.error('Error fetching comments:', error);
                setError("Hubo un error consultando los comentarios del post id " + postId + " mas detalles: " + error)
            });
    }, []);

    if (!post) {
        return <div>Loading...</div>;
    }

    if (error !== null) {
        return (
        <Alert variant='danger'>
          ¡Ha ocurrido un error!  Detalles del error: 
          <br></br>
          { error }
        </Alert>);
      }

    return (
        <Container className='mt-4' >
            <Card className='mb-4'>
                <Card.Body>
                    <Card.Title className='mb-0'>{post.title}</Card.Title>
                    <Card.Text>{post.body}</Card.Text>
                </Card.Body>
            </Card>

            <h3>Comentarios:</h3>
            <div>
                {comments.length > 0 ? (
                    comments.map(comment => (
                        <Card key={comment.id} className='comment-card mb-3'>
                            <Card.Body>
                                <Card.Title className='mb-0'>{comment.name}</Card.Title>
                                <Card.Text>{comment.body}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <p>No hay comentarios registrados.</p>
                )}
            </div>
        </Container>
    );
};

export default PostDetailsPage;
