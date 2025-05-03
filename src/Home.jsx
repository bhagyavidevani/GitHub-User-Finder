import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, InputGroup, Spinner, Alert, Container, Card, Row, Col, ListGroup } from 'react-bootstrap';
import { userEnterAsync } from './services/Action/Githubaction';

function Home() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ username: '' });
  const [showRepos, setShowRepos] = useState(false);

  const { loading, data, error, repos } = useSelector((state) => state.Githubreducer);

  const handleChanged = (e) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.username.trim()) {
      alert('Please enter a GitHub username');
      return;
    }
    dispatch(userEnterAsync(user.username));
  };

  const toggleRepos = () => {
    setShowRepos((prev) => !prev);
  };

  return (
    <Container className="">
      <h2 className="text-center mb-2">GitHub User Finder</h2>

      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-4">
          <Form.Control
            placeholder="Enter GitHub username"
            name="username"
            value={user.username}
            onChange={handleChanged}
            size="lg"
          />
          <Button type="submit" variant="primary">
            {loading ? <Spinner animation="border" size="sm" /> : 'Search'}
          </Button>
        </InputGroup>
      </Form>

      {error && <Alert variant="danger">Error: {error}</Alert>}

      {data && (
        <Card className="mx-auto shadow" style={{ maxWidth: '800px' }}>
          <Card.Body>
            <Row className="d-flex align-items-center">
              <Col md={4} className="">
                <img
                  src={data.avatar_url}
                  alt="Avatar"
                  className="img-fluid rounded"
                  width="100%"
                />
              </Col>
              <Col md={8} className='ps-5'>
                <h4>Name:-{data.name || 'No Name'}<br/> <small className="text-muted " style={{fontSize:"16px", paddingLeft:"74px"}}>(@{data.login})</small></h4>
                <p className="mb-1"><strong className='me-5'>Bio:</strong> {data.bio || 'N/A'}</p>
                <p className="mb-1"><strong className='me-2'>Pub Rep:</strong> {data.public_repos}</p>
                <p className="mb-1"><strong className='me-0'>Followers:</strong> {data.followers}</p>
              </Col>
            </Row>

            <div className="text-center mt-3">
              <Button variant="outline-success" onClick={toggleRepos}>
                {showRepos ? 'Hide Repositories' : 'Show Repositories'}
              </Button>
            </div>

            {showRepos && repos && (
              <ListGroup variant="flush" className="mt-4">
                <h3 style={{fontWeight:"bold"}}>Repositories:</h3>
                {repos.map((repo) => (
                  <ListGroup.Item key={repo.id}>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                     
                      <ul>
                        <li> <strong className="text-primary">{repo.name}</strong></li>
                      </ul>
                    </a>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default Home;
