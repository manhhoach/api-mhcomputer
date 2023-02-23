const PORT = process.env.PORT || 3000
const { sequelize } = require('./src/database/db')
const app = require('./src/app')

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    app.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}`)
    })
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
})
