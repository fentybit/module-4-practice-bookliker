import React from "react";
import {
  Container,
  Header,
  Menu,
  Button,
  List,
  Image
} from "semantic-ui-react";
import Book from './components/Book'

class App extends React.Component {
  state = {
    books: [],
    user: false,
    displayedBook: false
  }

  componentDidMount() {
    fetch('http://localhost:3000/books')
      .then(resp => resp.json())
      .then(fetchBooks => this.setState({ books: fetchBooks }))

    fetch('http://localhost:3000/users')
      .then(resp => resp.json())
      .then(fetchUsers => this.setState({ user: fetchUsers[0] }))
  }

  handleOnClick = (id) => {
    const foundBook = this.state.books.find(book => book.id === id)
    this.setState({ displayedBook: foundBook })
  }

  handleLikeButton = () => {
    return (this.state.displayedBook.users.map(user => user.id).includes(this.state.user.id))
      ?
      null
      :
      fetch(`http://localhost:3000/books/${this.state.displayedBook.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          users: [...this.state.displayedBook.users, this.state.user]
        })
      })
        .then(resp => resp.json())
        .then(revisedBook => this.setState({ displayedBook: revisedBook }))
  }

  render() {
    const { displayedBook, books } = this.state

    return (
      <div>
        <Menu inverted>
          <Menu.Item header>Bookliker</Menu.Item>
        </Menu>
        <main>
          <Menu vertical inverted>
            <Menu.Item as={"a"}>
              {books.map(book => <Book key={book.id} book={book} handleOnClick={this.handleOnClick} />)}
            </Menu.Item>
          </Menu>
          {(displayedBook)
            ?
            <Container text>
              <Header>{displayedBook.title}</Header>
              <Image
                src={displayedBook.img_url}
                size="small"
              />
              <p>{displayedBook.description}</p>
              <Button
                onClick={this.handleLikeButton}
                color="red"
                content="Like"
                icon="heart"
                label={{
                  basic: true,
                  color: "red",
                  pointing: "left",
                  content: "2,048"
                }}
              />
              <Header>Liked by</Header>
              <List>
                {displayedBook.users.map(user => <List.Item key={user.id} icon="user" content={user.username} />)}

              </List>
            </Container>
            :
            null
          }
        </main>
      </div >
    );
  }
}

export default App;