const { ApolloServer, gql } = require("apollo-server")
const { v1: uuid } = require("uuid")
const { Author } = require("./models/author")
const { Book } = require("./models/book")

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: String!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: String!
    born: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addAuthor(
        name: String!
        born: Int
    )

    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (root, args) => {
      return Book.find({})

      //   return books
      //     .filter((book) => (args.author ? book.author === args.author : true))
      //     .filter((book) =>
      //       args.genre ? book.genres.includes(args.genre) : true
      //     )
    },
    allAuthors: async () => Author.find({}),
  },

  Mutation: {
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      return author.save()
    },

    addBook: async (root, args) => {
      // Find the author
      const author = await Author.findOne({ name: args.author })

      // Make the book correctly
      args.author = author
      const book = new Book({ ...args })
      return book.save()
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      return author.save()
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
