import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Http from '../../services/Http'
import BannerSvg from '../../assets/images/Group-14627.svg'
import BookSvg from '../../assets/images/Group.svg'
import Year11BannerSvg from '../../assets/images/03.svg'
import Year12BannerSvg from '../../assets/images/Group-14628.svg'
import LockSvg from '../../assets/images/Group-14566.svg'
import './Home.css'

const Home = () => {
  const { token } = useSelector(state => state.user)
  const [years, setYears] = useState([])
  useEffect(() => {
    document.title = 'AnswerSheet - HSC made easy'
    const getYears = async () => {
      let { data } = await Http.get('years')
      setYears(data.data)
    }
    getYears()
  }, [])
  return (
    <div className='home-container'>
      <div className='banner-container'>
        <Container>
          <Row>
            <Col lg='5'>
              <div className='h-100 d-flex flex-column justify-content-center'>
                <h1 className='banner-title'>
                  High quality <br/>
                  HSC study guides
                </h1>
                <p className='banner-description'>
                  Everything you need to get a Band 6
                </p>
              </div>
            </Col>
            <Col lg='7' className='text-end'>
              <img src={BannerSvg} alt='banner' />
            </Col>
          </Row>
        </Container>
      </div>
      {!token ? (
        <div className='try-free-container'>
          <h2>Try us for free</h2>
          <p>Sign up for a free account and start studying.</p>
          <Link to='/signup' className='btn btn-primary'>
            Sign up
          </Link>
        </div>
      ) : null}

      <div className='category-container'>
        <Container>
          <h2 className='text-center'>Use AnswerSheet - Get a band 6</h2>
          <Row className="my-4">
            <Col lg='6' style={{marginBottom: 0}}>
              <div style={{ paddingLeft: 44, paddingBottom: 22, display: 'flex', alignItems: 'flex-start' }}>
                <img src={BookSvg} alt='book' className="me-2 mt-1"/> 
                <div>Study from out high quality syllabus summaries - try for free</div>
              </div>
              <div style={{ paddingLeft: 44, paddingBottom: 22, display: 'flex', alignItems: 'flex-start' }}>
                <img src={BookSvg} alt='book' className="me-2 mt-1"/> 
                <div>Test yourself with our HSC - style exams, trials, and topic tests</div>
              </div>
            </Col>
            <Col lg='6'>
              <div style={{ paddingLeft: 44, paddingBottom: 22, display: 'flex', alignItems: 'flex-start' }}>
                <img src={BookSvg} alt='book' className="me-2 mt-1"/> 
                <div>Practice with 100's of exam - style questions</div>
              </div>
              <div style={{ paddingLeft: 44, paddingBottom: 22, display: 'flex', alignItems: 'flex-start' }}>
                <img src={BookSvg} alt='book' className="me-2 mt-1"/> 
                <div>Get online support from our tutors</div>
              </div>
            </Col>
          </Row>
          
          <Row>
            {years.length &&
              years.map((year, idx) => (
                <Col lg='6' key={idx}>
                  <div className='category'>
                    <div>
                      <h3 className='category-title'>{year.name}</h3>
                      <Nav className='flex-column'>
                        {year.subjects.map((subject, idx) => (
                          <Nav.Item key={idx}>
                            <LinkContainer
                              to={`/${year.slug}/${subject.slug}`}
                            >
                              <Nav.Link>
                                <i className='fa fa-circle'></i> {subject.name}
                              </Nav.Link>
                            </LinkContainer>
                          </Nav.Item>
                        ))}
                      </Nav>
                    </div>
                    <div className='h-100 d-flex justify-content-center align-items-center'>
                      <img
                        src={idx ? Year12BannerSvg : Year11BannerSvg}
                        className='w-100'
                        alt='year-banner'
                      />
                      <img
                        src={LockSvg}
                        alt='Lock'
                        className='align-self-start'
                      />
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Home
