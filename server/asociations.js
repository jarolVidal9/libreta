const User = require('./models/user.model')
const Note = require('./models/note.model')

User.hasMany(Note)