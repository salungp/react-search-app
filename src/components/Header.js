import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Image } from 'react-bootstrap';

const Header = () => {
	const [searchValue, setSearchValue] = useState('');
	const [message, setMessage] = useState('');
	const [movies, setMovies] = useState();
	const [load, setLoad] = useState(false);
	const [show, setShow] = useState(false);
	const [movie, setMovie] = useState();
	const [detail, setDetail] = useState(false);

	const handleShow = e => {
		const ID = e.target.getAttribute('data-id');
		setShow(true);

		if (ID !== 0) {
			fetch(`http://www.omdbapi.com/?i=${ID}&apikey=8ac4cdae`)
				.then(response => response.json())
				.then(response => {
					setMovie(response);
					setDetail(true);
					console.log(response);
				});
		}
	}
	const handleClose = () => setShow(false);

	const searchMovie = () => {
		if (searchValue == '') {
			return false;
		} else {
			fetch(`http://www.omdbapi.com/?s=${searchValue}&type=movie&apikey=8ac4cdae`)
				.then(response => response.json())
				.then(response => {
					setMovies(response);
					setLoad(true);
				})
				.catch(err => {
					setMessage('Tidak ada koneksi internet!');
				});
		}
	}

	const fetchGenre = () => {
		const genres = movies.Genre.split(', ');
		return genres;
	}

	const handleChange = e => {
		setSearchValue(e.target.value);
	}

  return(
  	<Container>
  	<br />
  	<br />
  		<Row>
  			<Col md={6}>
  				<h2>Imdb film search</h2>
		      <InputGroup>
		      	<FormControl
		      		placeholder="Search movie..."
		      		aria-label="Search movie..."
		      		aria-describedby="basic-addon2"
		      		onChange={handleChange}
		      		value={searchValue}
		      	/>
		      	<InputGroup.Append>
		      		<Button variant="primary" onClick={searchMovie}>Search</Button>
		      	</InputGroup.Append>
		      </InputGroup>
  			</Col>
  		</Row>
			<br />
			{
				!load ?
				(
					<h4></h4>
				) : (
					<Row>
					{movies.Search.map(movie => (
						<Col md={3} key={movie.imdbID + Math.random()}>
							<Card style={{ marginBottom: '30px' }}>
								<Card.Img src={movie.Poster} variant="top" />
								<Card.Body>
									<Card.Title>{movie.Title}</Card.Title>
									<h6>Year: {movie.Year}</h6>
									<Card.Text>{movie.Plot}</Card.Text>
									<Button variant="primary" onClick={handleShow} data-id={movie.imdbID}>Detail</Button>
								</Card.Body>
							</Card>
						</Col>
					))}
					</Row>
				)
			}

			{detail ? (
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Movie detail</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Row>
							<Col md={4} sm={4}>
								<Image thumbnail src={movie.Poster} />
							</Col>
							<Col md={8} sm={8}>
								<h5>{movie.Title}</h5>
								{movie.Genre.split(', ').map(g => (
									<Badge variant="success" key={Math.random()} style={{ marginRight: '5px' }}>{g}</Badge>
								))}
								<p>{movie.Plot}</p>
							</Col>
						</Row>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="light" onClick={handleClose}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
				) : ''
			}
  	</Container>
  );
}

export default Header;