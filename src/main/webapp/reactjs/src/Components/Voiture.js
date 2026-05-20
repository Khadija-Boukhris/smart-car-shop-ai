import React, { Component } from 'react';
import { Card, Form, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faUndo } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';

export default class Voiture extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state.show = false;
    this.voitureChange = this.voitureChange.bind(this);
    this.submitVoiture = this.submitVoiture.bind(this);
    this.resetVoiture = this.resetVoiture.bind(this);
  }

  initialState = {
    id: '',
    marque: '',
    modele: '',
    couleur: '',
    immatricule: '',
    annee: '',
    prix: ''
  };

  componentDidMount() {
    const voitureId = this.props.match.params.id;
    if (voitureId) {
      axios.get('http://localhost:8080/voitures/' + voitureId)
        .then(response => {
          if (response.data != null) {
            this.setState({
              id: response.data.id,
              marque: response.data.marque,
              modele: response.data.modele,
              couleur: response.data.couleur,
              immatricule: response.data.immatricule,
              annee: response.data.annee,
              prix: response.data.prix
            });
          }
        })
        .catch(error => console.error('Erreur chargement voiture:', error));
    }
  }

  voitureChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  resetVoiture() {
    this.setState(() => this.initialState);
  }

  submitVoiture(event) {
    event.preventDefault();

    const voiture = {
      marque: this.state.marque,
      modele: this.state.modele,
      couleur: this.state.couleur,
      immatricule: this.state.immatricule,
      annee: parseInt(this.state.annee),
      prix: parseInt(this.state.prix)
    };

    if (this.state.id) {
      axios.put('http://localhost:8080/voitures/' + this.state.id, voiture)
        .then(response => {
          if (response.data != null) {
            this.setState({ show: true });
            setTimeout(() => this.setState({ show: false }), 3000);
            setTimeout(() => this.props.history.push('/list'), 800);
          }
        });
    } else {
      axios.post('http://localhost:8080/voitures', voiture)
        .then(response => {
          if (response.data != null) {
            this.setState(this.initialState);
            this.setState({ show: true });
            setTimeout(() => this.setState({ show: false }), 3000);
          }
        });
    }
  }

  render() {
    const { marque, modele, couleur, immatricule, annee, prix } = this.state;
    const title = this.state.id ? 'Modifier Voiture' : 'Ajouter Voiture';
    const toastMessage = this.state.id ? 'Voiture modifiée avec succès.' : 'Voiture enregistrée avec succès.';

    return (
      <div>
        <div style={{ display: this.state.show ? 'block' : 'none' }}>
          <MyToast>{{ show: this.state.show, message: toastMessage, type: 'success' }}</MyToast>
        </div>

        <Card className="border border-dark bg-dark text-white">
          <Card.Header>{title}</Card.Header>
          <Form onSubmit={this.submitVoiture} onReset={this.resetVoiture} id="VoitureFormId">
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridMarque">
                  <Form.Label>Marque</Form.Label>
                  <Form.Control required autoComplete="off" name="marque" type="text" value={marque} onChange={this.voitureChange} className="bg-dark text-white" placeholder="Entrez Marque Voiture" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridModele">
                  <Form.Label>Modele</Form.Label>
                  <Form.Control required autoComplete="off" name="modele" type="text" value={modele} onChange={this.voitureChange} className="bg-dark text-white" placeholder="Entrez Modele Voiture" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridCouleur">
                  <Form.Label>Couleur</Form.Label>
                  <Form.Control required autoComplete="off" name="couleur" type="text" value={couleur} onChange={this.voitureChange} className="bg-dark text-white" placeholder="Entrez Couleur Voiture" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridImmatricule">
                  <Form.Label>Immatricule</Form.Label>
                  <Form.Control required autoComplete="off" name="immatricule" type="text" value={immatricule} onChange={this.voitureChange} className="bg-dark text-white" placeholder="Entrez Immatricule Voiture" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridAnnee">
                  <Form.Label>Annee</Form.Label>
                  <Form.Control required autoComplete="off" name="annee" type="number" value={annee} onChange={this.voitureChange} className="bg-dark text-white" placeholder="Entrez Annee Voiture" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPrix">
                  <Form.Label>Prix</Form.Label>
                  <Form.Control required autoComplete="off" name="prix" type="number" value={prix} onChange={this.voitureChange} className="bg-dark text-white" placeholder="Entrez Prix Voiture" />
                </Form.Group>
              </Form.Row>
            </Card.Body>
            <Card.Footer style={{ textAlign: 'right' }}>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} /> Submit
              </Button>{' '}
              <Button size="sm" variant="info" type="reset">
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}
