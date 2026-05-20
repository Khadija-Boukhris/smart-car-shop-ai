import React from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar';
import Bienvenue from './Components/Bienvenue';
import Footer from './Components/Footer';
import Voiture from './Components/Voiture';
import VoitureListe from './Components/VoitureListe';
import AssistantIA from './Components/AssistantIA';

function App() {
  const marginTop = {
    marginTop: '20px'
  };

  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Container>
          <Row>
            <Col lg={12} style={marginTop}>
              <Switch>
                <Route path="/" exact component={Bienvenue} />
                <Route path="/add" exact component={Voiture} />
                <Route path="/edit/:id" exact component={Voiture} />
                <Route path="/list" exact component={VoitureListe} />
                <Route path="/ai" exact component={AssistantIA} />
              </Switch>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
