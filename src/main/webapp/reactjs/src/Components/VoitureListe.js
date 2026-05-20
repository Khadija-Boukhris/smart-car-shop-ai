import React, { Component } from 'react';
import { Card, Table, ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MyToast from './MyToast';

const API_URL = 'http://localhost:9090/voitures';

export default class VoitureListe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voitures: [],
      show: false
    };
  }

  componentDidMount() {
    this.findAllVoitures();
  }

  findAllVoitures() {
    axios.get(API_URL)
      .then(response => {
        this.setState({ voitures: response.data });
      })
      .catch(error => console.error('Erreur chargement voitures:', error));
  }

  deleteVoiture = (voitureId) => {
    axios.delete(API_URL + '/' + voitureId)
      .then(response => {
        if (response.status === 200 || response.status === 204) {
          this.setState({
            show: true,
            voitures: this.state.voitures.filter(voiture => voiture.id !== voitureId)
          });
          setTimeout(() => this.setState({ show: false }), 3000);
        }
      })
      .catch(error => console.error('Erreur suppression:', error));
  };

  render() {
    return (
      <div>
        <div style={{ display: this.state.show ? 'block' : 'none' }}>
          <MyToast>{{ show: this.state.show, message: 'Voiture supprimée avec succès.', type: 'danger' }}</MyToast>
        </div>

        <Card className="border border-dark bg-dark text-white">
          <Card.Header>
            <FontAwesomeIcon icon={faList} /> Liste Voitures
          </Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <th>Marque</th>
                  <th>Modele</th>
                  <th>Couleur</th>
                  <th>Immatricule</th>
                  <th>Annee</th>
                  <th>Prix</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.voitures.length === 0 ?
                  <tr align="center">
                    <td colSpan="7">Aucune Voiture n'est disponible</td>
                  </tr> :
                  this.state.voitures.map((voiture) => (
                    <tr key={voiture.id}>
                      <td>{voiture.marque}</td>
                      <td>{voiture.modele}</td>
                      <td>{voiture.couleur}</td>
                      <td>{voiture.immatricule}</td>
                      <td>{voiture.annee}</td>
                      <td>{voiture.prix}</td>
                      <td>
                        <ButtonGroup>
                          <Link to={'edit/' + voiture.id} className="btn btn-sm btn-outline-primary">
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>{' '}
                          <Button size="sm" variant="outline-danger" onClick={this.deleteVoiture.bind(this, voiture.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}