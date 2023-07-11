const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 4000

app.use(cors());
app.use(express.json());

//Routes - Courrier
app.use(require('./routes/categorieCourrier.routes'));
app.use(require('./routes/typeCourrier.routes'));


// app.use(require('./routes/profil.routes'));
// app.use(require('./routes/courrier.routes'));
// app.use(require('./routes/document.routes'));
// app.use(require('./routes/service.routes'));
// app.use(require('./routes/utilisateur.routes'));

// app.use(require('./routes/correspondantCourrier.routes'));
// app.use(require('./routes/courrier.routes'));
// app.use(require('./routes/diffusionCourrier.routes'));
// app.use(require('./routes/imputationCourrier.routes'));
// app.use(require('./routes/registreCourrier.routes'));
// app.use(require('./routes/typeCorrespondant.routes'));

app.listen(port, () =>  {console.log("Serveur démaré sur le port: " + port)});