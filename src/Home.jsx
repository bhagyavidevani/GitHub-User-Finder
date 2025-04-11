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
        <Card className="mx-auto shadow" style={{ maxWidth: '600px' }}>
          <Card.Body>
            <Row className="align-items-center">
              <Col md={4} className="text-center">
                <img
                  src={data.avatar_url}
                  alt="Avatar"
                  className="img-fluid rounded-circle mb-3"
                  width="120"
                />
              </Col>
              <Col md={8}>
                <h4>{data.name || 'No Name'} <small className="text-muted">(@{data.login})</small></h4>
                <p className="mb-1"><strong>Bio:</strong> {data.bio || 'N/A'}</p>
                <p className="mb-1"><strong>Followers:</strong> {data.followers}</p>
                <p className="mb-1"><strong>Public Repos:</strong> {data.public_repos}</p>
              </Col>
            </Row>

            <div className="text-center mt-3">
              <Button variant="outline-success" onClick={toggleRepos}>
                {showRepos ? 'Hide Repositories' : 'Show Repositories'}
              </Button>
            </div>

            {showRepos && repos && (
              <ListGroup variant="flush" className="mt-4">
                <h5>Repositories:</h5>
                {repos.map((repo) => (
                  <ListGroup.Item key={repo.id}>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                      <strong className="text-primary">{repo.name}</strong>
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
