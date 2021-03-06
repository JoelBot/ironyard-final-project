import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import classAutoBind from 'react-helpers/dist/classAutoBind'
import Favorite from './Favorite'

class Favorites extends React.Component {
  constructor(props) {
    super(props)
    classAutoBind(this)
    this.state = ({
      favorites: [],
    })
  }

  componentDidMount() {
    this.fetchFavorites()

  }

  fetchFavorites() {
    fetch(`/api/v1/cooker/${this.props.params.id}/favorites`, {
      method:'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(function(response) {
        if(response.ok) {
          return response.json()
        } else {
          throw 'Network response was not ok.'
        }
      })
      .then(this.handleFetchFavorites)
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message)
      })
  }

  handleFetchFavorites(response) {
    console.log("favorites fetch", response)
    var newFavorites = response


    this.setState({
      favorites: newFavorites
    })
  }

  render() {

    const Favorites = this.state.favorites.map((favorite, i) => {
      return <Favorite key={i} favorite={favorite}/>
    })

    return<ReactCSSTransitionGroup
      transitionName="component"
      transitionAppear={true}
      transitionAppearTimeout={2000}
      transitionEnter={true}
      transitionEnterTimeout={2000}
      transitionLeave={false}>
        <section className="favorites">
          <div className="row">
            <div className="col-xs-12">
              <h1 className="heading">My Favorites</h1>
              <ReactCSSTransitionGroup
                transitionName="list"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                <div className="list-group">
                {this.state.favorites.length? Favorites : <h2>You don't have any favorite recipes. Yet...</h2>}
                </div>
              </ReactCSSTransitionGroup>
            </div>
          </div>
      </section>
    </ReactCSSTransitionGroup>
  }
}

export default Favorites
