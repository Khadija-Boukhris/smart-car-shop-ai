import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const AI_API = 'http://localhost:9090/ai';

export default class AssistantIA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: '',
      anneeMin: '',
      marquePreferee: '',
      couleurPreferee: '',
      usage: '',
      question: '',
      recommendationResponse: '',
      assistantResponse: ''
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  recommend = (event) => {
    event.preventDefault();

    axios.post(`${AI_API}/recommendations`, {
      budget: this.state.budget ? parseInt(this.state.budget) : null,
      anneeMin: this.state.anneeMin ? parseInt(this.state.anneeMin) : null,
      marquePreferee: this.state.marquePreferee,
      couleurPreferee: this.state.couleurPreferee,
      usage: this.state.usage
    })
      .then(response => {
        this.setState({
          recommendationResponse: response.data.response || response.data,
          loadingRecommendation: false
        });
      })
      .catch(error => console.error('Erreur recommandation IA:', error));
  };

  askAssistant = (event) => {
    event.preventDefault();

    axios.post(`${AI_API}/assistant`, {
      question: this.state.question
    })
      .then(response => {
        this.setState({
          assistantResponse: response.data.response || response.data,
          loadingAssistant: false
        });
      })
      .catch(error => console.error('Erreur assistant IA:', error));
  };

  render() {
    return (
      <div>
        <Card className="border border-dark bg-dark text-white mb-4">
          <Card.Header>IA - Recommandation intelligente de voitures</Card.Header>
          <Card.Body>
            <Form onSubmit={this.recommend}>
              <Form.Group>
                <Form.Label>Budget maximum</Form.Label>
                <Form.Control name="budget" type="number" value={this.state.budget} onChange={this.handleChange} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Année minimale</Form.Label>
                <Form.Control name="anneeMin" type="number" value={this.state.anneeMin} onChange={this.handleChange} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Marque préférée</Form.Label>
                <Form.Control name="marquePreferee" type="text" value={this.state.marquePreferee} onChange={this.handleChange} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Couleur préférée</Form.Label>
                <Form.Control name="couleurPreferee" type="text" value={this.state.couleurPreferee} onChange={this.handleChange} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Usage prévu</Form.Label>
                <Form.Control name="usage" type="text" value={this.state.usage} onChange={this.handleChange} placeholder="Ex: usage quotidien, familial, économique..." />
              </Form.Group>

              <Button variant="success" type="submit">
                Générer recommandation IA
              </Button>
            </Form>

            {this.state.recommendationResponse && (
              <div className="alert alert-info mt-3" style={{ whiteSpace: 'pre-wrap' }}>
                {this.state.recommendationResponse}
              </div>
            )}
          </Card.Body>
        </Card>

        <Card className="border border-dark bg-dark text-white">
          <Card.Header>Assistant métier IA</Card.Header>
          <Card.Body>
            <Form onSubmit={this.askAssistant}>
              <Form.Group>
                <Form.Label>Question métier</Form.Label>
                <Form.Control
                  name="question"
                  type="text"
                  value={this.state.question}
                  onChange={this.handleChange}
                  placeholder="Ex: Quelle voiture recommander pour un budget de 100000 MAD ?"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Poser la question
              </Button>
            </Form>

            {this.state.assistantResponse && (
              <div className="alert alert-warning mt-3" style={{ whiteSpace: 'pre-wrap' }}>
                {this.state.assistantResponse}
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  }
}